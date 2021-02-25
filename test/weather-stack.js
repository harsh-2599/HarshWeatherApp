const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=e50bf19f8bccdc77b9a19892c1169a1f&query=23.0225,72.5714&units=m';

request(url, {json: true },(error,res)=> {
    if(error){
        console.log("Cant connect ");
    }
    else if(res.body.error)
    {
        console.log("Please try another latitude and longitude");
        console.log(res.body.error.info);
    }
    else{
        console.log("here")
       console.log(res.body.location.name);
    //    console.log(resObject.location.lat);
    //    console.log(resObject.location.lon);
        // console.log(res.body);
       console.log(res.body.current.feelslike)
       console.log(res.body.current.temperature)
    }
})