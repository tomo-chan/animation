var ObjectHitTest = (function(){
  var Super = ChapterBase;
  var ObjectHitTest = function(render){
    Super.call(this, render);
    // Start
    this.spring        = 0.02;
    this.friction      = 0.95;
    this.springLength  = 100;
    this.ball0         = undefined;
    this.ball1         = undefined;
    this.ball1Dragging = false;
    // End
  };
  ObjectHitTest.prototype = Object.create(Super.prototype, {
    constructor: {
      value: ObjectHitTest,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  var p = ObjectHitTest.prototype;
  p.init = function(){
    var self = this;
    //Start
    this.ball0 = new Ball();
    this.ball0.x = this.centerX();
    this.ball0.y = this.centerY();
    this.addChild(this.ball0);

    this.ball1 = new Ball();
    this.addChild(this.ball1);
    
    var sprite = new Sprite();
    sprite.update = function(){
      self.update(this);
    };
    this.addChild(sprite);
  };
  p.update = function(sprite){
    this.ball1.x = this.mouseX;
    this.ball1.y = this.mouseY;

    var bounds0 = this.ball0.getBounds();
    var bounds1 = this.ball1.getBounds();

    if( !(bounds0.x + bounds0.width  < bounds1.x ||
          bounds1.x + bounds1.width  < bounds0.x || 
          bounds0.y + bounds0.height < bounds1.y ||
          bounds1.y + bounds1.height < bounds0.y) ) {
      console.log('hit!');
    }
  };
  return ObjectHitTest;
})();