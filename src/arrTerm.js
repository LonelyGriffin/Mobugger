var utils = require("./utils.js");
var ObjTerm = require("./objTerm.js");

var ArrTerm = function(data, depth){
  ObjTerm.call(this, data, depth);
  this.prefixData = "[";
  this.postfixData = "]";
}

utils.inherit(ObjTerm, ArrTerm);

module.exports = ArrTerm;
