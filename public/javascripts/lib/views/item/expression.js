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
        this.listenTo(this.model, "change", this.onModelChanged);
        this.listenTo(this.model, "sync", this.onModelSync);
        this.listenTo(this.model, "error", this.onModelError);

        this.model.fetch();
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
        var english = this.$(".english input").val();
        var french = this.$(".french input").val();

         // Update UI
        this.$el.toggleClass('edit-mode')

        if (english) {
          this.$(".english .expression-link").text(english);
        }

        if (french) {
          this.$(".french .expression-link").text(french);
        }

        // Update server with model changes
        this.model.save({
          english: english,
          french: french
        });
      },

      onModelChanged: function(){
        console.log('this is the model', this.model)
      },

      onModelSync: function(){
        console.log('the model has been saved successfully on the server', this.model);
      },

      onModelError: function(){
        console.log('the model threw an error')
      }
    });

    return ExpressionView;
});