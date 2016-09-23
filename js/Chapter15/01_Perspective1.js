var Perspective1 = (function(){
  var Super = ChapterBase;
  var Perspective1 = function(render){
    Super.call(this, render);
    // Start
    this.xpos = 0;
    this.ypos = 0;
    this.zpos = 0;
    this.fl   = 250;
    this.vpX  = this.centerX();
    this.vpY  = this.centerY();

    // End
  };
  Perspective1.prototype = Object.create(Super.prototype, {
    constructor: {
      value: Perspective1,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = Perspective1.prototype;
  p.init = function(){
    var self = this;
    //Start
    var ball = new Ball();
    ball.update = function(){
      self.update(this);
    };
    this.addChild(ball);
    document.addEventListener('keydown', function(evt){
      switch (evt.code) {
        case 'ArrowUp':
          self.zpos += 5;
          break;
        case 'ArrowDown':
          self.zpos -= 5;
          break;
        default:
          break;
      }
    }, false);
  };
  p.update = function(sprite){
    this.xpos = this.mouseX - this.vpX;
    this.ypos = this.mouseY - this.vpY;
    var scale = this.fl / (this.fl + this.zpos);
    sprite.scaleX = scale;
    sprite.scaleY = scale;
    sprite.x = this.vpX + this.xpos * scale;
    sprite.y = this.vpY + this.ypos * scale;
  };
  return Perspective1;
})();