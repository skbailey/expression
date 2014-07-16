define([
  "jquery",
  "backbone",
  "snapshot"
  ], function($, Backbone){
    var ExpressionView = Backbone.View.extend({

      events: {
        "click .edit.btn" : "editExpression",
        "click .save.btn" : "saveExpression"
      },

      template: Handlebars.templates.expression,

      initialize: function(){
        
      },

      render: function(){
        var renderedContent = this.template(this.model.toJSON());
        this.$el.html(renderedContent);
        return this;
      },

      editExpression: function(){
        this.$el.toggleClass('edit-mode')
      },

      saveExpression: function(){
        this.$el.toggleClass('edit-mode')
      }
    });

    return ExpressionView;
});