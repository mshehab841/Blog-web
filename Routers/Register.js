const express = require('express')
const router = express.Router()
const User = require('../Model/UserDBmodel')
const userValidator = require("../Middleware/userMWValidate")
const bcrypt = require('bcrypt')
const loginValidator = require("../Middleware/loginMWValidate")
const jwt = require("jsonwebtoken")


router.post("/r" , userValidator, async (req,res)=>{

    try{
    let user = await User.findOne({email:req.body.email}).exec()
    if(user){
       return res.send('this email is already exits')
    }
    let sault = await bcrypt.genSalt(10)
    let hashPassword = await bcrypt.hash(req.body.password , sault) 
    //create a jwt token 
    

    let newUser = new User({
        email:req.body.email,
        name:req.body.name,
        password:hashPassword,
        isAdmin : false
    })
    await newUser.save();

    // Generate a JWT token for the newly registered user
    const token = jwt.sign({ _id: newUser._id.toString(),isAdmin: newUser.isAdmin, name: newUser.name }, 'your-secret-key');

    // Save the token to the user's tokens array
    newUser.token = token


    // Save the user with the updated tokens array
    await newUser.save();
    res.status(200).send('register successfully')
    }
    
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
})

router.post("/l" ,loginValidator, async(req,res)=>{

    try {
        let user = await User.findOne({email:req.body.email}).exec()
        if (!user){
            return res.send("this is invalid email")
        }
        const validPass = await bcrypt.compare(req.body.password , user.password)
        if (!validPass){
            return res.send("this is invalid password")
        }
        res.status(200).send(user)
        
    } catch (err) {
        for (let e in err.errors){
            console.log(err.errors[e].message)
            res.status(400).send("bad request...")
        }
    }
})

router.post("/promote-admin", async (req, res) => {
    try{
        let user = await User.findOne({email:req.body.email}).exec()
        if(user){
           return res.send('this email is already exits')
        }
        let sault = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(req.body.password , sault) 
        //create a jwt token 
        
    
        let newUser = new User({
            email:req.body.email,
            name:req.body.name,
            password:hashPassword,
            isAdmin : true
        })
        await newUser.save();
    
        // Generate a JWT token for the newly registered user
        const token = jwt.sign({ _id: newUser._id.toString(),isAdmin: newUser.isAdmin }, 'your-secret-key');
    
        // Save the token to the user's tokens array
        newUser.token = token
    
    
        // Save the user with the updated tokens array
        await newUser.save();
        res.status(200).send('register successfully')
        }
        catch(error){
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
        }
});

module.exports = router ;