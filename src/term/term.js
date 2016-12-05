require("./term.css");

var indention = function(depth, symbol){
    var result = '';
    for(var i = 0; i < depth; i++){
      result = result + symbol;
    }
    return result;
};

var wrapPlainText = function (text) {
    return  "<xmp class='wrap-plain-text'>" + text + "</xmp>"
};

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
    view: function($el) {
        this.preView();
        this.$el = $el || this.$el || $('.mobugger--not--recursive--flag');
        var renderData = this.postRender(this.render(this.preRender(this.data)));
        if(renderData){
            this.$marker.html(this.marker);
        }
        this.$el.empty().append(this.$marker);
        if (this.needPreIndention && renderData) {
            this.$el.append("<span class='indention'>" + indention(this.depth * 4, '&nbsp;') + "</span>");
        }
        this.$el.append(wrapPlainText(this.customPrefix + this.prefixData)).append(renderData);
        if (this.needPostIndention && renderData) {
            this.$el.append("<span class='indention'>" + indention(this.depth * 4, '&nbsp;') + "</span>");
        }
        this.$el.append(wrapPlainText(this.postfixData + this.customPostfix));
        this.postView();
        this.bind();

    },
    unbind: function(){},
    bind: function(){},
    render: function(data){
	    return wrapPlainText(data + "");
    },
    preRender: function (data) {
        return data;
    },
    postRender: function (data) {
        return data;
    },
    preView: function () {},
    postView: function () {}
};
module.exports = Term;
