var Sprite = (function(){
  var Super = RootObject;
  var Sprite = function(){
    Super.call();
    this.context   = undefined;
    this.x         = 0; // 位置のX座標
    this.y         = 0; // 位置のY座標
    this.z         = 0; // 位置のZ座標
    this.vx        = 0; // 速度のX方向
    this.vy        = 0; // 速度のY方向
    this.vz        = 0; // 速度のZ方向
    this.width     = 0; // 幅
    this.height    = 0; // 高さ
    this.rotation  = 0; // 角速度
    this.scaleX    = 1; // 拡縮率
    this.scaleY    = 1; // 拡縮率
    this.alpha     = 1; // 透過度
    this.visible   = true; // 表示/非表示フラグ
    this.eventList = {}; // イベントリスナーリスト

    // 3Dパラメータ
    this.xpos      = 0; // 3次元上のX座標
    this.ypos      = 0; // 3次元上のY座標
    this.zpos      = 0; // 3次元上のZ座標
    this.cX        = 0; // 3次元上の中心点
    this.cY        = 0; // 3次元上の中心点
    this.cZ        = 0; // 3次元上の中心点
    this.fl        = 0; // 焦点距離
    this.vpX       = 0; // 消失点のX座標
    this.vpY       = 0; // 消失点のY座標
  };
  var Sub = Super.prototype.inherit.call(Super, Sprite);
  var p = Sub.prototype;
  p.getBounds = function() {
    return {
      "x": this.x - this.width / 2,
      "y": this.y - this.height / 2,
      "width": this.width,
      "height": this.height
    };
  };
  p.update = function(){};
  p.draw = function(){};
  p.updateLayout = function() {
    if(!this.context) { return; }
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.rotation);
    this.context.scale(this.scaleX, this.scaleY);
    if(typeof this.update === 'function') { this.update(); }
    this.context.restore();
  };
  p.onEnterFrame = function(){
    if(!this.context) { return; }
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.rotation);
    this.context.scale(this.scaleX, this.scaleY);
    if(typeof this.draw   === 'function' && this.visible) { this.draw(); }
    this.context.restore();
  };
  p.addEventListener = function(type, func) {
    if(!type || typeof type !== 'string') {
      throw new Error('Invalid type');
    }
    if(!func || typeof func !== 'function') {
      throw new Error('Invalid function');
    }
    var events = this.eventList[type];
    if(!events) {
      events = [];
    }
    events.push(func);
    this.eventList[type] = events;
  };
  p.removeEventListener = function(type, func) {
    if(!type || typeof type !== 'string') {
      throw new Error('Invalid type');
    }
    if(!func || typeof func !== 'function') {
      throw new Error('Invalid function');
    }
    var events = this.eventList[type];
    if(!events) {
      return;
    }
    events = events.filter(function(v, i){
      return (v !== func);
    });
    this.eventList = events;
  };
  p.fire = function(type, evt) {
    if(!type || typeof type !== 'string') {
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
  p.setPoint3D = function(xpos, ypos, zpos) {
    if(typeof xpos !== 'number') {
      throw new Error('Invalid xpos.');
    }
    if(typeof ypos !== 'number') {
      throw new Error('Invalid ypos.');
    }
    if(typeof zpos !== 'number') {
      throw new Error('Invalid zpos.');
    }
    this.xpos = xpos;
    this.ypos = ypos;
    this.zpos = zpos;
  };
  p.setCenter = function(cX, cY, cZ) {
    if(typeof cX !== 'number') {
      throw new Error('Invalid cX.');
    }
    if(typeof cY !== 'number') {
      throw new Error('Invalid cY.');
    }
    if(typeof cZ !== 'number') {
      throw new Error('Invalid cZ.');
    }
    this.cX = cX;
    this.cY = cY;
    this.cZ = cZ;
  };
  p.setVanishingPoint = function(vpX, vpY) {
    if(typeof vpX !== 'number') {
      throw new Error('Invalid vpX.');
    }
    if(typeof vpY !== 'number') {
      throw new Error('Invalid vpY.');
    }
    this.vpX = vpX;
    this.vpY = vpY;
  };
  p.rotateX = function(angleX) {
    if(typeof angleX !== 'number') {
      throw new Error('Invalid angleX.');
    }
    var cosX = Math.cos(angleX);
    var sinX = Math.sin(angleX);

    var y1 = this.ypos * cosX - this.zpos * sinX;
    var z1 = this.zpos * cosX + this.ypos * sinX;

    this.ypos = y1;
    this.zpos = z1;
    this.scaleY = this.fl / (this.fl + this.zpos + this.cZ);
    this.x = this.vpX + this.cX + this.xpos * this.scaleX;
    if(this.zpos > -this.fl) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  };
  p.rotateY = function(angleY) {
    if(typeof angleY !== 'number') {
      throw new Error('Invalid angleY.');
    }
    var cosY = Math.cos(angleY);
    var sinY = Math.sin(angleY);

    var x1 = this.xpos * cosY - this.zpos * sinY;
    var z1 = this.zpos * cosY + this.xpos * sinY;

    this.xpos = x1;
    this.zpos = z1;
    this.scaleX = this.fl / (this.fl + this.zpos + this.cZ);
    this.y = this.vpY + this.cY + this.ypos * this.scaleY;
    if(this.zpos > -this.fl) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  };
  p.rotateZ = function(angleZ) {
    if(typeof angleZ !== 'number') {
      throw new Error('Invalid angleZ.');
    }
    var cosZ = Math.cos(angleZ);
    var sinZ = Math.sin(angleZ);

    var x1 = this.xpos * cosZ - this.ypos * sinZ;
    var y1 = this.ypos * cosZ + this.xpos * sinZ;

    this.xpos = x1;
    this.ypos = y1;
  };
  return Sub;
})();