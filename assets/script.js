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
var weatherBox = $('.weather-box');
var forecastTitle = $('.five-day-title')
var myAPIKey = '8d64cb1649f0181a57c7e16d24703758';
var now = moment();
var today = now.format('(M/DD/YYYY)');
var urlArr = [];

window.onload = function () {
    var localURLArr = JSON.parse(localStorage.getItem('urlArr')) || [];

        for (i = 0; i < localURLArr.length; i++) {
            createButton(localURLArr[i]);
        }
}

inputForm.submit(function (event) {
    event.preventDefault();

    $('.five-day-title').attr('display', 'flex');
    weatherBox.empty();
    var userCity = cityInput.val();
    showCurrentWeather(userCity);
    showForecast(userCity);

    var localURLArr = JSON.parse(localStorage.getItem('urlArr')) || [];
    localURLArr.push(userCity);
    console.log(localURLArr);

    localStorage.setItem("urlArr", JSON.stringify(localURLArr));

    createButton(userCity);
})

const createButton = (cityName) => {
    var cityButton = $('<a></a>')
    cityButton.text(cityName);
    cityButton.addClass("city-button list-group-item list-group-item-action");
    cityBtns.append(cityButton);
}

cityBtns.on('click', ".city-button", function (event) {
    weatherBox.empty();
    showCurrentWeather( $(event.target).text());
    showForecast($(event.target).text());
});

const showCurrentWeather = (cityName) => {
    const todayWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myAPIKey}`;

    fetch(todayWeatherURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {

            console.log(data);
            console.log(data.name);
            console.log(data.main.humidity);
            console.log(data.main.temp);
            console.log(data.wind.speed);

            var cityName = data.name;
            var cityH1 = $('<h1></h1>').text(`${cityName} ${today}`);

            var iconcode = data.weather[0].icon;
            var iconurl = `http://openweathermap.org/img/w/${iconcode}.png`;
            var iconimg = $('<img></img>').attr('src', iconurl);

            cityH1.append(iconimg);
            weatherBox.append(cityH1);

            var CelsTemp = data.main.temp - 273;
            var fahrTemp = Math.floor(CelsTemp * (9 / 5) + 32);

            var currTemp = $('<p></p>').text(`Temperature: ${fahrTemp} \xB0F`);
            weatherBox.append(currTemp);

            var humid = data.main.humidity;
            var currHumid = $('<p></p>').text(`Humidity: ${humid}%`)
            weatherBox.append(currHumid);

            var wind = data.wind.speed;
            var currWind = $('<p></p>').text(`Wind Speed: ${wind} MPH`)
            weatherBox.append(currWind);

        })
}

const showForecast = (cityName) => {
    const fiveDayForcast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${myAPIKey}`;

    fetch(fiveDayForcast)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {

        console.log(data);

        //filter the data 5 forecast day at desired time
        const filteredData = data.list.filter((datum) => {
            return datum.dt_txt.indexOf("18:00:00") > -1;
        });

        console.log("filteredData",filteredData);

        
        //build template
        let template = ``;
        
        filteredData.forEach((datum) => {
            var CelsTemp = datum.main.temp - 273;
            var fahrTemp = Math.floor(CelsTemp * (9 / 5) + 32);

            var iconcode = datum.weather[0].icon;
            var iconurl = `http://openweathermap.org/img/w/${iconcode}.png`;

            var humidity = datum.main.humidity;

            template += `
            <div class="card col-lg-2 col-sm-12 bg-primary text-white ">
            <div class="card-body">
              <h5 class="card-title">${moment(datum.dt_txt).format('M/DD/YYYY')}</h5>
              <img src=${iconurl} class='card-icon'>
              <p class="card-text">Temp: ${fahrTemp} \xB0F</p>
              <p class="card-text">Humidity: ${humidity}%</p>
            </div>
          </div>
            `;
        })

        //insert the tempalte into the page as html
        $(".forecast-box").html(template);
    });
}
console.log(moment('2021-04-07 18:00:00').format('M/DD/YYYY'));