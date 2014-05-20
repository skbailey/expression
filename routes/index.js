var Expression = require('../models/expression');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var path = require('path');

var uniqueId =  function(length) {
  var id = "";
  length = length || 16;

  while (id.length < length) {
    id += Math.random().toString(36).substr(2);
  }

  return id.substr(0, length);
};

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

  app.post("/snapshots", multipartMiddleware, function(req, res){
    var pathToSavedFile = path.resolve('public/images/snapshots') + "/" + uniqueId(8) + ".jpg";
    fs.rename(req.files.snapshot.path, pathToSavedFile, function(err){
      res.send({message: "File saved"});
    });
  });
};
