

var utils = require("../utils.js");
var Term = require("./term");
var DomTextElementTerm = function(data, depth){
    Term.call(this, data, depth);
    this.$data = $(this.data);
    this.data = (this.data.nodeValue + "").trim();
};

utils.inherit(Term, DomTextElementTerm);

DomTextElementTerm.prototype.postRender = function (data) {
    return this.data == "" ? "" : data;
};
module.exports = DomTextElementTerm;
