// dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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
  const post = req.body;
  console.log(post);
  // 201 -> ok, new resource created
  res.status(201).json({
    message: 'Post data successfully'
  });
});

app.get('/api/posts' ,(req, res, next) => {
  const posts = [
    {
      id: 'hga1231',
      title: 'First server-side post',
      content: 'This is coming from the server',
    },
    {
      id: 'sdf675',
      title: 'Second server-side post',
      content: 'This is coming from the server!',
    }
  ]
  res.status(200).json({
    msg: 'Posts fetched succesfully',
    posts: posts
  });
});

module.exports = app;
