define([
  "backbone",  
  "form"
  ], function(Backbone, FormView){
    var MainRouter = Backbone.Router.extend({
      routes: {
        "" : "home",
        "expressions" : "expressions"
      },

      home: function(){
        this.myform = new FormView({el: "#content"});
      },

      expressions: function(){
        console.log('inside expressions')
      }
    });

    return MainRouter;
});