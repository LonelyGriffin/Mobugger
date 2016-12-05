module.exports = {
  inherit: function(Parent, Child){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
	},
  isElement: function(o){
    return (
        typeof Node === "object" ? o instanceof Node :
          o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string" && o.nodeType != 3
    );
  },
  isTextNode: function(o){
    return (
        typeof Node === "object" ? o instanceof Node :
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string" && o.nodeType == 3
    );
  }
};
