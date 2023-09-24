const BlogPost = require("../Model/postDBmodel");

let addPost  = async(req,res)=>{
    try {
        const { title, content, author } = req.body;
        const images = req.files.map((file) => file.path); // Get uploaded image URLs
    
        const newPost = new BlogPost({
          title,
          content,
          author,
          images,
        });
    
        await newPost.save();
    
        res.status(201).json({ message: 'Blog post created successfully', data: newPost });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}; 
let getAllPost = async(req,res)=>{
  try{
let allPost = await BlogPost.find()
res.status(200).json({
  data : allPost
})
  }
  catch(err){
    for (let e in err.errors){
      console.log(err.errors[e].message)
      res.status(500).send("internal server error")
    }
  }
}   
let deletePost = async(req,res) => {
 
 try {
  let post = await BlogPost.findByIdAndDelete(req.params.id)
  if (!post){
    res.status(400).send("post not found")
  }
  res.status(200).send("deleted successfully")
 } catch (error) {
  console.log(err.errors[e].message)
  res.status(500).send("internal server error")
 }
}
let updatePost = async(req,res)=>{

try{
  const postId = req.params.id 
  const {title ,content ,author} = req.body
  const updatedImages = req.files.map((file) => file.path);

  const update = await BlogPost.findByIdAndUpdate(
    postId,
    {
      title,
      content,
      author,
      $push: { images: { $each: updatedImages } },
    },
    { new: true } // To return the updated document
    )
    if (!update){
    return  res.status(404).send("this post is not found")
    }
    res.status(200).json({data : update})

      }
      catch(err){
        for (let e in err.errors){
          console.log(err.errors[e].message)
          res.status(500).send("internal server error")
        }
      }
}
let getComments = async(req,res)=>{
  try {
    let post = await BlogPost.findById({_id:req.params.id})
if (!post){
  return res.status(404).send("post is not exit")
}else{
  res.status(200).json({
    "data" : post.Comments
  })
}
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Error")
  }
}





module.exports = {
    addPost,
    getAllPost,
    updatePost,
    deletePost,
    getComments
}