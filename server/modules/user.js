const express= require('express')
const mongoose=require('mongoose')
const schema=mongoose.Schema
    const userschema=new schema({

        email:{
            unique:true,
                type:String,
                require:true,
                match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                
            },
            password:{type:String,required:true},
            toggle:{type:String,required:true},
            file:{type:String}
            
            
            
            });
            
module.exports=mongoose.model('user',userschema)