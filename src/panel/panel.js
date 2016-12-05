require("./panel.css");
var Panel = function(){
  this.$body = $("<div>");
};

Panel.prototype = {
  view: function($el){
    var closeButton = require("../closeButton.js");
    var $el = $el || $('.mobugger--not--recursive--flag');
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
    var openButton = require("../openButton.js");
    var closeButton = require("../closeButton.js");
    openButton.hide();
    closeButton.show();
    this.$body.removeClass("hide");
  },
  hide: function(){
    var openButton = require("../openButton.js");
    var closeButton = require("../closeButton.js");
    openButton.show();
    closeButton.hide();
    this.$body.addClass("hide");
  }
};

module.exports = new Panel();
