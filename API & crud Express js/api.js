const express = require("express")
const mongoose = require("mongoose")
const swig = require("swig")
const posthandler = require('./controllers/post.controller')
const userhandler = require('./controllers/user.controller')
const bodyParser = require('body-parser')
let api= express()

//datbase setup
mongoose.connect('mongodb://localhost/expressblog' , {
    useNewUrlParser:true ,
    useUnifiedTopology:true
})

let db = mongoose.connection

//for connection er

db.on('err' ,(err)=>{

    console.log("cannot connect to mongo database")
} )

//connection established

db.once('open' , ()=>{
    console.log(`connected to database nameed ${db.name}`)
})

//configure a view template and view engine
api.engine('html' , swig.renderFile)

api.set('view-engine' , 'html')

//middlewares


api.use(bodyParser.urlencoded({ extended: false }));

api.use(bodyParser.json());


//all my routes

api.get('/' , (req,res)=>{
    res.send("successfully using api")
})

api.use('/' , posthandler)




const PORT  = process.env.PORT || 4000


api.listen(PORT , ()=>{
    console.log(`listening to port at ${PORT}`)
})
