import express from 'express'
var app = express()
app.get('/',function(req,res){
    res.send('Hello World')
})

app.listen(4000,function(){
    console.log('Example app')
})