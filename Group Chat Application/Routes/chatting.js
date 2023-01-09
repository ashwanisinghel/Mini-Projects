const express=require('express');
const fs=require('fs');

const router=express.Router();

router.get('/',(req,res,next)=>{
    const message=fs.readFileSync('message.txt');
    res.send(`<h3>: ${message}</h3><form action="/chat" method="post"><input type="text" placeholder="message" name="message"><button type="submit">Send</button></form>`);
})

router.post('/',(req,res,next)=>{
    fs.appendFileSync('message.txt',req.body.message);
    console.log(req.body);
    res.redirect('/chat');
})
module.exports=router;
