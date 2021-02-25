const { json } = require('body-parser');
const request = require('request');

// const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/asjdhias.json?access_token=pk.eyJ1IjoibmlzYXJnY2hva3NoaSIsImEiOiJja2w5czQ1N2YwOXB1MndueGU5aTJ3ZjNlIn0.ycal6Ux3hO75DYRa-M_nBw&limit=1';

// request(url,{json:true},(err,res)=> {
//     if(err){
//         throw error;
//     }
//     else if(res.body.message){
//         console.log(res.body.message + ". No input found")
//     } 
//     else if(res.body.features.length===0){
//         console.log(" Please enter correct input")
//     }
//     else{
//         lat = res.body.features[0].center[1]
//         lon = res.body.features[0].center[0]
//         console.log(res.body.features[0].place_name)
//         console.log(lon)
//         console.log(lat)
//     }
// })

geocode =(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmlzYXJnY2hva3NoaSIsImEiOiJja2w5czQ1N2YwOXB1MndueGU5aTJ3ZjNlIn0.ycal6Ux3hO75DYRa-M_nBw&limit=1';
    request(url, {json:true},(err,geodata)=>{
        if(err){
            callback("Unable to connect",undefined)
        }
        else if(geodata.body.message){
            callback(geodata.body.message + ". No input found", undefined)
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

geocode('ahmedabad', (err,data)=>{
    console.log(err);
    console.log(data);
})