var toTerm = require('./toTerm.js');
window.log = function(data){
  term = toTerm(data);
  term.view(panel.$body);
};

////////////////

var panel = require("./panel.js");
var openButton = require("./openButton.js");

panel.view();
openButton.view();
