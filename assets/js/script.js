// Variables
var citySearchForm = document.querySelector('#cityForm');
var citySearchInput = document.querySelector('#cityInput');
var previousCitySearch = document.querySelector('#searchedCity');
var currentWeatherEl = document.querySelector('#currentWeatherContainer');
var fiveDayForecastTitle = document.querySelector('#forecastTitle');
var fiveDayForecastEl = document.querySelector('#forecastContainer');
var previousSearchBtns = document.querySelector('#previousSearchBtns');

// Array to store user city inputs
var cities = [];

var formSubmit = function (event) {
  event.preventDefault();
  var city = citySearchInput.value.trim();

  if (city) {
    currentWeather(city);
    // fiveDayForecast(city);

    cities.unshift({ city });
    citySearchInput.value = '';
  } else {
    alert('Please enter a city name');
  }

  savedCities();

  // previousSearchBtns(city);
};

var savedCities = function () {
  localStorage.setItem('cities', JSON.stringify(cities));
};

var currentWeather = function (city) {
  var apiKey = `ba973368929878e06f2318c9fa6bd307`;
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      displayCurrentWeather(data, city);
    });
  });
};

var displayCurrentWeather = function (weather, searchedCity) {
  console.log(weather, searchedCity);
};

var getUvIndex = function (lat, lon) {
  console.log(lat, lon);
};

var displayUvIndex = function (index) {
  console.log(index);
};

var fiveDayForecast = function (city) {};

var displayFiveDayForecast = function (forecast) {};

var previousSearch = function (previousSearch) {};

var previousSearchHandler = function (event) {};

citySearchForm.addEventListener('submit', formSubmit);

previousSearchBtns.addEventListener('click', previousSearchHandler);

// When I click on the search button it tells me if I need to enter a city name
// A button is created for that city
// If I have a name entered the weather information is shown in the current weather div
// 5 Day forecast displays at the same time
// Values of search box are stored in local storage
// When I click on a previously visited city it displays that cities weather information again
