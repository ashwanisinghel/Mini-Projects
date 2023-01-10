const express=require('express');
const fs=require('fs');

const router=express.Router();

router.get('/',(req,res,next)=>{
    const message=fs.readFileSync('message.txt');
    res.send(`
        <p>${message}</p>
        <form action="/chat" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="post" id="chat">
            <input type="text" placeholder="message" name="message" id="message">
            <input type="hidden" name="username" id="username">
            <input type="submit" value="submit">
        </form>
    `)
})

router.post('/',(req,res,next)=>{
    console.log(req.body);
    fs.appendFileSync('message.txt',`${req.body.username}: ${req.body.message}, `);
    res.redirect('/chat');
})
module.exports=router;


