var Trees2 = (function(){
  var Super = ChapterBase;
  var Trees2 = function(render){
    Super.call(this, render);
    // Start
    this.numTrees = 100;
    this.fl       = 250;
    this.vpX      = this.centerX();
    this.vpY      = this.centerY();
    this.floor    = 50;
    this.ax       = 0;
    this.ay       = 0;
    this.az       = 0;
    this.vx       = 0;
    this.vy       = 0;
    this.vz       = 0;
    this.gravity  = 0.3;
    this.friction = 0.98;
    // End
  };
  var Sub = Super.prototype.inherit.call(Super, Trees2);
  var p = Sub.prototype;
  p.init = function(){
    var self = this;
    //Start
    var update = function(){
      self.update(this);
    };
    for(var i = 0; i < this.numTrees; i++) {
      var tree = new Tree();
      tree.color = '#000000';
      tree.xpos = Math.random() * 2000 - 1000;
      tree.ypos = this.floor;
      tree.zpos = Math.random() * 10000;
      tree.update = update;
      this.addChild(tree);
    }
  };
  p.update = function(sprite){
    this.move(sprite);
  };
  p.before = function(){
    this.vx += this.ax;
    this.vy += this.ay;
    this.vz += this.az;
    this.vy -= this.gravity;
  };
  p.after = function(){
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vz *= this.friction;
  };
  p.move = function(sprite) {
    sprite.xpos += this.vx;
    sprite.ypos += this.vy;
    sprite.zpos += this.vz;

    if(sprite.ypos < this.floor) {
      sprite.ypos = this.floor;
    }
    if(sprite.zpos < -this.fl) {
      sprite.zpos += 10000;
    }
    if(sprite.zpos > 10000 - this.fl) {
      sprite.zpos -= 10000;
    }
    var scale = this.fl / (this.fl + sprite.zpos);
    sprite.scaleX = scale;
    sprite.scaleY = scale;
    sprite.x = this.vpX + sprite.xpos * scale;
    sprite.y = this.vpY + sprite.ypos * scale;
    sprite.alpha = scale;
  };
  p.onKeyDown = function(evt) {
    switch (evt.code) {
      case 'ArrowUp':
        this.az -= 1;
        break;
      case 'ArrowDown':
        this.az += 1;
        break;
      case 'ArrowLeft':
        this.ax += 1;
        break;
      case 'ArrowRight':
        this.ax -= 1;
        break;
      case 'Space':
        this.ay += 1;
        break;
      default:
        break;
    }
  };
  p.onKeyUp = function(evt) {
    switch (evt.code) {
      case 'ArrowUp':
      case 'ArrowDown':
        this.az = 0;
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        this.ax = 0;
        break;
      case 'Space':
        this.ay = 0;
        break;
      default:
        break;
    }
  };
  return Sub;
})();