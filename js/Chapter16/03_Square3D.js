var Square3D = (function(){
  var Super = ChapterBase;
  var Square3D = function(render){
    Super.call(this, render);
    // Start
    this.numPoints = 4;
    this.points    = [];
    this.fl       = 250;
    this.vpX      = this.centerX();
    this.vpY      = this.centerY();
    this.angleX   = 0.0;
    this.angleY   = 0.0;
    // End
  };
  var Sub = Super.prototype.inherit.call(Super, Square3D);
  var p = Sub.prototype;
  p.init = function(){
    var self = this;
    //Start
    var update = function(){
      self.update(this);
    };
    this.points[0] = new Point3D(-100, -100, 100);
    this.points[1] = new Point3D(100, -100, 100);
    this.points[2] = new Point3D(100, 100, 100);
    this.points[3] = new Point3D(-100, 100, 100);
    for(var i = 0; i < this.numPoints; i++) {
      this.points[i].update = update;
      this.points[i].fl = this.fl;
      this.points[i].setVanishingPoint(this.vpX, this.vpY);
      this.addChild(this.points[i]);
    }
  };
  p.update = function(sprite){
    sprite.rotateX(this.angleX);
    sprite.rotateY(this.angleY);
  };
  p.before = function(){
    this.angleX = (this.mouseY - this.vpY) * 0.001;
    this.angleY = (this.mouseX - this.vpX) * 0.001;
  };
  p.after = function(){
    this.render.context.save();
    this.render.context.translate(0, 0);
    this.render.context.rotate(0);
    this.render.context.scale(1, 1);
    this.render.context.beginPath();
    this.render.context.moveTo(this.points[0].x, this.points[0].y);
    for (var i = 1; i < this.numPoints; i++) {
      this.render.context.lineTo(this.points[i].x, this.points[i].y);
    }
    this.render.context.lineTo(this.points[0].x, this.points[0].y);
    this.render.context.stroke();
    this.render.context.restore();
  };
  return Sub;
})();