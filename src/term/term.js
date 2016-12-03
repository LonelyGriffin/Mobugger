require("./term.css");

var indention = function(depth, symbol){
    var result = '';
    for(var i = 0; i < depth; i++){
      result = result + symbol;
    }
    return result;
}
var Term = function(data, depth){
    this.marker = '&nbsp;&nbsp;';
    this.$marker = $('<span class="marker">');
    this.prefixData = "";
    this.postfixData = "";
    this.customPrefix = "";
    this.customPostfix = "";
    this.needPreIndention = true;
    this.needPostIndention = true;
    this.depth = depth || 0;
    this.data = data;
}

Term.prototype = {
    setPrefix: function(prefix){
	    this.customPrefix = prefix;
    },
    setPostfix: function(postfix){
	    this.customPostfix = postfix;
    },
    setDepth: function(depth){
      this.depth = depth;
    },
    view: function($el){
      this.$el = $el || this.$el || $('body');
      this.$marker.html(this.marker);
      this.$el.empty().append(this.$marker);
      if(this.needPreIndention){
        this.$el.append("<span class='indention'>" + indention(this.depth * 4, '&nbsp;') + "</span>");
      }
      this.$el.append(this.customPrefix + this.prefixData).append(this.render());
      if(this.needPostIndention){
        this.$el.append("<span class='indention'>" + indention(this.depth * 4, '&nbsp;') + "</span>");
      }
      this.$el.append(this.postfixData + this.customPostfix);
      this.bind();
    },
    unbind: function(){},
    bind: function(){},
    render: function(){
	    return this.data + "";
    }
}
module.exports = Term;
