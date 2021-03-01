const { static } = require('express');
const express = require('express')
const path = require('path');
const hbs = require('hbs');
const app = express()
const weather = require('../utils/weather')
const geocode = require('../utils/geocode')
const req = require('request')

const port = process.env.PORT || 3000

const publicPath = path.join(__dirname , '../public')
app.use(express.static(publicPath))
console.log(publicPath)

const viewPath = path.join(__dirname, "../public/templates/views" );
app.set('view engine','hbs')
app.set('views', viewPath);

const partialPath = path.join(__dirname, "../public/templates/partials" );
hbs.registerPartials(partialPath)

app.get('/',(req,res)=>{
    // res.send('Hi')
    res.render('index',{
        title : 'Home page',
        })
})

app.get('/weather',(req,res)=>{
    // if(!req.query.address){
    //     return res.send({
    //         error : 'Error message'
    //     })
    // }
    // res.send('Correct address')
    if(!req.query.address){
       return res.send({
            error: 'Error'
        })
    }
    else{
    geocode(req.query.address,(error,{lat,lon,place}={})=> {
        if(error){
            return res.send(error)
        } else {
            weather(lat,lon,(error,{feelslike,temperature,place_name}={})=>{
                if(error){
                    return res.send(error)
                }
                res.render('weather',{
                    feelslike,
                    temperature,
                    location : place_name,
                    address : place,
                    title : 'Weather page'
                })

                //Use this when you want to use client side js

                // res.send({
                //     feelslike,
                //     temperature,
                //     location : place_name,
                //     address : place,
                //     title : 'Weather page'
                // })
            })
        }
    
    })
}
    // res.render('weather',{
    //     title: 'Weather Page',
    //     data : 'In the weather page'
    // })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : 'Incorrect URL',
        data : 'Choose from the available links'
    })
})
app.listen(port,()=>{
    console.log("Connected successfully to "+ port)
})