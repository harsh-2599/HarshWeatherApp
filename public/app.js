// Client side java scripting
console.log("Client side js");

// Elements are selected from the hbs file
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const output = document.querySelector('#message1')

// When submit is clicked this function is performed
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault(); // Automatic refreshing of the web page is prevented using this function
    const location = search.value; // Value is taken from input text box

    // The address value is used and the page is redirected to the given URL
    window.location.href = "/weather?address="+location;  

    //Use this when you want to use client side js

    // fetch('/weather?address='+location).then((response) => {
    // response.json().then((data)=>{
    //     console.log(data);
    //     output.textContent= data.temperature
    // });
// });

})

