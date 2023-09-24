const BlogPost = require("../Model/postDBmodel")
// const user = require("../Model/UserDBmodel")
// const { v4 : uuidv4} = require("uuid")


let addComment = async(req,res)=>{
    try {
        let postId = req.params.id
        let {comment} = req.body
//find spcific post
        let post = await BlogPost.findById(postId)

        if (!post){
            return res.status(404).send("this post not exit")
        }
        

        const newComment = {
            id : req.user._id ,
            name : req.user.name,
            content : comment
        }
            post.Comments.push(newComment)
            const updatePost = await post.save()
            res.status(200).json(updatePost)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
      }
}
let deleteComment = async(req,res)=>{
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
    
        // Find the specific post by its ID
        const post = await BlogPost.findById(postId);
    
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        // Find the index of the comment to be deleted in the Comments array
        const commentIndex = post.Comments.findIndex((comment) => comment.id === commentId);
    
        if (commentIndex === -1) {
          return res.status(404).json({ message: 'Comment not found' });
        }
    
        // Remove the comment from the Comments array
        post.Comments.splice(commentIndex, 1);
    
        // Save the updated post with the comment removed
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);

    } catch (error) {
        console.error(error)
        res.status(500).send("something wrong")
    }
}






module.exports= {
    addComment,
    deleteComment
}