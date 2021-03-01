const request = require('request');

// const url = 'http://api.weatherstack.com/current?access_key=e50bf19f8bccdc77b9a19892c1169a1f&query=23.0225,72.5714&units=m';

const weather = (lat, lon, callback)=>{
    const wurl = 'http://api.weatherstack.com/current?access_key=e50bf19f8bccdc77b9a19892c1169a1f&query='+ lat+ ',' + lon + '&units=m'
    request(  wurl, {json : true},(err,weatherdata)=>{
        if(err){
            callback("Unable to connect" ,undefined)
        }
        else if(weatherdata.body.error){
            callback("Provide proper co-ordinates",undefined)
        }
        else{
            callback(undefined,{
                place_name : weatherdata.body.location.name,
                temperature : weatherdata.body.current.temperature,
                feelslike : weatherdata.body.current.feelslike                
            })
        }
    })
}

module.exports = weather