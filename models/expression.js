var mongoose = require('mongoose');

// Setup Schema
var ExpressionSchema = mongoose.Schema({
	english: String,
	french: String,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

// Setup Model
var Expression = mongoose.model('Expression', ExpressionSchema);

// Export Expression Model
module.exports = Expression;