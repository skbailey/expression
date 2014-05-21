var mongoose = require('mongoose');

// Setup Schema
var ExpressionSchema = mongoose.Schema({
	english: String,
	french: String,
  snapshots: [String],
	updatedAt: Date,
	createdAt: Date
});

// Setup Model
var Expression = mongoose.model('Expression', ExpressionSchema);

// Export Expression Model
module.exports = Expression;