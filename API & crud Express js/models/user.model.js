const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const date = new Date()
let UserModel = new Schema({
    email: {
        type:String , 
        max : 150 ,
        required:true ,
        unique:true
    },

    username:{
        type:String,
        min:2,
        max:25,
        required:true ,
        unique:true,

    },

    password:{
          type:String,
          min : 8, 
          required : true 
    },

    date:{
        type:Date,
        default:date 

    }

})


module.exports = mongoose.model('usermodel' , UserModel)