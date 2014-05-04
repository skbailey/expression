define([
  "jquery",
  "backbone",
  "snapshot"
  ], function($, Backbone){
    var ExpressionView = Backbone.View.extend({
      className: "row",

      template: Handlebars.templates.expression,

      initialize: function(){
        
      },

      render: function(){
        var renderedContent = this.template(this.model.toJSON());

        this.$el.html(renderedContent);

        return this;
      }
    });

    return ExpressionView;
});