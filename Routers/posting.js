const express = require("express")
const router = express.Router()
const postController = require("../Controller/postController")
const upload = require("../Middleware/upload")
const admin = require("../Middleware/Admin")
const auth = require("../Middleware/Authentication")

router.post ("/" ,admin,upload.array('images', 5), postController.addPost)
router.get("/"  ,postController.getAllPost)
router.put("/:id" ,admin ,upload.array('images', 5), postController.updatePost)
router.delete("/:id" ,admin, postController.deletePost)

//get comments 
router.get("/:id" , postController.getComments)


module.exports = router  