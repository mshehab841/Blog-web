const express = require("express")
const router = express.Router()
const searchController = require("../Controller/searchController")


router.get("/",searchController.addSearch)


module.exports = router