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

  app.get('/expressions/:id', function(req, res){
    Expression.findById(req.params.id, function(err, expression){
      if (err) throw err
      console.log('expression', expression)
      res.render('expression', { expression: expression });
    });
  });

	app.post('/expressions', function(req, res){
    var expression = new Expression({
      english: req.body.english, 
      french: req.body.french,
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
    // TODO: Delete files uploaded to tmp directory
    var filename = uniqueId(8) + ".jpg";
    var pathToSavedFile = path.resolve('public/images/snapshots') + "/" + filename;
    fs.rename(req.files.snapshot.path, pathToSavedFile, function(err){

      Expression.findById(req.body.id, function(err, expression){

        if (err) throw err;
        expression.snapshots.push(filename);
        expression.updatedAt = Date.now();
        expression.save(function(err, expression){
          if (err) throw err;
          res.json({
            message: "File saved",
            expression: expression
          });
        });
      });   
    });
  });
};
