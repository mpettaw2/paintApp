const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const port=process.env.PORT||8080;

app.use('/',express.static('./app'));
app.get('/', function(req, res){
    res.send('static is not working');
    
});

app.listen(port, function(e){
    
    if(e){
        throw e;
        console.log("app not working");
        return;
    }
    console.log("success, app is working");
    
});