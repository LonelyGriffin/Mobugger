/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var toTerm = __webpack_require__(5);
	window.log = function(data){
	  term = toTerm(data);
	  term.view(panel.$body);
	};

	////////////////

	var panel = __webpack_require__(13);
	var openButton = __webpack_require__(21);

	panel.view();
	openButton.view();


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var termConstructors = {
	    'any': __webpack_require__(7),
	    'object': __webpack_require__(10),
	    'array': __webpack_require__(12)
	};

	var toTerm = function(data, depth){
	    var type = $.type(data);
	    if(termConstructors[type]){
		     return new termConstructors[type](data, depth);
	    };
	    return new termConstructors['any'](data, depth);
	};

	module.exports = toTerm;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);

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
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Term = __webpack_require__(7);
	var Utils = __webpack_require__(11);

	var ObjTerm = function(data, depth){
	    var toTerm = __webpack_require__(6);
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
/* 11 */
/***/ function(module, exports) {

	module.exports = {
	  inherit: function(Parent, Child){
	    Child.prototype = Object.create(Parent.prototype);
	    Child.prototype.constructor = Child;
		}
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(11);
	var ObjTerm = __webpack_require__(10);

	var ArrTerm = function(data, depth){
	  ObjTerm.call(this, data, depth);
	  this.prefixData = "[";
	  this.postfixData = "]";
	}

	utils.inherit(ObjTerm, ArrTerm);

	module.exports = ArrTerm;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	var Panel = function(){
	  this.$body = $("<div>");
	};

	Panel.prototype = {
	  view: function($el){
	    var closeButton = __webpack_require__(16);
	    var $el = $el || $('body');
	    closeButton.view();
	    closeButton.hide();
	    $el.append(this.render());
	  },
	  render: function(){
	    this.$body = $("<div>");
	    this.$body.addClass("panel").addClass("hide");
	    return this.$body;
	  },
	  show: function(){
	    var openButton = __webpack_require__(21);
	    var closeButton = __webpack_require__(16);
	    openButton.hide();
	    closeButton.show();
	    this.$body.removeClass("hide");
	  },
	  hide: function(){
	    var openButton = __webpack_require__(21);
	    var closeButton = __webpack_require__(16);
	    openButton.show();
	    closeButton.hide();
	    this.$body.addClass("hide");
	  }
	};

	module.exports = new Panel();


/***/ },
/* 14 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var CLOSE_IMAGE_B64 = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNjEyIDYxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjEyIDYxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJEZWxldGUiPgoJCTxnPgoJCQk8cGF0aCBkPSJNMzg3LjEyOCwxNzAuNzQ4TDMwNiwyNTEuOTE1bC04MS4xMjgtODEuMTY3bC01NC4xMjQsNTQuMTI0TDI1MS45MTUsMzA2bC04MS4xMjgsODEuMTI4bDU0LjA4NSw1NC4wODZMMzA2LDM2MC4wODYgICAgIGw4MS4xMjgsODEuMTI4bDU0LjA4Ni01NC4wODZMMzYwLjA4NiwzMDZsODEuMTI4LTgxLjEyOEwzODcuMTI4LDE3MC43NDh6IE01MjIuMzgsODkuNjIgICAgIGMtMTE5LjQ5My0xMTkuNDkzLTMxMy4yNjctMTE5LjQ5My00MzIuNzYsMGMtMTE5LjQ5MywxMTkuNDkzLTExOS40OTMsMzEzLjI2NywwLDQzMi43NiAgICAgYzExOS40OTMsMTE5LjQ5MywzMTMuMjY3LDExOS40OTMsNDMyLjc2LDBDNjQxLjg3Myw0MDIuODg4LDY0MS44NzMsMjA5LjExMyw1MjIuMzgsODkuNjJ6IE00NjguMjk1LDQ2OC4yOTUgICAgIGMtODkuNjIsODkuNjE5LTIzNC45MzIsODkuNjE5LTMyNC41NTEsMGMtODkuNjItODkuNjItODkuNjItMjM0LjkzMiwwLTMyNC41NTFjODkuNjItODkuNjIsMjM0LjkzMS04OS42MiwzMjQuNTUxLDAgICAgIEM1NTcuOTE0LDIzMy4zNjMsNTU3LjkxNCwzNzguNjM3LDQ2OC4yOTUsNDY4LjI5NXoiIGZpbGw9IiMwMDAwMDAiLz4KCQk8L2c+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==";

	var SideButton = __webpack_require__(17);
	var panel = __webpack_require__(13);

	var closeButton = new SideButton();
	closeButton.click = function(){
	  panel.hide();
	};
	closeButton.setContent(CLOSE_IMAGE_B64);
	module.exports = closeButton;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(18);

	var utils = __webpack_require__(11);
	var Button = __webpack_require__(20)
	var SideButton = function(){
	  Button.call(this);
	  this.image = "";
	  this.top = 0;
	};

	utils.inherit(Button, SideButton);

	SideButton.prototype.render = function(){
	  this.$body = $("<div>");
	  this.$body.css({
	    backgroundImage: "url("+ this.image + ")",
	    top: (this.top * ("60")) + "px"
	  });
	  this.$body.addClass("side-button");
	  return this.$body
	};

	SideButton.prototype.setContent = function(content){
	  this.image = content;
	};
	SideButton.prototype.setTopPos = function(number){
	  this.top = number;
	};

	module.exports = SideButton;


/***/ },
/* 18 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 19 */,
/* 20 */
/***/ function(module, exports) {

	var Button = function(){
	  this.$body = $("<div>");
	}

	Button.prototype = {
	  setContent: function(content){
	    this.$button.attr("value", content + "")
	  },
	  view: function($el){
	    this.$el = $el || this.$el || $('body');
	    this.unbind();
	    this.$el.append(this.render());
	    this.bind();
	  },
	  render: function(){
	    this.$body = $("<input>");
	    this.$body.attr("type", "submit");
	    return this.$body;
	  },
	  bind: function(){
	    this.$body.on("click", this.click);
	  },
	  unbind: function(){
	    this.$body.off("click", this.click);
	  },
	  click: function() {},
	  show: function(){
	    this.$body.removeClass("hide");
	  },
	  hide: function(){
	    this.$body.addClass("hide");
	  }
	}

	module.exports = Button;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var OPEN_IMAGE_B64 = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi42MDIgNTEyLjYwMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjYwMiA1MTIuNjAyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4Ij4KPGc+Cgk8Zz4KCQk8Zz4KCQkJPHBhdGggZD0iTTUwMS45LDM1Ni42MTZsMC4yOC0wLjE1MUwyODMuNTgyLDEzNi43MDJsLTAuMzI0LTEwMy40MUwxNzcuNTQsNC45NjlsLTExLjI4MiwxMS4zMDNsNTYuMjU3LDU2LjEwNmwtNTQuNzksNTQuOTE5ICAgICBsLTU2LjI1Ny01Ni4xNDlsLTExLjI2LDExLjE3NGwyOC4zNDQsMTA1LjY1NGwxMDAuNTYzLDAuMzg4bC0wLjY2OSwwLjUzOWwyMjAuMDY1LDIyMS4xNDRsMC4yOC0wLjI1OSAgICAgYzE0LjczMywxNC4zMjMsMzguMjY3LDE0LjMyMyw1Mi43MTktMC4yOEM1MTYuMjAxLDM5NS4wMTIsNTE2LjI2NiwzNzEuNDM1LDUwMS45LDM1Ni42MTZ6IE00ODcuNjYzLDM5NS41NTEgICAgIGMtNi41MzYsNi41NTgtMTcuMTA2LDYuNTU4LTIzLjU1NSwwYy02LjUxNC02LjQ5My02LjU1OC0xNi45NzYtMC4wNDMtMjMuNTEyYzYuNDkzLTYuNTM2LDE3LjA4NC02LjUzNiwyMy42Mi0wLjA0MyAgICAgQzQ5NC4xMzQsMzc4LjQ4OSw0OTQuMjIsMzg5LjAzNyw0ODcuNjYzLDM5NS41NTF6IiBmaWxsPSIjMDAwMDAwIi8+CgkJCTxwYXRoIGQ9Ik00Ny4xMDEsMjMyLjY3YzEuNzksMC4zNDUsNDMuNjM4LDguNjkzLDUyLjYzMyw1NS45MTFjLTExLjM2OCwxMi4wNTgtMTguNDY1LDI4LjkwNS0xOC40NjUsNDcuNjA3ICAgICBjMCwwLjIxNiwwLjA0MywwLjM2NywwLjA0MywwLjQ3NWgxMTkuMjg2YzAtMC4xNzMsMC0wLjMyNCwwLTAuNDc1YzAtMTguNzAyLTcuMDk3LTM1LjU0OS0xOC40NDMtNDcuNjA3ICAgICBjOC45OTUtNDcuMTk3LDUwLjgyMS01NS41NjYsNTIuNTktNTUuOTExYzMuOTA0LTAuNzU1LDYuNTU4LTQuNDg3LDUuODQ2LTguNDM0Yy0wLjcxMi0zLjkwNC00LjQ2NS02LjUzNi04LjQxMy01Ljg0NiAgICAgYy0wLjQ5NiwwLjEwOC00OC43NSw5LjQyNi02Mi41MzQsNTkuOTg4Yy04LjUyLTUuMTM0LTE4LjMxNC04LjA4OS0yOC43MzItOC4wODljLTEwLjM3NiwwLTIwLjE2OSwyLjk3Ny0yOC43MTEsOC4xMzIgICAgIGMtMTMuODI3LTUwLjYwNS02Mi4wMTYtNTkuODgtNjIuNTU1LTU5Ljk4OGMtMy45MDQtMC42OS03LjYzNiwxLjk0MS04LjM0OCw1Ljg0NkM0MC41MjIsMjI4LjE4NCw0My4xNzUsMjMxLjkxNSw0Ny4xMDEsMjMyLjY3eiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMjc1LjA4MywyOTAuNjk2Yy01LjA2OS0xLjU5Ni0xMC40NjIsMS4yNzMtMTIuMDgsNi4zNjNjMCwwLTExLjc5OSwzOC4wNTEtMTQuMzAxLDQ2LjIyNiAgICAgYy01LjExMiwxLjM4MS0yMC43NTEsNS44MDMtMzEuNTM2LDguNzc5Yy0wLjQxLTEuNzI2LTAuNzEyLTMuNDMtMS4xMjItNS4xMTJINjUuNzgxYy0wLjM2NywxLjY4My0wLjcxMiwzLjM4Ny0xLjA3OSw1LjExMiAgICAgYy0xMC43ODUtMy4wNDEtMjYuNDQ2LTcuMzk5LTMxLjUzNi04Ljc3OWMtMi41NDUtOC4xNzUtMTQuMzIzLTQ2LjI0OC0xNC4zMjMtNDYuMjQ4Yy0xLjU1My01LjA2OS02Ljk2Ny03Ljk2LTEyLjAzNi02LjM2MyAgICAgYy01LjExMiwxLjUzMi03Ljk2LDYuOTI0LTYuMzYzLDEyLjAzNmwxNy40MDgsNTYuMjU3bDQ0LjA2OSwxMi4yNzRjLTAuMjgsNC4wNTUtMC41MzksOC4xNzUtMC41MzksMTIuMzgyICAgICBjMCw1LjEzNCwwLjMyNCwxMC4yNDYsMC43NzcsMTUuMjI5TDE4LjExLDQxOC41NjdMNC4zNDgsNDk2LjMwOWMtMC45MDYsNS4yMiwyLjU4OCwxMC4yNjgsNy44NTIsMTEuMTc0ICAgICBjNS4yMiwwLjkyOCwxMC4yNDYtMi41MjQsMTEuMTUyLTcuNzg3YzAsMCwxMC40NjItNTguOTEsMTEuOTcyLTY3LjcxMWM0LjI0OS0xLjkyLDE4LjE4NC04LjE3NSwzMC4wOTEtMTMuNDE3ICAgICBjMTAuNDE5LDQ0LjQ3OSw0MC4zMTYsNzYuNjYzLDc1LjU2Miw3Ni42NjNjMzUuMjI1LDAsNjUuMTY1LTMyLjE0LDc1LjYwNi03Ni42NjNjMTEuODQyLDUuMjQyLDI1Ljc5OSwxMS40OTcsMzAuMDQ4LDEzLjQxNyAgICAgYzEuNDg4LDguNzM2LDExLjk1LDY3LjcxMSwxMS45NSw2Ny43MTFjMC45MjgsNS4yNjMsNS45MzIsOC43MTUsMTEuMjE3LDcuNzg3YzUuMjYzLTAuOTA2LDguNjkzLTUuODg5LDcuODA5LTExLjE3NCAgICAgbC0xMy43ODQtNzcuNzQxbC00NC4wMDQtMTkuNjUxYzAuNDUzLTQuOTgzLDAuNzU1LTEwLjA5NSwwLjc1NS0xNS4yMDdjMC00LjIwNi0wLjI1OS04LjM0OC0wLjUzOS0xMi40MjVsNDQuMDQ4LTEyLjI1MiAgICAgbDE3LjQyOS01Ni4yNzhDMjgzLjAyMSwyOTcuNjQyLDI4MC4xNTIsMjkyLjI0OSwyNzUuMDgzLDI5MC42OTZ6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPC9nPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";

	var SideButton = __webpack_require__(17);
	var panel = __webpack_require__(13);

	var openButton = new SideButton();
	openButton.click = function(){
	  panel.show();
	};
	openButton.setContent(OPEN_IMAGE_B64);
	module.exports = openButton;


/***/ }
/******/ ]);
//# sourceMappingURL=log.js.map