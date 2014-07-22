define([
  "backbone", 
  "models/expression"
  ], function(Backbone, ExpressionModel){
	var Expressions = Backbone.Collection.extend({
		url: "/expressions",
		model: ExpressionModel
	});

	return Expressions;
});