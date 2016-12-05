var utils = require("../utils.js");
var termConstructors = {
    'any': require('./term.js'),
    'object': require('./objTerm.js'),
    'array': require('./arrTerm.js'),
    'domElement': require("./domElementTerm.js"),
    'domTextElement': require("./domTextElementTerm.js")
};

var toTerm = function(data, depth){
    var type = utils.isElement(data) ? "domElement": $.type(data);
    type = utils.isTextNode(data) ? "domTextElement" : type;
    if(termConstructors[type]){
	     return new termConstructors[type](data, depth);
    }
    return new termConstructors['any'](data, depth);
};

module.exports = toTerm;
