const mongoose = require("mongoose")



const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    timestamp: { type: Date, default: Date.now },
    images: [String], // Array of image URLs
    Comments :[Object]
  });
  blogPostSchema.index({ content: 'text' , author : 'text' });

  
  const BlogPost = mongoose.model("blogposts", blogPostSchema);

  
  module.exports = BlogPost;