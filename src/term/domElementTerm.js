var utils = require("../utils.js");
var ObjTerm = require("./objTerm");
var DomElementTerm = function(data, depth){
  ObjTerm.call(this, data, depth);
  this.$data = $(this.data);
  this.prefixData = "<" + this.data.tagName + ">";
  this.postfixData = "</" + this.data.tagName + ">";
};

utils.inherit(ObjTerm, DomElementTerm);

DomElementTerm.prototype._processedData = function(){
  var toTerm = require("./toTerm.js");
  var childs = this.data.childNodes;
  for(var i = 0; i < childs.length; i++){
    if(childs[i].className != "mobugger--not--recursive--flag"){
      var term = toTerm(childs[i], this.depth + 1);
      this._childs.push(term);
    }
  }
};

module.exports = DomElementTerm;
