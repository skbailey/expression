define([
  "backbone", 
  "collections/expressions", 
  "dropzone",
  "snapshot",
  "formparams",
  "bootstrap"
  ], function(Backbone, ExpressionCollection, Dropzone){

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
      var id, html, dropzone, $dropzone,
          self = this;

      this.expressionCollection.each(function(model, index, list){
        html = self.template(model.toJSON());
      });
      
      // TODO: Fix this to not just use jQuery to find the element
      $dropzone = $('.snapshot-container')
        .html(html)
        .find('.image-view')
        .dropzone({
          url: "/snapshots",
          paramName: "snapshot"
        });

      id = $dropzone.closest('figure').data('id');

      dropzone = Dropzone.forElement($dropzone.get(0));
      dropzone.on('sending', function(file, xhr, formData){
        formData.append('id', id);
      });
    }
  });

  return FormView;
});