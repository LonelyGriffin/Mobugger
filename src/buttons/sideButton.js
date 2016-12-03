require("./sideButton.css");

var utils = require("../utils.js");
var Button = require("./button.js")
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
    top: (this.top * SIDE_BUTTON_SIZE) + "px"
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
