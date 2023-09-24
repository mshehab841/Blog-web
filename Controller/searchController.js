const BlogPost = require("../Model/postDBmodel")

let addSearch = async(req,res)=>{
    try {
        let keyword = req.query.q 
        const searchResult = await BlogPost.find({$text :{$search :keyword}})
        res.status(200).json(searchResult)
        
    } catch (error) {
        console.error(error)
        res.send("internal error")
    }
}

module.exports = {
    addSearch
}