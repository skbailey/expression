define([
  "backbone",  
  "form",
  "views/expressions"
  ], function(Backbone, FormView, ExpressionsView){
    var MainRouter = Backbone.Router.extend({
      routes: {
        "" : "home",
        "expressions" : "expressions"
      },

      home: function(){
        this.formView = new FormView({el: "#content"});
      },

      expressions: function(){
        this.expressionsView = new ExpressionsView({el: "#expressions"})
      }
    });

    return MainRouter;
});