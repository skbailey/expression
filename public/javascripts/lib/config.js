requirejs.config({
	paths: {
		jquery: "http://code.jquery.com/jquery-1.11.0.min",
    underscore: "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min",
    backbone: "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
    bootstrap: "http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min",
    formparams: "../vendor/jquery.formparams",
    form: "views/form",
    "expression-model": "models/expression",
    "expression-collection": "collections/expressions",
    handlebars: "http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.runtime.min",
    snapshot: "../templates/compiled/compiled.handlebars",

	},
  shim: {
    backbone: {
      deps: ["jquery"],
      exports: "Backbone"
    },
    jquery: {
      exports: "$"
    },
    underscore: {
      exports: "_"
    },
    handlebars: {
      exports: "Handlebars"
    },
    bootstrap: ["jquery"],
    formparams: ["jquery"],
    snapshot: ["handlebars"]
  }
});

require([
  "jquery", 
  "form",
  "bootstrap"
  ], function($, FormView){
  $(function($){
    window.myform = new FormView({el: "#content"});
  })
});