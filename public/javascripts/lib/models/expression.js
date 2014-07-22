define(["backbone"], function(Backbone){
	var Expression = Backbone.Model.extend({
    idAttribute: "_id",
    urlRoot: "/expressions"
	});

	return Expression;
});