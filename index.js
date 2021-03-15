const request = require('request');
// const express = require('express ')
const weather = require('./utils/weather')
const geocode = require('./utils/geocode')

// const url = 'http://api.weatherstack.com/current?access_key=e50bf19f8bccdc77b9a19892c1169a1f&query=Ahmedabad&units=m';
let address = process.argv[2]   // Takes address from user by terminal
// console.log(address)
if(address){
    geocode(address, (err,data)=>{     // Address is provided to geocode 
        console.log(err);
        console.log(data); // Data will consist of latitude, longitude and place_name
        weather(data.lat,data.lon,(err,data)=>{ // Latitude and longitude are provided to geocode
            console.log(err);
            console.log(data); // It contains all the location related data
        })
    })
}
else{
    geocode('ahmedabad', (err,data)=>{
        console.log(err);
        console.log(data);
        weather(data.lat,data.lon,(err,data)=>{
            console.log(err);
            console.log(data);
        })
    })
    
}
