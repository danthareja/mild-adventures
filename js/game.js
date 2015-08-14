!function t(e,r,i){function n(a,u){if(!r[a]){if(!e[a]){var s="function"==typeof require&&require;if(!u&&s)return s(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=r[a]={exports:{}};e[a][0].call(c.exports,function(t){var r=e[a][1][t];return n(r?r:t)},c,c.exports,t,e,r,i)}return r[a].exports}for(var o="function"==typeof require&&require,a=0;a<i.length;a++)n(i[a]);return n}({1:[function(t,e,r){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(r,"__esModule",{value:!0});var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),u=function(t,e,r){for(var i=!0;i;){var n=t,o=e,a=r;u=l=s=void 0,i=!1,null===n&&(n=Function.prototype);var u=Object.getOwnPropertyDescriptor(n,o);if(void 0!==u){if("value"in u)return u.value;var s=u.get;return void 0===s?void 0:s.call(a)}var l=Object.getPrototypeOf(n);if(null===l)return void 0;t=l,e=o,r=a,i=!0}},s=t("./Keyboard"),l=i(s),c=function(t){function e(t,r,i,o){n(this,e),u(Object.getPrototypeOf(e.prototype),"constructor",this).call(this,t,r,i,"adventurer",o),this.MAX_SPEED=500,this.ACCELERATION=1500,this.DRAG=1e3,this.JUMP_SPEED=-500,this.jumping=!1,this.addAnimations(),this.keyboard=new l["default"](t),t.physics.enable(this,Phaser.Physics.ARCADE),this.body.collideWorldBounds=!0,this.body.maxVelocity.setTo(this.MAX_SPEED,10*this.MAX_SPEED),this.body.drag.setTo(this.DRAG,0)}return o(e,t),a(e,[{key:"move",value:function(){this.keyboard.leftInputIsActive()?(this.animations.play("walk-left"),this.body.acceleration.x=-this.ACCELERATION):this.keyboard.rightInputIsActive()?(this.animations.play("walk-right"),this.body.acceleration.x=this.ACCELERATION):this.keyboard.downInputIsActive()?this.animations.play("right-to-neutral"):this.body.acceleration.x=0;var t=this.body.touching.down;t&&(this.jumps=2,this.jumping=!1),this.jumps>0&&this.keyboard.upInputIsActive(150)&&(this.body.velocity.y=this.JUMP_SPEED,this.jumping=!0),this.jumping&&this.keyboard.upInputReleased()&&(this.jumps--,this.jumping=!1)}},{key:"addAnimations",value:function(){this.animations.add("neutral",["neutral"],10),this.animations.add("jump",["jump-3","neutral"],10),this.animations.add("neutral-to-right",["walk-right-1","walk-right-2","walk-right-3"],10),this.animations.add("right-to-neutral",["walk-right-3","walk-right-2","walk-right-1","neutral"],10),this.animations.add("walk-right",["walk-right-4","walk-right-5","walk-right-6","walk-right-7","walk-right-8","walk-right-6"],10,!0,!1),this.animations.add("neutral-to-left",["walk-left-1","walk-left-2","walk-left-3"],20),this.animations.add("left-to-neutral",["walk-left-3","walk-left-2","walk-left-1","neutral"],10),this.animations.add("walk-left",["walk-left-4","walk-left-5","walk-left-6","walk-left-7","walk-left-8","walk-left-6"],10,!0,!1)}}]),e}(Phaser.Sprite);r["default"]=c,e.exports=r["default"]},{"./Keyboard":5}],2:[function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),a=function(t,e,r){for(var i=!0;i;){var n=t,o=e,a=r;u=l=s=void 0,i=!1,null===n&&(n=Function.prototype);var u=Object.getOwnPropertyDescriptor(n,o);if(void 0!==u){if("value"in u)return u.value;var s=u.get;return void 0===s?void 0:s.call(a)}var l=Object.getPrototypeOf(n);if(null===l)return void 0;t=l,e=o,r=a,i=!0}},u=function(t){function e(t,r,n,o){i(this,e),a(Object.getPrototypeOf(e.prototype),"constructor",this).call(this,t,r,n,"closed_flower",o),t.physics.enable(this),this.isOpen=!1,this.body.allowGravity=!1}return n(e,t),o(e,[{key:"swap",value:function(){this.isOpen=!this.isOpen,this.loadTexture(this.isOpen?"open_flower":"closed_flower")}}]),e}(Phaser.Sprite);r["default"]=u,e.exports=r["default"]},{}],3:[function(t,e,r){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),a=t("./Ground"),u=i(a),s=t("./Flower"),l=i(s),c=t("./Keyboard"),f=i(c),h=t("./Adventurer"),p=i(h),d=function(){function t(e){n(this,t),this.GRAVITY=2600,this.game=e}return o(t,[{key:"preload",value:function(){this.game.load.atlasJSONHash("adventurer","assets/adventurer.png","assets/adventurer.json"),this.game.load.image("ground","assets/ground-01.png"),this.game.load.image("open_flower","assets/flower_open.png"),this.game.load.image("closed_flower","assets/flower_closed.png")}},{key:"create",value:function(){this.game.stage.backgroundColor="#ffffff",this.game.physics.arcade.gravity.y=this.GRAVITY,this.player=new p["default"](this.game,this.game.width/2,this.game.height-78,"neutral"),this.game.add.existing(this.player),this.ground=new u["default"](this.game,0,this.game.height-40),this.game.add.existing(this.ground),this.keyboard=new f["default"](this.game),this.flower=new l["default"](this.game,this.game.width-300,this.game.height-143),this.game.add.existing(this.flower)}},{key:"update",value:function(){this.game.physics.arcade.collide(this.player,this.ground),this.player.move(),this.updateFlower()}},{key:"updateFlower",value:function(){this.recentFlowerOverlap=this.game.physics.arcade.overlap(this.player,this.flower,function(t,e){this.recentFlowerOverlap||e.swap()},null,this)}}]),t}();r["default"]=d,e.exports=r["default"]},{"./Adventurer":1,"./Flower":2,"./Ground":4,"./Keyboard":5}],4:[function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(r,"__esModule",{value:!0});var o=function(t,e,r){for(var i=!0;i;){var n=t,o=e,a=r;u=l=s=void 0,i=!1,null===n&&(n=Function.prototype);var u=Object.getOwnPropertyDescriptor(n,o);if(void 0!==u){if("value"in u)return u.value;var s=u.get;return void 0===s?void 0:s.call(a)}var l=Object.getPrototypeOf(n);if(null===l)return void 0;t=l,e=o,r=a,i=!0}},a=function(t){function e(t,r,n,a){i(this,e),o(Object.getPrototypeOf(e.prototype),"constructor",this).call(this,t,r,n,"ground",a),t.physics.enable(this),this.body.immovable=!0,this.body.allowGravity=!1}return n(e,t),e}(Phaser.Sprite);r["default"]=a,e.exports=r["default"]},{}],5:[function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),a=function(t,e,r){for(var i=!0;i;){var n=t,o=e,a=r;u=l=s=void 0,i=!1,null===n&&(n=Function.prototype);var u=Object.getOwnPropertyDescriptor(n,o);if(void 0!==u){if("value"in u)return u.value;var s=u.get;return void 0===s?void 0:s.call(a)}var l=Object.getPrototypeOf(n);if(null===l)return void 0;t=l,e=o,r=a,i=!0}},u=function(t){function e(t){i(this,e),a(Object.getPrototypeOf(e.prototype),"constructor",this).call(this,t),t.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT,Phaser.Keyboard.RIGHT,Phaser.Keyboard.UP,Phaser.Keyboard.DOWN]),this.game=t}return n(e,t),o(e,[{key:"leftInputIsActive",value:function(){var t=!1;return t=this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT),t|=this.game.input.activePointer.isDown&&this.game.input.activePointer.x<this.game.width/4}},{key:"rightInputIsActive",value:function(){var t=!1;return t=this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT),t|=this.game.input.activePointer.isDown&&this.game.input.activePointer.x>this.game.width/2+this.game.width/4}},{key:"upInputIsActive",value:function(t){var e=!1;return e=this.game.input.keyboard.downDuration(Phaser.Keyboard.UP,t),e|=this.game.input.activePointer.justPressed(t+1e3/60)&&this.game.input.activePointer.x>this.game.width/4&&this.game.input.activePointer.x<this.game.width/2+this.game.width/4}},{key:"upInputReleased",value:function(){var t=!1;return t=this.game.input.keyboard.upDuration(Phaser.Keyboard.UP),t|=this.game.input.activePointer.justReleased()}},{key:"downInputIsActive",value:function(){var t=!1;return t=this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN),t|=this.game.input.activePointer.isDown&&this.game.input.activePointer.x<this.game.width/4}}]),e}(Phaser.Keyboard);r["default"]=u,e.exports=r["default"]},{}],6:[function(t,e,r){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}var n=t("./GameState"),o=i(n),a=new Phaser.Game(800,600,Phaser.AUTO,"game");a.state.add("game",o["default"],!0)},{"./GameState":3}]},{},[6]);