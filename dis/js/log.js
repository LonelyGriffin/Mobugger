/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var toTerm = __webpack_require__(4);
	window.log = function(data){
	  term = toTerm(data);
	  term.view();
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Term = __webpack_require__(2);
	var Utils = __webpack_require__(3);
	
	var ObjTerm = function(data, depth){
	    var toTerm = __webpack_require__(4);
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	var indention = function(depth, symbol){
	    var result = '';
	    for(var i = 0; i < depth; i++){
	      result = result + symbol;
	    }
	    return result;
	}
	var Term = function(data, depth){
	    this.marker = '&nbsp;&nbsp;';
	    this.$marker = $('<span class="marker">');
	    this.prefixData = "";
	    this.postfixData = "";
	    this.customPrefix = "";
	    this.customPostfix = "";
	    this.needPreIndention = true;
	    this.needPostIndention = true;
	    this.depth = depth || 0;
	    this.data = data;
	}
	
	Term.prototype = {
	    setPrefix: function(prefix){
		    this.customPrefix = prefix;
	    },
	    setPostfix: function(postfix){
		    this.customPostfix = postfix;
	    },
	    setDepth: function(depth){
	      this.depth = depth;
	    },
	    view: function($el){
	      this.$el = $el || this.$el || $('body');
	      this.$marker.html(this.marker);
	      this.$el.empty().append(this.$marker);
	      if(this.needPreIndention){
	        this.$el.append("<span class='indention'>" + indention(this.depth * 4, '&nbsp;') + "</span>");
	      }
	      this.$el.append(this.customPrefix + this.prefixData).append(this.render());
	      if(this.needPostIndention){
	        this.$el.append("<span class='indention'>" + indention(this.depth * 4, '&nbsp;') + "</span>");
	      }
	      this.$el.append(this.postfixData + this.customPostfix);
	      this.bind();
	    },
	    unbind: function(){},
	    bind: function(){},
	    render: function(){
		    return this.data + "";
	    }
	}
	module.exports = Term;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	  inherit: function(Parent, Child){
	    Child.prototype = Object.create(Parent.prototype);
	    Child.prototype.constructor = Child;
		}
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var termConstructors = {
	    'any': __webpack_require__(2),
	    'object': __webpack_require__(1)
	};
	
	var toTerm = function(data, depth){
	    var type = typeof data;
	    if(type == 'object'){
		     return new termConstructors['object'](data, depth);
	    };
	    return new termConstructors['any'](data, depth);
	};
	
	module.exports = toTerm;


/***/ }
/******/ ]);
//# sourceMappingURL=log.js.map