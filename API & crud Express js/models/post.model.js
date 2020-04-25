const mongoose = require('mongoose')
const Schema = mongoose.Schema 


let PostModel = new Schema({
    title : {
        type:String , 
        max : 150 ,
        required:true 
    },

    desc:{
        type:String,
        min:1,
        required:true ,

    },

    author:{
          type:String,
          max : 100 , 
          required : true 
    },

    date:{
        type:Date,
        default:Date.now

    }

})


module.exports = mongoose.model('postmodel' , PostModel)