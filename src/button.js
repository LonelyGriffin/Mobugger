var Button = function(){
  this.$body = $("<div>");
}

Button.prototype = {
  setContent: function(content){
    this.$button.attr("value", content + "")
  },
  view: function($el){
    this.$el = $el || this.$el || $('body');
    this.unbind();
    this.$el.append(this.render());
    this.bind();
  },
  render: function(){
    this.$body = $("<input>");
    this.$body.attr("type", "submit");
    return this.$body;
  },
  bind: function(){
    this.$body.on("click", this.click);
  },
  unbind: function(){
    this.$body.off("click", this.click);
  },
  click: function() {},
  show: function(){
    this.$body.removeClass("hide");
  },
  hide: function(){
    this.$body.addClass("hide");
  }
}

module.exports = Button;
