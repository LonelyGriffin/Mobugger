var Term = require('./term.js');
var Utils = require('./utils.js');

var ObjTerm = function(data, depth){
    var toTerm = require('./toTerm.js');
    Term.call(this, data, depth);
    this.marker = '+';
    this.prefixData = "{";
    this.postfixData = "}";
    this.needPostIndention = false;
    this.expanded = false;
    this._binded = false;
    this._childs = [];
    for(var key in this.data){
      var term = toTerm(this.data[key], this.depth + 1);
      term.setPrefix(key + ': ');
      this._childs.push(term);
    }
}

Utils.inherit(Term, ObjTerm);

ObjTerm.prototype.toggle = function(){
    this.expanded = !this.expanded;
    this.marker = this.marker == "+" ? "-": "+";
    this.needPostIndention = !this.needPostIndention;
    this.view();
};

ObjTerm.prototype.render = function(){
    if(this.expanded){
      return this.fullRender();
    } else {
      this.unbindChilds();
      return this.shortRender();
    }
};

ObjTerm.prototype.fullRender = function(){
    var $wrap = $('<div>');
    for(var i = 0; i < this._childs.length; i++){
	     var $box = $('<div>');
       this._childs[i].view($box);
       $wrap.append($box);
    }
    return $wrap;
};

ObjTerm.prototype.shortRender = function(){
    return '...';
};

ObjTerm.prototype.unbind = function(){
    this.unbindChilds();
    this.$marker.off('click', this.toggleListner);
    this._binded = false;
};

ObjTerm.prototype.unbindChilds = function(){
    for(var i = 0; i < this._childs.length; i++){
	this._childs[i].unbind();
    }
};

ObjTerm.prototype.bind = function(){
    this.$marker.on('click', $.proxy(this.toggleListner, this));
    this._binded = true;
};

ObjTerm.prototype.toggleListner = function(){
    this.toggle();
};

module.exports = ObjTerm;
