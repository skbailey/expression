define([
  "backbone", 
  "expression-collection", 
  "templates",
  "formparams"
  ], function(Backbone, ExpressionCollection){
	var FormView = Backbone.View.extend({
    
    initialize: function(options){
      this.expressionCollection = new ExpressionCollection();
      this.listenTo(this.expressionCollection, 'sync', this.onSync)
    },
    template: Handlebars.templates.expression,
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
        console.log('the model', model.toJSON())
        html = self.template(model.toJSON());
      });
      
      this.$el.html(html);    
    }
  });

  return FormView;
});