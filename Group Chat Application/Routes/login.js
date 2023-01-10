const bodyParser = require('body-parser');
const express=require('express');
const path=require('path')
const router=express.Router();


router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','loginview.html'))
})

router.post('/',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/chat');
})

module.exports=router;