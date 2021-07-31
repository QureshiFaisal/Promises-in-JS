
'use strict'

const renderError = function(msg){
countriesContainer.insertAdjacentText('beforeend', msg);
countriesContainer.style.opacity = 1;

}// This function will display the error to the user.
const getCountryData = function(country){
    //Country 1
fetch(`https://restcountries.eu/rest/v2/name/${country}`)
.then(response=>response.json())
.then(data=>{
    renderCountry(data[0]);
    const neighbour = data[0].borders[0];

    if(!neighbour) return;

    //Country 2
    return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
})
.then(response => response.json())
.then(data => renderCountry(data))
.catch(err => {
    console.error(`${err}`)// this catch method will catch any error that occurs throughout the promise chain. Thus it is better then handling errors individually for each promise.
       renderError(`Something went wrong. ${err.message}. Try again`);// This string will be passed as an arguement to the function on top.
       //Error in java script are objects and have a message property. We will access it to ensure that only the error is dosplayed to the user and not the whole object.
}).finally(() => {
    countriesContainer.style.opacity = 1;
});// the then method is executed only when the promise is fulfilled, catch is executed only when the promise is rejected due to an error. Finally is executed in both cases. So if you want some code to run in both cases put it in finally.
};
getCountryData('portugal');