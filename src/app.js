const { static } = require('express');
const express = require('express')
const path = require('path');
const hbs = require('hbs');
const app = express()
const weather = require('../utils/weather')
const geocode = require('../utils/geocode')
const req = require('request')

const port = process.env.PORT || 3000 // Gets the port number... If not, then 3000 will be taken as default

const publicPath = path.join(__dirname , '../public')  // Uses path core module to manipulate path 
app.use(express.static(publicPath))  // App uses all the front end files in this directory
// console.log(publicPath)

const viewPath = path.join(__dirname, "../public/templates/views" );
app.set('view engine','hbs')  // Setting up handlebars view engine in our app

app.set('views', viewPath); // App uses all the views in this directory
const partialPath = path.join(__dirname, "../public/templates/partials" );
hbs.registerPartials(partialPath) // App uses the partials in this file

// Home page of app... Renders to index.hbs
app.get('/',(req,res)=>{
    // res.send('Hi')
    res.render('index',{
        title : 'Home page',
        })
})

// Weather page where weather information is displayed... Renders to weather.hbs
app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error: 'Error'
        })
    }
    else{
    // Address is provided as input parameter to geocode
    geocode(req.query.address,(error,{lat,lon,place}={})=> {
        if(error){
            return res.send(error)
        } else {
            // Latitude and longitude from geocode are provided as input parameter to weather
            weather(lat,lon,(error,{feelslike,temperature,place_name}={})=>{
                if(error){
                    return res.send(error)
                }
                // Weather details are rendered to weather.hbs
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
})

// This url matches when any other URL doesnt match... Renders to 404.hbs
app.get('*',(req,res)=>{
    res.render('404',{
        title : 'Incorrect URL',
        data : 'Choose from the available links'
    })
})

// Server is connected (listen) to the specified port
app.listen(port,()=>{
    console.log("Connected successfully to "+ port)
})