define([
  "jquery",
  "backbone",
  "collections/expressions"
  ], function($, Backbone, Expressions){
    var ExpressionView = Backbone.View.extend({
      events: {
        "click .delete" : "deleteExpression"
      },

      initialize: function(){
        this.allowRender = false;
        this.collection = new Expressions();

        // Wire collection events
        this.listenTo(this.collection, "sync", this.render);
        this.listenTo(this.collection, "destroy", this.render);
        this.collection.fetch();
      },

      render: function(){
        if (!this.allowRender) {
          this.allowRender = true;
          return;
        }

        //this.$('.row').not('.title').remove();  
        console.log('render the expressions', this.collection)
      },

      deleteExpression: function(evt){
        var expressionID = this.$(evt.target).data('id');
        var expression = this.collection.get(expressionID);
        expression.destroy({wait: true, success: function(expr) { console.log('delete', expr);}});
        console.log('delete this expression', expression)
        this.render();
      }
    });

    return ExpressionView;
});