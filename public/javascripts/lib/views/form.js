define([
  "backbone", 
  "expression-collection", 
  "snapshot",
  "formparams"
  ], function(Backbone, ExpressionCollection){

	var FormView = Backbone.View.extend({

    initialize: function(options){
      this.expressionCollection = new ExpressionCollection();
      this.listenTo(this.expressionCollection, 'sync', this.onSync);
    },

    template: Handlebars.templates.snapshot,

    events: {
      "submit form" : "onSubmit"
    },

    onSubmit: function(evt){
      var params = $(evt.target).formParams();
      this.expressionCollection.create(params);
      return false;
    },

    onSync: function(collection, resp, options){
      var html,
          self = this;

      this.expressionCollection.each(function(model, index, list){
        html = self.template(model.toJSON());
      });
      
      // TODO: Fix this
      $('.snapshot-container').html(html);    
    }
  });

  return FormView;
});