const mongoose = require('mongoose');

// a schema is just a blueprint
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

// mongoose also needs a model that uses the blueprint
// args: Model Name, Schema for the model
module.exports = mongoose.model('Post', postSchema)


