const { json } = require('body-parser');
const request = require('request');

const geocode =(address,callback)=>{
    const gurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmlzYXJnY2hva3NoaSIsImEiOiJja2w5czQ1N2YwOXB1MndueGU5aTJ3ZjNlIn0.ycal6Ux3hO75DYRa-M_nBw&limit=1';
    request(gurl, {json:true},(err,geodata)=>{
        if(err){
            callback("Unable to connect",undefined)
        }
        else if(geodata.body.message){
            callback("No input found", undefined)
        } 
        else if(geodata.body.features.length===0){
            callback(" Please enter correct input",undefined)
        }
        else{
            callback(undefined,{
                lat : geodata.body.features[0].center[1],
                lon : geodata.body.features[0].center[0],
                place : geodata.body.features[0].place_name
        
            })
        }
    })
}


module.exports= geocode