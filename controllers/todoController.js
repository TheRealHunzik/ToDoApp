
  var bodyParser = require('body-parser');
  var mongoose = require('mongoose');


  //connect to Database
  try {
    mongoose.connect(
      'mongodb+srv://DevHack:DevHack123@cluster0-yzalc.mongodb.net/test?retryWrites=true&w=majority/',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
    );
    console.log('Connected');
  } catch (err) {
    console.log('Caught', err);
  }
  // schema for toDo app
  var toDoSchema = new mongoose.Schema({
    item: String
  });


  // Create TOdo Model
  var Todo  = mongoose.model('Todo',toDoSchema);


  var urlEncodeParser=bodyParser.urlencoded({extended: false});

module.exports = function (app) {

  app.get('/todo',function(req,res){
    // Get Data From Mongooese and pass it to vi
    Todo.find({},function(err,data) {
      if (err) throw err;
      res.render('todo',{todos:data});
    });
  });

  app.post('/todo',urlEncodeParser,function(req,res){
    // Get ata from the view and post it  to Mongooese DB
    var newTodo = Todo(req.body).save(function(err,data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item',function(req,res){
    // Delete the requested Item from Mongoo DB
    Todo.find(req.item.params.replace(/\-/g," ")).remove(function(err,data) {
      res.json(data);
    });
  });

}
