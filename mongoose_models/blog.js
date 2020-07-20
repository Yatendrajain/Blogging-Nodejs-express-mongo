const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const blogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  username : String,
  image : String,
  createdAt : {
    type : Date,
    default : new Date()
  }
});

const post = mongoose.model('post' , blogPost)
module.exports = post