var Trees = (function(){
  var Super = ChapterBase;
  var Trees = function(render){
    Super.call(this, render);
    // Start
    this.numTrees = 100;
    this.fl       = 250;
    this.vpX      = this.centerX();
    this.vpY      = this.centerY();
    this.floor    = 50;
    this.vz       = 0;
    this.friction = 0.98;
    // End
  };
  var Sub = Super.prototype.inherit.call(Super, Trees);
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
    sprite.zpos += this.vz;
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
  p.after = function() {
    this.vz *= this.friction;
  };
  p.onKeyDown = function(evt) {
    switch (evt.code) {
      case 'ArrowUp':
        this.vz -= 1;
        break;
      case 'ArrowDown':
        this.vz += 1;
        break;
      default:
        break;
    }
  };
  return Sub;
})();