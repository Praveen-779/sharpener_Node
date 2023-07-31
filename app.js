const http = require('http');

const express = require('express');

const app = express();

app.use((req,res,next)=> {
    console.log('inside first middleware')
    next();
});
app.use((req,res,next)=> {
    res.send('<h1>hello from node</h1>');
});

app.listen(3000)
