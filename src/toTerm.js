var termConstructors = {
    'any': require('./term.js'),
    'object': require('./objTerm.js'),
    'array': require('./arrTerm.js')
};

var toTerm = function(data, depth){
    var type = $.type(data);
    if(termConstructors[type]){
	     return new termConstructors[type](data, depth);
    };
    return new termConstructors['any'](data, depth);
};

module.exports = toTerm;
