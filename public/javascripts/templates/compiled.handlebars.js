(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['expression'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<div>\n	<h4>English Phrase</h4>\n	<p>"
    + escapeExpression(((helper = helpers.english || (depth0 && depth0.english)),(typeof helper === functionType ? helper.call(depth0, {"name":"english","hash":{},"data":data}) : helper)))
    + "</p>\n</div>\n<div>\n	<h4>L'expression française</h4>\n	<p>"
    + escapeExpression(((helper = helpers.french || (depth0 && depth0.french)),(typeof helper === functionType ? helper.call(depth0, {"name":"french","hash":{},"data":data}) : helper)))
    + "</p>\n</div>";
},"useData":true});
})();