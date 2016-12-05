/**
 * Created by User on 05.12.2016.
 */
var toTerm = require("./toTerm");

var TermList = function ($el) {
    this._terms = [];
    this.$el = $el || $('.mobugger--not--recursive--flag');
};
TermList.prototype = {
    push: function (data) {
        var term = toTerm(data);
        this._terms.push(term);
        var $wrap = $("<div>");
        term.view($wrap);
        this.$el.append($wrap);
    }
};
module.exports = TermList;