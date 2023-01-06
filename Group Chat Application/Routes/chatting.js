const express=require('express');

const router=express.Router();

router.get('/',(req,res,next)=>{
    res.send('<form action="/chat" method="post"><input type="text" placeholder="message"><button type="submit">Send</button></form>')
})

router.post('/',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/chat')
})
module.exports=router;
