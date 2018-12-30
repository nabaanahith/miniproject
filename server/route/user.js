const express=require('express')
const router=express.Router();
const app=express()
const userscema= require('../modules/user')
const becrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const moongose= require('mongoose')
const upload =require('express-fileupload')
const checkauth=require('../../middelware/checkauth')
const uuid =require('uuid/v1');
const joi =require('joi');
router.get('/adduser',(req,res)=>{
app.use(upload())
const a=[
   {id:1,fn:'ll',ln:'ll'},
   {id:1,fn:'ll',ln:'ll'},
]
res.json(a);


})
app.post('/upload', function(req, res) {
    console.log(req.files.filename);
    res.send({ok:true})
  });




  //form contains a file input, but is missing method=POST and enctype=multipart/form-data on the form.  The file will not be sent. upload






router.get('/getuser',(req,res)=>{

res.send('all uset get ')


})
app.get("/downlad",(req,res)=>{

res.sendFile(__dirname+"/index.html")


})



router.get('/deleteuser',(req,res)=>{


res.send('ok delete!')


})



router.get('/list/user',(req,res)=>{
   
        userscema.find({}).then(function (users) {
        console.log("users",users);
        res.send(users)
        
        });
      

})


router.get('/regester/:email/:password',(req,res)=>{
  
   userscema.find({email:req.params.email}).exec().then(user=>{
      if(user.length>=1){
      return res.status(401).json({
          message:'mail exist'
      })
      
          }
          else{
              becrypt.hash(req.params.password,10,(err,hash)=>{
      
      
                  if(err){
                      console.log(err.message);
                      
                      return res.status(500).send(err)
                  }
          
          else{
              const newuser=new userscema({
                  email:req.params.email,
                  password:hash,
                  toggle:"0"
              });
              
          
          newuser.save().then(result=>{
            console.log("result",result);
          res.status(201).json([{messg:'done'}])
          
          
          }).catch(err=>{
              console.log("err",err);
              
            res.status(404).json([{messg:err}])
          
          
          })
          
          }
          } 
          )
         
      
      
          }
      
      
          })
      })
    
      //#3fbbc0
router.get('/checklogin',checkauth,(req,res)=>{
    /*const token=req.headers.token;
    if(token){
    
    }
    else{
        res.status(400).send('there is no token')
    }*/
    jwt.verify(req.token,'secret',(err,auth)=>{
    console.log("req.token",req.token);
    
    if(err){
       // console.log("err in check",err.message);
        console.log("err in check",err);
        
        res.status(400).send(err);
    }
    
    else{
        //for payload info. i console or may can send as response
        console.log(auth.iat);
        res.send(auth)
    
    
    }
    
    
    
    
    })
    });
      router.get('/:id',(req,res)=>{
      
          userscema.remove({_id:req.params.id}).exec().then(result=>{
      
      res.status(200).send("deleted")
      
          }).catch(err=>{
      res.status(400).send(err.message)
      
      
          })
      
      
    })

    router.get('/login/:email/:password',(req,res)=>{
        userscema.find({email:req.params.email})
        .exec().then(user=>{
            console.log("user:",user);
            if(user.length<1){
res.status(400).send("auth faild")
console.log("login faild");




            }
            
        
        becrypt.compare(req.params.password,user[0].password,(fauiler,sucess)=>{
            if(fauiler){
                
                console.log('please enter correct password');
             
                return res.status(401).json({fauler:fauiler.message})

                
            }
            if(sucess){
             
const token= jwt.sign({email:user[0].email,_id:user[0]._id},'secret', {


    expiresIn:"1h"
});

return res.status(200).json({

    message:'login sucess',
    token:token
})


}

})

} ).catch(err=>{

console.log(err);
res.status(422).json({err:err.message})



})




})

function validationSchema(result){
    var userscema =joi.object().keys()({
        file:joi.string()
    })
    return joi.validate(result,userscema)
}

        
module.exports=router;