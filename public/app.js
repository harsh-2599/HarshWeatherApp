console.log("Client side js");

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const output = document.querySelector('#message1')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    window.location.href = "http://localhost:3000/weather?address="+location;

    //Use this when you want to use client side js

    // fetch('http://localhost:3000/weather?address='+location).then((response) => {
    // response.json().then((data)=>{
    //     console.log(data);
    //     output.textContent= data.temperature
    // });
// });

})
