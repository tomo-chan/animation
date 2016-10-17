var Cylinder = (function(){
  var Super = ChapterBase;
  var Cylinder = function(render){
    Super.call(this, render);
    // Start
    this.points    = [];
    this.triangles = [];
    this.numFaces = 20;
    this.fl       = 250;
    this.vpX      = this.centerX();
    this.vpY      = this.centerY();
    this.offsetX  = 0;
    this.offsetY  = 0;
    // End
  };
  var Sub = Super.prototype.inherit.call(Super, Cylinder);
  var p = Sub.prototype;
  p.init = function(){
    var self = this;
    //Start
    var update = function(){
      self.update(this);
    };
    var index = 0;
    for(var i = 0; i < this.numFaces; i++){
      var angle = Math.PI * 2 / this.numFaces * i;
      var xpos  = Math.cos(angle) * 200;
      var ypos  = Math.sin(angle) * 200;
      this.points[index] = new Point3D(xpos, ypos, -100);
      this.points[index + 1] = new Point3D(xpos, ypos, 100);
      index += 2;
    }
    this.points.forEach(function(point) {
      point.fl = self.fl;
      point.setVanishingPoint(self.vpX, self.vpY);
      point.setCenter(0, 0, 200);
    });
    index = 0;
    for(i = 0; i < this.numFaces - 1; i++) {
      this.triangles[index] = new Triangle(this.points[index], this.points[index + 3], this.points[index + 1]);
      this.triangles[index + 1] = new Triangle(this.points[index], this.points[index + 2], this.points[index + 3]);
      index += 2;
    }
    this.triangles[index] = new Triangle(this.points[index], this.points[1], this.points[index + 1]);
    this.triangles[index + 1] = new Triangle(this.points[index], this.points[0], this.points[1]);
    this.triangles.forEach(function(triangle) {
      triangle.alpha = 0.5;
      self.addChild(triangle);
    });
  };
  p.before = function(){
    var angleX = (this.mouseY - this.vpY) * 0.001;
    var angleY = (this.mouseX - this.vpX) * 0.001;
    var self = this;
    this.points.forEach(function(point) {
      point.rotateX(angleX);
      point.rotateY(angleY);
      point.setCenter(self.offsetX, self.offsetY, 200);
    });
  };
  p.onKeyDown = function(evt) {
    switch (evt.code) {
      case 'ArrowUp':
        this.offsetY -= 5;
        break;
      case 'ArrowDown':
        this.offsetY += 5;
        break;
      case 'ArrowLeft':
        this.offsetX += 5;
        break;
      case 'ArrowRight':
        this.offsetX -= 5;
        break;
      default:
        break;
    }
  };
  return Sub;
})();