const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/login',(req,res,next) => {
    res.send(`<form action="/login" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
              <input type="text" name="username" id="username">
              <button type="submit">Enter</button>
             </form>` );
             
})

app.get('/',(req,res,next) => {
    fs.readFile('message.txt',(err,data) => {
        if(err) console.log(err);

        res.send(`<h3>${data}</h3>
        <form action = "/" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
        <input type="text" name="message">
        <button type="submit">send message</button>
        <input type="hidden" name="username" id="username">
         </form>`); 
         
    })
        
    
});

app.post('/',(req,res,next) => {
    console.log(req.body.username);
    console.log(req.body.message);
    fs.writeFile( 'message.txt',`${req.body.username} : ${req.body.message}`, {flag: 'a'}, (err) => {
        if(err) console.log(err);
        res.redirect('/');
    })
    
    
})

app.post('/login',(req,res) => {
    res.redirect('/');
})

app.listen(3000);


