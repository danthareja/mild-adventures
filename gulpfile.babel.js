var os = require('os');
var del = require('del');
var gulp = require('gulp');
var argv = require('yargs').argv;
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var exorcist = require('exorcist');
var babelify = require('babelify');
var ghPages = require('gulp-gh-pages')
var browserify = require('browserify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var htmlreplace = require('gulp-html-replace');

/**
 * Using different folders/file names? Change these constants:
 */
const BUILD_PATH = './build';
const SCRIPTS_PATH = BUILD_PATH + '/js';
const SOURCE_PATH = './src';
const ASSETS_PATH = './assets';
const INDEX_PATH = './index.html';
const ENTRY_FILE = './src/game.js';
const OUTPUT_FILE = 'game.js';
const DEPENDENCIES_PATHS = {
  phaser: './node_modules/phaser/build/',
  gyronorm: './node_modules/gyronorm/'
};

var keepFiles = false;

/**
 * Simple way to check for development/production mode.
 */
function isProduction() {
  return argv.production;
}

function toggleProduction() {
  argv.production = true;
}

/**
 * Logs the current build mode on the console.
 */
function logBuildMode() {
  if (isProduction()) {
    gutil.log(gutil.colors.green('Running PRODUCTION build...'));
  } else {
    gutil.log(gutil.colors.yellow('Running DEVELOPMENT build...'));
  }
}

/**
 * Deletes all content inside the './build' folder.
 * If 'keepFiles' is true, no files will be deleted. This is a dirty workaround since we can't have
 * optional task dependencies :(
 * Note: keepFiles is set to true by gulp.watch (see serve()) and reseted here to avoid conflicts.
 */
function cleanBuild() {
  if (!keepFiles) {
    del([BUILD_PATH + '/**/*.*']);
  } else {
    keepFiles = false;
  }
}


/**
 * Copies index.html folder into the '/build' folder with appropriate replacements.
 */
function copyIndex() {
  return gulp.src(INDEX_PATH)
    .pipe(gulpif(isProduction(), htmlreplace({
      'js': ['js/phaser.min.js', 'js/gyronorm.min.js']
    })))
    .pipe(gulp.dest(BUILD_PATH));
}

/**
 * Copies './assets' folder into the '/build' folder
 * Check out README.md for more info on the '/assets' folder.
 */
function copyAssets() {

  return gulp.src(ASSETS_PATH + '/**/*')
    .pipe(gulpif(isProduction(), imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(BUILD_PATH + '/' + ASSETS_PATH));
}

/**
 * Copies all static files
 */
function copyStatic() {
  copyIndex();
  copyAssets();
}

/**
 * Copies required Phaser files from the './node_modules/Phaser' folder into the './build/scripts' folder.
 * This way you can call 'npm update', get the lastest Phaser version and use it on your project with ease.
 */
function copyDependencies() {
  var srcList = {
    phaser: ['phaser.min.js'],
    gyronorm: ['dist/gyronorm.min.js']
  }
  
  if (!isProduction()) {
    srcList.phaser.push('phaser.map', 'phaser.js');
    srcList.gyronorm.push('lib/gyronorm.js');
  }
  
  srcList = Object.keys(srcList).reduce(function(mapped, lib) {
    return srcList[lib].map(function(file) {
      return DEPENDENCIES_PATHS[lib] + file
    }).concat(mapped);
  }, []);
  return gulp.src(srcList)
    .pipe(gulp.dest(SCRIPTS_PATH));
}

/**
 * Transforms ES2015 code into ES5 code.
 * Optionally: Creates a sourcemap file 'game.js.map' for debugging.
 * 
 * In order to avoid copying Phaser and Static files on each build,
 * I've abstracted the build logic into a separate function. This way
 * two different tasks (build and fastBuild) can use the same logic
 * but have different task dependencies.
 */
function build() {
  var sourcemapPath = SCRIPTS_PATH + '/' + OUTPUT_FILE + '.map';
  logBuildMode();

  return browserify({
    entries: ENTRY_FILE,
    debug: true
  })
  .transform(babelify)
  .bundle().on('error', function(error){
      gutil.log(gutil.colors.red('[Build Error]', error.message));
      this.emit('end');
  })
  .pipe(gulpif(!isProduction(), exorcist(sourcemapPath)))
  .pipe(source(OUTPUT_FILE))
  .pipe(buffer())
  .pipe(gulpif(isProduction(), uglify()))
  .pipe(gulp.dest(SCRIPTS_PATH));
}

/**
 * Starts the Browsersync server.
 * Watches for file changes in the 'src' folder.
 */
function serve() {
  var options = {
    server: {
      baseDir: BUILD_PATH
    },
    open: false // Change it to true if you wish to allow Browsersync to open a browser window.
  };
  
  browserSync(options);
  
  // Watches for changes in files inside the './src' folder.
  gulp.watch(SOURCE_PATH + '/**/*.js', ['watch:js']);
  
  // Watches for changes in files inside the './static' folder. Also sets 'keepFiles' to true (see cleanBuild()).
  gulp.watch(ASSETS_PATH + '/**/*', ['watch:static']).on('change', function() {
    keepFiles = true;
  });

  gulp.watch(INDEX_PATH, ['watch:static']).on('change', function() {
    keepFiles = true;
  });
}


/**
 * Deploy to Github Pages.
 */
function deploy() {
  return gulp.src([BUILD_PATH + '/**/*'])
    .pipe(ghPages({
      cacheDir: os.tmpDir() + '/.publish'
    }));
}

gulp.task('cleanBuild', cleanBuild);
gulp.task('copyStatic', ['cleanBuild'], copyStatic);
gulp.task('copyDependencies', ['copyStatic'], copyDependencies);
gulp.task('build', ['copyDependencies'], build);
gulp.task('fastBuild', build);
gulp.task('serve', ['build'], serve);
gulp.task('watch:js', ['fastBuild'], browserSync.reload); // Rebuilds and reloads the project when executed.
gulp.task('watch:static', ['copyDependencies'], browserSync.reload);
gulp.task('toggleProduction', toggleProduction);
gulp.task('deploy', ['toggleProduction', 'build'], deploy);

/**
 * The tasks are executed in the following order:
 * 'cleanBuild' -> 'copyStatic' -> 'copyDependencies' -> 'build' -> 'serve'
 * 
 * Read more about task dependencies in Gulp: 
 * https://medium.com/@dave_lunny/task-dependencies-in-gulp-b885c1ab48f0
 */
gulp.task('default', ['serve']);