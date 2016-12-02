window.log = function(data){
  alert(data);
};

var utils = require('./utils.js');
log(utils);

var Term = require('./term.js');
log(Term);

var ObjTerm = require('./objTerm.js');
log(ObjTerm);

var term = new Term({
  data: 5
});

log(term);

term.view();
log(1);
