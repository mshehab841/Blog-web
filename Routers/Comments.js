const express = require("express")
const router = express.Router()
const commentsController = require("../Controller/commentController")
const auth = require("../Middleware/Authentication")
const admin = require("../Middleware/Admin")


router.post("/:id", auth ,commentsController.addComment)
router.delete("/:postId/:commentId" , commentsController.deleteComment)


module.exports = router
