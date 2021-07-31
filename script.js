'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

////////////Making AJAX calls using XMLHttp requests with callback functions//////////
const renderCountry = function(data){
    const html = ` 
    <article class="country">
<img class="country__img" src="${data.flag}" />
<div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
  <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
  <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
</div>
</article>
`;
countriesContainer.insertAdjacentHTML('beforeend',html);
countriesContainer.style.opcacity = 1;
};
  
const getCountryAndNeighbour = function(country){
    //Ajax Call country 1
const request = new XMLHttpRequest(); 
request.open('GET',`https://restcountries.eu/rest/v2/name/${country}`);

request.send();
//First callback function
request.addEventListener('load', function(){
   const [data] = JSON.parse(this.responseText);
   console.log(data);
   //Render country 1
   renderCountry(data);

   // Get neighbour country (2)
   const [neighbour] = data.borders;

   if(!neighbour) return;
   //AJAX call country 2
   const request2 = new XMLHttpRequest();
   request2.open('GET',`https://restcountries.eu/rest/v2/alpha/${neighbour}`);

request2.send();
//Second call back function inside the first callback function (nested/callback hell)
request2.addEventListener('load', function(){
   const data2 = JSON.parse(this.responseText);// since we are using countrycode in the url instead of the name to find the neighbour and country codes are unique and not objects we dont have to destructure them.
   console.log(data2);
   renderCountry(data2);

});

});
};
getCountryAndNeighbour('usa');

//Here, the second callback function is nested isnside the first callback function and thus the second function will not be invoked before the first function. Thus, we will first get the data regarding the country and after that for its neighbour.

///////Making AJAX calls using Promises adn Fetch APIs/////////
//const request = new XMLHttpRequest(); 
//request.open('GET',`https://restcountries.eu/rest/v2/name/${country}`);

//request.send();
//const request = fetch(`https://restcountries.eu/rest/v2/name/portugal`);
//console.log(request);


//promise is an object that is used as a placeholder for the future result of an asynchronous operation. By using promises we dont have to rely on events and callback functions to handle asynchronous results.
//Promises life cycle begins with 'pending stage' i.e before the future value is available, the second stage is 'settled' i.e when the asynchronous task has finished.
// If the task was succesfully executed the promise is fulfilled or else rejected. The promise is only settled once, and from there the state will remain unchanged.
//Fetch function builds the promise and returns it to us to consume. Some times we ourselves need to build the promise and consume it.


/*const getCountryData = function(country){
    //below code will build a promise which will be pending till the data is fetched, then it will be settled  either fulfilled or rejected. If succesful we will get the value/data to work with.
    //to use the value available we will use 'then' method. On the then method we will all a function that we want to be executed as soon as the promise is fulfilled.
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function(
        response
        ){
            console.log(response);
            return response.json();// the response will have to be converted to a javascriptobject from json using json method. json itself is an asynchronous function which means it will also return a promise. The value after converting json will be return to its promise which will be handled by the proceeding 'then'
        }).then(function(data){
            console.log(data);
            renderCountrydata[0];
        });

};
getCountryData('portugal');*/

const getCountryData = function(country){
fetch(`https://restcountries.eu/rest/v2/name/${country}`)
.then(response=>response.json())
.then(data=>renderCountrydata[0]);
    
};
getCountryData('portugal');

//We removed console statements as they were only for testing purpose and replaced regular functions with arrow functions that eturn values implicitly without using the return keyword.