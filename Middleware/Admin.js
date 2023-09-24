const jwt = require("jsonwebtoken")

module.exports = async(req,res,next)=>{
    const token = req.header("Authorization")
    if (!token){
        return res.status(404).send("access Denied")
    }
    try {
        const decoded = jwt.verify(token , 'your-secret-key')
        if (decoded && decoded.isAdmin == true){
            req.user = decoded 
        next()
        }else{
            console.log('User is not an admin'); // Debugging statement
            res.status(403).send("access denied ")
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Invalid token' })
    }
}
