const jwt = require("jsonwebtoken")

module.exports = async(req,res,next)=>{
    const token = req.header("Authorization")
    if (!token){
        return res.status(404).send("access Denied")
    }
    try {
        const decoded = jwt.verify(token , 'your-secret-key')
        req.user = decoded 
        next()
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' })
    }
}