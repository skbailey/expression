requirejs.config({
	paths: {
		jquery: "http://code.jquery.com/jquery-1.11.0.min",
    underscore: "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min",
    backbone: "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
    formparams: "../vendor/jquery.formparams",
    form: "views/form",
    "expression-model": "models/expression",
    "expression-collection": "collections/expressions",
    handlebars: "../vendor/handlebars.runtime-latest",
    templates: "../templates/compiled.handlebars"
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
    formparams: ["jquery"],
    templates: ["handlebars"]
  }
});

require(["jquery", "form"], function($, FormView){
  $(function($){
    console.log("the page has loaded");
    window.myform = new FormView({el: "#content"});
  })
});