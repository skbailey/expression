define([
  "jquery",
  "backbone",
  "collections/expressions",
  "views/item/expression"
  ], function($, Backbone, ExpressionsCollection, ExpressionView){
    var ExpressionsView = Backbone.View.extend({

      events: {
        "click .delete" : "deleteExpression"
      },

      initialize: function(){
        this.allowRender = false;
        this.collection = new ExpressionsCollection();

        // Wire collection events
        this.listenTo(this.collection, "reset", this.render);
        this.listenTo(this.collection, "remove", this.render);
        this.collection.fetch();
      },

      render: function(){
        var self = this;

        if (!this.allowRender) {
          this.allowRender = true;
          return;
        }

        // Remove and replace the rows (except the title row)
        this
          .$('.row')
          .not('.title')
          .remove();  

        this.collection.each(function(expression){
          var expressionView = new ExpressionView({ model: expression });
          self.$el.append(expressionView.render().el);
        });
      },

      deleteExpression: function(evt){
        var self = this;
        var expressionID = this.$(evt.target).data('id');
        var expression = this.collection.get(expressionID);

        // TODO: Show an error when the model can't be deleted in DB server-side
        expression.destroy({ 
          error: function(model, response, options){
            console.log('response', response)
            $.error('Failed to delete the model on the server');
          },
          success: function(model, response, options){
            console.log('Successfully deleted the model')
            self.render();
          } 
        });
      }
    });

    return ExpressionsView;
});