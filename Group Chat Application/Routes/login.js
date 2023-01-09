const bodyParser = require('body-parser');
const express=require('express');

const router=express.Router();


router.get('/',(req,res,next)=>{
    res.send(`<form action="/chat" onsubmit=localStorage.setItem('username',document.getElementById('username').value) method="post"><input type="text" placeholder="message" id='username' name="message"><button type="submit">Send</button></form>`)
})

router.post('/',(req,res,next)=>{
    console.log(req.body.username);
    res.redirect('/chat');
})

module.exports=router;