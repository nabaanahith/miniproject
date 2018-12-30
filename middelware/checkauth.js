const jwt=require('jsonwebtoken')


module.exports=(req,res,next)=>{
  
const bheader=req.headers.authorization;
if(typeof bheader!=='undefine'){

const bearer=bheader.split(' ');
const btoken=bearer[1];
req.token=btoken;
next();

}
else{

    res.status(403).send("no token have")
}
}