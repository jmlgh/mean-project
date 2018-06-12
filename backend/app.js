// dependencies
const express = require('express');
const bodyParser = require('body-parser');
// required for the database connection
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

// connect to MongoDb database
// returns a promise
// remember to change 'test' default database to an appropiate one
// mongoose will automatically create a collection based on the plural form of the model name
mongoose.connect('mongodb+srv://javi:efFuv7RQJkL1M0t4@mean-project-amges.mongodb.net/node-angular?retryWrites=true')
  .then( () => {
    console.log('Connected to database');
  })
  .catch( () => {
    console.log('Connection to database failed');
  });

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// handle CORS
app.use( (req, res, next) =>{
  // allow all clients to connect to the app
  res.setHeader('Access-Control-Allow-Origin', '*');

  // the incoming request may have these allowed headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATH, DELETE, OPTIONS'
  );
  // continue with with normal operation after previous code has been executed
  next();
});

// routes
app.post('/api/posts', (req, res, next) => {
  // body is created by bodyParser
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  // save new post in mongodb (this method comes from mongoose)
  post.save().then(result => {
    // 201 -> ok, new resource created
    res.status(201).json({
    message: 'Post data successfully',
    postId: result._id
  });
  });
});

app.get('/api/posts' ,(req, res, next) => {
  // method find also comes from mongoose
  // find returns all entries that match with the Schema
  // Post.find((err, documents) => {}); -> this is valid
  // but lets work with promises
  Post.find()
    .then(documents => {
      // response must be inside the async task
      res.status(200).json({
        msg: 'Posts fetched succesfully',
        posts: documents
      });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  // console.log(req.params.id)
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Deleted'
      });
    });
});

module.exports = app;
