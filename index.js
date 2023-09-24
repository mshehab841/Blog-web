const express =require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const Register = require('./Routers/Register')
const post =  require("./Routers/posting")
const comments = require("./Routers/Comments")
const search = require("./Routers/Search")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/blog')
.then(()=>{
    console.log('Database connected...')
}).catch(()=>{
    console.log('forbedin database ')
})

app.use('/register', Register)
app.use('/post', post)
app.use('/comment', comments)
app.use('/search', search)

const  port = process.env.port||3000
app.listen(port,()=>{console.log(`listen to port ${port}...  `)})
