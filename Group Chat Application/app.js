const express= require('express');
const bodyParser=require('body-parser');
const loginRoutes=require('./Routes/login')
const chatRoutes=require('./Routes/chatting');

const app= express();
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res,next)=>{
    console.log('App started')
    res.send('<h1>Welcome to Home page</h1><input type="button" onclick=location.href="/login" value="login">')
})

app.use('/login',loginRoutes);
app.use('/chat',chatRoutes);

app.listen(4000);