var termConstructors = {
    'any': require('term.js');
    'object': require('objTerm.js');
};

var toTerm = function(data){
    var type = typeof data;
    if(type == 'object'){
	return termConstructors['object']({data: data});
    };

    return termConstructors['any']({data: data});
};

module.exports = toTerm;