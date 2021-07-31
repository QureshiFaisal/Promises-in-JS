'use strict'

    //Country 1
    const getCountryData = function(country){
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
    .then(data => renderCountry(data));
    
    };
    getCountryData('portugal');