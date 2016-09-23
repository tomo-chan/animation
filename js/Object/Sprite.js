var Sprite = (function(){
  var Sprite = function(){
    this.context   = undefined;
    this.x         = 0;
    this.y         = 0;
    this.width     = 0;
    this.height    = 0;
    this.rotation  = 0;
    this.scaleX    = 1;
    this.scaleY    = 1;
    this.eventList = {};
  };
  Sprite.prototype.getBounds = function() {
    return {
      "x": this.x - this.width / 2,
      "y": this.y - this.height / 2,
      "width": this.width,
      "height": this.height
    };
  }
  Sprite.prototype.update = function(){};
  Sprite.prototype.draw = function(){};
  Sprite.prototype.onEnterFrame = function(){
    if(!this.context) { return; }
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.rotation);
    this.context.scale(this.scaleX, this.scaleY);
    if(typeof this.update === 'function') { this.update(); }
    if(typeof this.draw   === 'function') { this.draw();   }
    this.context.restore();
  };
  Sprite.prototype.addEventListener = function(type, func) {
    if(!type || !(typeof type === 'string')) {
      throw new Error('Invalid type');
    }
    if(!func || !(typeof func === 'function')) {
      throw new Error('Invalid function');
    }
    var events = this.eventList[type];
    if(!events) {
      events = [];
    }
    events.push(func);
    this.eventList[type] = events;
  };
  Sprite.prototype.removeEventListener = function(type, func) {
    if(!type || !(typeof type === 'string')) {
      throw new Error('Invalid type');
    }
    if(!func || !(typeof func === 'function')) {
      throw new Error('Invalid function');
    }
    var events = this.eventList[type];
    if(!events) {
      return;
    }
    events = events.filter(function(v, i){
      return !(v === func);
    });
    this.eventList = events;
  };
  Sprite.prototype.fire = function(type, evt) {
    if(!type || !(typeof type === 'string')) {
      throw new Error('Invalid type');
    }
    var events = this.eventList[type];
    if(!events) {
      return;
    }
    events.some(function(v, i) {
      v(evt);
    });
  };
  return Sprite;
})();