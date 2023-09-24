const Ajv = require('ajv')
const ajv = new Ajv()

const Schema={
    "type":"object",
    "properties":{
        "email":{
            "type":"string",
            "pattern":".+\@.+\..+"
        },
        "name":{
            "type":"string",
            "pattern":"^[A-Z][a-z]*$",
        },
        "password":{
            "type":"string",
            "minLength":5
        }
    },
    "required":["email","name","password"]
}


module.exports = ajv.compile(Schema)