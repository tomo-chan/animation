var MouseEvents = (function(){
  var MouseEvents = function(render){
    ChapterBase.call(this, render);
    // Start
    this.x = this.centerX();
    this.y = this.centerY();
    this.onCanvasMouseDown = function(evt) {
      console.log('mouse down - canvas');
    };
    this.onCanvasMouseMove = function(evt) {
      console.log('mouse move - canvas');
    };
    this.onCanvasMouseUp = function(evt) {
      console.log('mouse up - canvas');
    };
    this.onSpriteMouseDown = function(evt) {
      console.log('mouse down - sprite');
    };
    this.onSpriteMouseMove = function(evt) {
      console.log('mouse move - sprite');
    };
    this.onSpriteMouseUp = function(evt) {
      console.log('mouse up - sprite');
    };
    // End
  };
  MouseEvents.prototype = Object.create(ChapterBase.prototype);
  MouseEvents.prototype.constructor = MouseEvents;
  MouseEvents.prototype.init = function(){
    //Start
    var sprite = new Ball();
    sprite.x = this.x;
    sprite.y = this.y;
    // End
    var self = this;
    sprite.update = function(){
      self.update();
    }
    this.sprite = sprite;
    this.addChild();
  };
  MouseEvents.prototype.update = function(){};
  return MouseEvents;
})();