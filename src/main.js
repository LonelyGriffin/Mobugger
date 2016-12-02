var toTerm = require('./toTerm.js');
window.log = function(data){
  term = toTerm(data);
  term.view();
};
