// variables
var searchBtnEl = document.querySelector('.search-btn');
var searchFieldEl = document.querySelector('#searchField');
var cardContainerEl = document.querySelector('.card-container');

// Weather Element Data
var currentWeatherEl = document.querySelector('.current-weather');
var cityNameEl = document.querySelector('.city');
var cityTempEl = document.querySelector('.temp');
var cityFeelsEl = document.querySelector('.feels-like');
var cityHumidityEl = document.querySelector('.humidity');
var cityWeatherEl = document.querySelector('.weather');

// 5 Day Forecast Data
var cardDateEl = document.querySelector('.card-title');
var cardTempEl = document.querySelector('.card-temp');
var cardRealTempEl = document.querySelector('.card-real-temp');
var cardHumidityEl = document.querySelector('.card-humidity');
var cardWeatherEl = document.querySelector('.card-weather');

// Fetch Data
var searchAsideEl = document.querySelector('.city-search');
var fetchId = '&appid=ba973368929878e06f2318c9fa6bd307';

// This function fetchs the API data from openweathermap.org
var getWeatherData = function () {
  var apiUrl =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    searchFieldEl.value +
    '&units=imperial' +
    fetchId;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var cityWeatherData = [
          (cityNameEl.textContent = data.name),
          (cityTempEl.innerHTML =
            'Current Temp: ' + Math.round(data.main.temp) + ' F'),
          (cityFeelsEl.innerHTML =
            'Real Feels: ' + Math.round(data.main.feels_like) + ' F'),
          (cityHumidityEl.innerHTML = 'Humidity: ' + data.main.humidity + '%'),
          (cityWeatherEl.innerHTML = data.weather[0].description),
        ];
        var savedCityWeatherData = [];

        savedCityWeatherData =
          JSON.parse(localStorage.getItem('currentCityData')) || [];

        savedCityWeatherData.push(cityWeatherData);

        localStorage.setItem(
          'currentCityData',
          JSON.stringify(savedCityWeatherData)
        );

        console.log();
        createCityButtons();
        fiveDayForecast();
      });
    }
  });
};

// Fetches 5 Day Forecast from openweathermap.org
var fiveDayForecast = function () {
  var apiUrl =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    searchFieldEl.value +
    '&units=imperial' +
    fetchId;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // 5 Day Weather Cards
        var i = 4;
        var cardData = [
          (cardDateEl.innerHTML = data.list[i].dt_txt),
          (cardTempEl.innerHTML =
            'Temp: ' + Math.round(data.list[i].main.temp) + ' F'),
          (cardRealTempEl.innerHTML =
            'Real Feel: ' + Math.round(data.list[i].main.feels_like) + ' F'),
          (cardHumidityEl.innerHTML = data.list[i].main.humidity + '%'),
          (cardWeatherEl.innerHTML = data.list[i].weather[0].description),
        ];
        var savedCardWeatherData = [];

        savedCardWeatherData =
          JSON.parse(localStorage.getItem('fiveDayCityData')) || [];

        savedCardWeatherData.push(cardData);

        localStorage.setItem(
          'fiveDayCityData',
          JSON.stringify(savedCardWeatherData)
        );
      });
    }
  });
};

// This function searches for a city and adds buttons for previously searched cities
var createCityButtons = function () {
  var savedCity = document.createElement('button');
  savedCity.addEventListener('click', getPreviousData, false);
  savedCity.setAttribute('class', 'search-btn btn btn-secondary');
  savedCity.setAttribute('id', 'savedCityBtn' + searchFieldEl.value);
  savedCity.setAttribute('style', 'margin:0.25em;');
  savedCity.textContent = searchFieldEl.value;
  searchAsideEl.append(savedCity);
};

// Use to test functionality of dynamic button clicks
var getPreviousData = function () {};

// event listeners
searchBtnEl.addEventListener('click', getWeatherData);

// When I click on the search button it tells me if I need to enter a city name
// A button is created for that city
// If I have a name entered the weather information is shown in the current weather div
// 5 Day forecast displays at the same time
// Values of search box are stored in local storage
// When I click on a previously visited city it displays that cities weather information again
