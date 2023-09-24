const validator = require("../Util/loginValidator")

module.exports = (req,res,next)=>{
    let valid = validator(req.body)
    if (valid){
        req.valid = 1
        next()
    }else{
        res.status(400).send("something wrong in validator")
    }
}