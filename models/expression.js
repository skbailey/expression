var mongoose = require('mongoose');

// Setup Schema
var ExpressionSchema = mongoose.Schema({
	english: String,
	french: String,
	updatedAt: { type: Date, default: Date.now },
	createdAt: { type: Date }
});

// Setup Model
var Expression = mongoose.model('Expression', ExpressionSchema);

// Export Expression Model
module.exports = Expression;