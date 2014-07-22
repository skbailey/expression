define([
  "backbone",  
  "views/form",
  "views/collection/expressions",
  "views/item/expression",
  "models/expression"
  ], function(Backbone, FormView, ExpressionsView, ExpressionView, ExpressionModel){

    var MainRouter = Backbone.Router.extend({
      routes: {
        "" : "home",
        "expressions" : "collection",
        "expressions/:id": "member"
      },

      home: function(){
        this.formView = new FormView({el: "#content" });
      },

      collection: function(){
        console.log("Inside collection")
        this.expressionsView = new ExpressionsView({el: "#expressions" })
      }, 

      member: function(id){
        var model = new ExpressionModel({_id: id});
        this.expressionView = new ExpressionView({el: ".expression", model: model})
      }
    });

    return MainRouter;
});