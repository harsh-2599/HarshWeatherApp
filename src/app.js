const { static } = require('express');
const express = require('express')
const path = require('path');
const app = express()

const viewpath = path.join(__dirname, "../public/views" );
app.set('view engine','hbs')
app.set('views', viewpath);

// const publicPath = path.join(__dirname , '../public')
// app.use(express.static(publicPath))
// console.log(publicPath)

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/weather',(req,res)=>{
    res.send("This is your weather page")
})

app.listen(3000,()=>{
    console.log("Connected successfully")
})