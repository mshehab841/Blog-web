const Ajv = require("ajv")
const ajv = new Ajv()

const loginSchema = {
    "type":"object", 
    "properties" :{
        "email":{
            "type":"string",
            "pattern":".+\@.+\..+"
        },
        "password":{
            "type":"string",
            "minLength":5
        }
    },
    "required":["email","password"] 
}
module.exports = ajv.compile(loginSchema)