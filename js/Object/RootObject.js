var RootObject = (function(){
  var RootObject = function(){};
  RootObject.prototype.inherit = function(subclass) {
    if(typeof subclass !== 'function') {
      throw new Error('Invalid subclass');
    }
    subclass.prototype = Object.create(this.prototype, {
      constructor: {
        value: subclass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return subclass;
  };
  RootObject.prototype.hexToRGB = function(hex, alpha){
    if(!alpha || typeof alpha !== 'number' || alpha < 0 || 1 < alpha) {
      alpha = 1.0;
    }
    hex = hex.replace('#','');
    var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);

    return 'rgba('+r+','+g+','+b+','+alpha+')';
  };
  return RootObject;
})();