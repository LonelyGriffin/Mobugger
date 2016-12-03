require("./base.css");

var toTerm = require('./term');
window.log = function(data){
  term = toTerm(data);
  term.view(panel.$body);
};

////////////////

var panel = require("./panel/panel.js");
var openButton = require("./openButton.js");

panel.view();
openButton.view();
