var Expression = require('../models/expression');

/* GET home page. */
module.exports = function(app){
	app.get('/', function(req, res){
		var expression = new Expression({
	  		english: "My neighbors are playing music late at night",
	  		french: "Mes voisins jouent de la music très tard dans le soir"
	  	});
		/*
		expression.save(function(err, expression){
			console.log('Saved expression');
			res.render('index', { title: 'Express' });
		});
		*/
		res.render('index', { title: 'Expression' });
	});

  app.get('/expressions', function(req, res){
    Expression
      .find({})
      .sort("-createdAt")
      .exec(function(err, expressions){
        res.format({
          html: function(){
            console.log('expressions', expressions)
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
      createdAt: Date.now()
    });

    console.log("About to expression to Mongo database", expression);
    expression.save(function(err){
      console.log("Saved expression to Mongo database", expression);
      res.send(200, expression);
    });
	});
};
