require("./base.css");

var toTerm = require('./term');
window.log = function(data){
  term = toTerm(data);
  term.view(panel.$body);
};

var $logWrap = $("<div>");
$logWrap.addClass("mobugger--not--recursive--flag");
$("body").append($logWrap);
////////////////

var panel = require("./panel/panel.js");
var openButton = require("./openButton.js");

panel.view();
openButton.view();
