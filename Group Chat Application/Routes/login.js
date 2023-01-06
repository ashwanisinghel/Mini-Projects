const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.send('<form action="/chat" method="post"><input type="text" placeholder="usename" name="urername"><button type="submit">Login</button></form>')
})

router.post('/',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/chat')
})

module.exports=router;