const express = require("express")


const api  = express.Router()

const postmodel = require('../models/post.model')



api.get('/createpost' , (req,res)=>{

    //res.send("this is a create post method")

    res.render('create.html' , {
        title : 'Create Post'
    })


})


api.post('/createpost' , (req,res)=>{

    var inputs = [req.body.title , req.body.desc , req.body.author]

    const post = new postmodel({
        title: inputs[0] , 
        desc : inputs[1] ,
        author : inputs[2]
    })

    let process = post.save()

    if(process){
        res.redirect('/')
    }
    else{
        res.status(400).send("cannot process data to dabase")
    }



    console.log(inputs)

})

api.get('/jsonifyposts' , (req, res)=>{

    postmodel.find({} , (err, data)=>{
       
        let jsonposts = [data]
        
        jsonposts.forEach(jsonify)
    
        function jsonify(jsonified , idxfjsonified){
            
            res.json(jsonified)
        }
       })

})


api.get('/posts' , (req,res)=>{

    postmodel.find({} , (err, data)=>{

        const post = [data]

        post.forEach(myfun)
        
        function myfun( posts , x){
            res.render('posts.html' , {
                title : 'Posts' , 
                posts : posts 
            } )
        }

    })
    

})


api.get('/updatepost/:id' , (req,res)=>{

  postmodel.findById({
      _id:req.params.id 
  }, (err , data ) =>{

    if(err) {
        res.status(400).send(err)
    }
    else{
        res.render('update.html' , {
            title:'Update Post',
            data :data, 
            postid : req.params.id  

        })
    }
  })
})

api.post('/update/:id' , (req,res)=>{

    let  post = {}

    post.title = req.body.title ,
    post.desc  = req.body.desc ,
    post.author = req.body.author,




    postmodel.findOneAndUpdate({_id :req.params.id} , {$set : post} , (err,post)=>{
        if(err){
            res.status(400).send(err)
        }
        else{
            res.json(post)

        }



    })
})

api.post('/delete/:id' , (req,res)=>{

    postmodel.findOneAndDelete({_id : req.params.id} , (err, data)=>{
        if(err){
            res.status(400).send(err)

        }
        else{
            res.redirect('/posts')
        }
    })

})


api.get('/viewpost/:id' , (req,res)=>{

    postmodel.findOne({_id : req.params.id} , (err , data )=>{
        
        if(err){

            console.log(err) 

            res.send([err])

        }
        else{
            var jsondata = [data] 
            
            res.render('this.html' , {

                title : jsondata[0].title ,

                posttitle : jsondata[0].title , 

                desc : jsondata[0].desc ,

                author : jsondata[0].author ,

                date : jsondata[0].date, 


                postid : req.params.id 





                

            })
        }
    })
})

module.exports = api