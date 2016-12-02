var termConstructors = {
    'any': require('./term.js'),
    'object': require('./objTerm.js')
};

var toTerm = function(data, depth){
    var type = typeof data;
    if(type == 'object'){
	     return new termConstructors['object'](data, depth);
    };
    return new termConstructors['any'](data, depth);
};

module.exports = toTerm;
