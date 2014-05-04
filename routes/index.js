var Expression = require('../models/expression');

/* GET home page. */
module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index');
	});

  app.get('/expressions', function(req, res){
    Expression
      .find({})
      .sort("-createdAt")
      .exec(function(err, expressions){
        res.format({
          html: function(){
            res.render('expressions', {
              expressions: expressions
            })
          },

          json: function(){
            res.send(expressions);
          }
        });
      });
  });

	app.post('/expressions', function(req, res){
    var expression = new Expression({
      english: req.body.english, 
      french: req.body.french,
      photo: "http://placehold.it/555x400",
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    expression.save(function(err){
      res.send(200, expression);
    });
	});

  app.del("/expressions/:id", function(req, res){

    Expression.findOneAndRemove({_id: req.params.id}, function(err, expression){
      if (err) {
        return res.send(500, { error: "Couldn't delete expression"});
      }

      res.send(200, expression);
    });
  });
};
