// page will be blank on first load except for a search bar on top left
// when user enters a city in search bar
    // a function will take that city, and:
        // fetch weather API using that city
            // create a container with Today's info
            // creat five columns for each next five days
        // save the weather info in containers in buttons below search bar into local storage

var inputForm = $('.my-form');
var cityInput = $('#city-input');
var submitBtn = $('#submit-btn');
var cityBtns = $('.city-buttons');
var weatherBox = $('weather-box');
var myAPIKey = '8d64cb1649f0181a57c7e16d24703758';


inputForm.submit(function(event) {
    event.preventDefault();
    var userCity = cityInput.val();
    console.log(userCity);
    todayWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${myAPIKey}`;
    fiveDayForcaset = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=${myAPIKey}`;
    console.log(todayWeatherURL);
    getAPI(todayWeatherURL, fiveDayForcaset);
})

function getAPI(firstURL, secondURL) {
    fetch(firstURL)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })

    fetch(secondURL)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })


}