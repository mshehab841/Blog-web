const mongoose = require('mongoose')
const valid = require('validator')

const RegisterSchema = new mongoose.Schema({
    name :{
        type :String,
        required:true,
        unique:true,
        minLength:3,
        maxLength:50,
    },
    email :{
        type :String ,
        required:true,
        unique:true,
        validate:{
            validator :(val)=>{return valid.isEmail(val)},
            message :'{value} is not a valid email'}
    },
    password: {
        type :String , 
        required:true,
        minLength:7,

    },
    token: {
        type :String,
    },
    isAdmin:{
        type:Boolean
    },
      
})
const Register = mongoose.model("users" , RegisterSchema)
module.exports = Register