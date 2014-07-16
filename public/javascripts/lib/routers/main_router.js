define([
  "backbone",  
  "form",
  "views/collection/expressions",
  "views/item/expression"
  ], function(Backbone, FormView, ExpressionsView, ExpressionView){

    var MainRouter = Backbone.Router.extend({
      routes: {
        "" : "home",
        "expressions" : "collection",
        "expressions/:id": "member"
      },

      home: function(){
        this.formView = new FormView({ el: "#content" });
      },

      collection: function(){
        console.log("Inside collection")
        this.expressionsView = new ExpressionsView({ el: "#expressions" })
      }, 

      member: function(id){
        console.log("Inside member", id)
        this.expressionView = new ExpressionView({el: ".expression"})
      }
    });

    return MainRouter;
});