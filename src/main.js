require("./base.css");

var $logWrap = $("<div>");
$logWrap.addClass("mobugger--not--recursive--flag");
$("body").append($logWrap);
////////////////

var panel = require("./panel/panel.js");
var openButton = require("./openButton.js");

panel.view($logWrap);
openButton.view();

var Term = require('./term');
var termList = new Term.List(panel.$body);
window.log = function(data){
  termList.push(data);
};

