var Triangles = (function(){
  var Super = ChapterBase;
  var Triangles = function(render){
    Super.call(this, render);
    // Start
    this.points    = [];
    this.triangles = [];
    this.fl       = 250;
    this.vpX      = this.centerX();
    this.vpY      = this.centerY();
    this.angleX   = 0.0;
    this.angleY   = 0.0;
    // End
  };
  var Sub = Super.prototype.inherit.call(Super, Triangles);
  var p = Sub.prototype;
  p.init = function(){
    var self = this;
    //Start
    var update = function(){
      self.update(this);
    };
    this.points[0] = new Point3D(-50, -250, 100);
    this.points[1] = new Point3D(50,  -250, 100);
    this.points[2] = new Point3D(200,  250, 100);
    this.points[3] = new Point3D(100,  250, 100);
    this.points[4] = new Point3D(50,   100, 100);
    this.points[5] = new Point3D(-50,  100, 100);
    this.points[6] = new Point3D(-100, 250, 100);
    this.points[7] = new Point3D(-200, 250, 100);
    this.points[8] = new Point3D(0,   -150, 100);
    this.points[9] = new Point3D(50,     0, 100);
    this.points[10] = new Point3D(-50,   0, 100);
    for(var i = 0; i < this.points.length; i++) {
      this.points[i].fl = this.fl;
      this.points[i].setVanishingPoint(this.vpX, this.vpY);
    }
    this.triangles[0] = new Triangle(this.points[0], this.points[1], this.points[8]);
    this.triangles[1] = new Triangle(this.points[1], this.points[9], this.points[8]);
    this.triangles[2] = new Triangle(this.points[1], this.points[2], this.points[9]);
    this.triangles[3] = new Triangle(this.points[2], this.points[4], this.points[9]);
    this.triangles[4] = new Triangle(this.points[2], this.points[3], this.points[4]);
    this.triangles[5] = new Triangle(this.points[4], this.points[5], this.points[9]);
    this.triangles[6] = new Triangle(this.points[9], this.points[5], this.points[10]);
    this.triangles[7] = new Triangle(this.points[5], this.points[6], this.points[7]);
    this.triangles[8] = new Triangle(this.points[5], this.points[7], this.points[10]);
    this.triangles[9] = new Triangle(this.points[0], this.points[10], this.points[7]);
    this.triangles[10] = new Triangle(this.points[0], this.points[8], this.points[10]);
    for(var i = 0; i < this.triangles.length; i++) {
      this.addChild(this.triangles[i]);
    }
  };
  p.before = function(){
    this.angleX = (this.mouseY - this.vpY) * 0.001;
    this.angleY = (this.mouseX - this.vpX) * 0.001;
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].rotateX(this.angleX);
      this.points[i].rotateY(this.angleY);
    }
  };
  p.after = function(){
  };
  return Sub;
})();