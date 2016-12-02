var indention = function(depth, symbol){
    var result = '';
    for(var i = 0; i < depth; i++){
      result = result + symbol;
    }
    return result;
}
var Term = function(o){
    var o = o || {};
    this.marker = '&nbsp';
    this.prefixData = "";
    this.postfixData = "";
    this.depth = o.depth || 0;
    this.data = o.data;
}

Term.prototype = {
    setPrefix: function(prefix){
	    this.customPrefix = prefix;
    },
    setPostfix: function(postfix){
	    this.customPostfix = postfix;
    },
    view: function($el){
      this.$el = $el || this.$el || $('body');
      this.$marker = $('<span>' + this.marker + '</span>');
      this.$el.empty()
        .append(this.$marker)
        .append(indention(this.depth * 2, '&nbsp') + this.customPrefix + this.prefix)
        .append(this.render())
        .append(this.postfix + this.customPostfix);
      this.bind();
    },
    unbind: function(){},
    bind: function(){},
    render: function(){
	    return this.data + "";
    }
}
module.exports = Term;

