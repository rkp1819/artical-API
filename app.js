//jshint esversion: 6
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


 //db
 mongoose.connect("mongodb://localhost:27017/articleDB", { useUnifiedTopology: true, useNewUrlParser: true});

 const articleSchema = mongoose.Schema({
     title: {
       type: String,
       required: [true, "Please use a title"]
     },
     content: {
       type: String,
       required: [true, "but... whats the article"]
     }
 });
 const Article = new mongoose.model('Article', articleSchema);


//get all
app.get("/articles", function(req, res){
  Article.find({}, function(err, foundArticles){
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(foundArticles);
    }
  });
});

//delete all
app.delete("/articles", function(req, res){
  Article.deleteMany({}, function(err){
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

//post specific
app.post("/articles", function(req, res){
  console.log(req.body.title);
  console.log(req.body.content);

  article = new Article({
    title:req.body.title,
    content:req.body.content,
  });
  Article.create(article, function(err, doc){
      if (err) {
        console.log(err);
        res.status(500).send(e);
      } else {
        res.sendStatus(200);
      }
  });

});

//get specific
app.get("/articles/:id", function(req, res){
  Article.findOne({ _id: req.params.id },{}, function(err, foundArticle){
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(foundArticle);
      res.status(200).send(foundArticle);
    }
  });
});

//replace specific
app.put("/articles/:id", function(req, res){
  article = new Article({ title: req.body.title, content: req.body.content });
  Article.replaceOne({ _id: req.params.id }, { title: req.body.title, content: req.body.content }, function(err, writeOpResult){
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(writeOpResult);
      res.sendStatus(200);
    }
  });
});

//update specific
app.patch("/articles/:id", function(req, res){
  Article.updateOne({ _id: req.params.id }, { content: req.body.content }, function(err){
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

//delete specific
app.delete("/articles/:id", function(req, res){
  Article.deleteOne({ _id: req.params.id }, function(err){
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});




//port settings
let port = process.env.PORT;
app.listen(port || 3000, function(){
  console.log("server started at port 3000");
});
