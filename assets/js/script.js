// variables
var searchBtnEl = document.querySelector('.search-btn');
var searchFieldEl = document.querySelector('#searchField');

var currentWeatherEl = document.querySelector('.current-weather');
var cityDateEl = document.querySelector('.city-date');
var cityTempEl = document.querySelector('.temp');
var cityFeelsEl = document.querySelector('.feels-like');
var cityHumidityEl = document.querySelector('.humidity');
var weatherDescriptionEl = document.querySelector('.weather');
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
        cityDateEl.textContent = data.name;
        cityTempEl.innerHTML =
          'Current Temp: ' + Math.round(data.main.temp) + ' F';
        cityFeelsEl.innerHTML =
          'Real Feels: ' + Math.round(data.main.feels_like) + ' F';
        cityHumidityEl.innerHTML = 'Humidity: ' + data.main.humidity + '%';
        weatherDescriptionEl.innerHTML = data.weather[0].description;
        console.log(data);
        createCityButtons();
        fiveDayForecast();
      });
    }
  });

  console.log(searchFieldEl.value);
};

var fiveDayForecast = function () {
  var apiUrl =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    searchFieldEl.value +
    '&units=imperial' +
    fetchId;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    }
  });
  console.log(apiUrl);
  clearText();
};

// This function searches for a city and adds buttons for previously searched cities
var createCityButtons = function () {
  if (searchFieldEl == '') {
    alert('Please enter a valid city name');
  } else if (searchFieldEl) {
    var savedCity = document.createElement('button');
    savedCity.addEventListener('click', write, false);
    savedCity.setAttribute('class', 'search-btn btn btn-secondary');
    savedCity.setAttribute('id', 'savedCityBtn' + searchFieldEl.value);
    savedCity.setAttribute('style', 'margin:0.25em;');
    savedCity.textContent = searchFieldEl.value;
    searchAsideEl.append(savedCity);
  }

  saveData();
};

// Use to test functionality of dynamic button clicks
var write = function () {
  console.log('hello');
};

// Function to save to local storage
var saveData = function () {
  var searchFieldEl = document.getElementById('searchField').value.trim();
  var savedWeatherData = [];

  savedWeatherData = JSON.parse(localStorage.getItem('weatherData')) || [];

  savedWeatherData.push(searchFieldEl);

  localStorage.setItem('weatherData', JSON.stringify(savedWeatherData));
};

// Clears the form for easier usability
var clearText = function () {
  searchFieldEl.value = '';
};

// event listeners
searchBtnEl.addEventListener('click', getWeatherData);

// When I click on the search button it tells me if I need to enter a city name
// A button is created for that city
// If I have a name entered the weather information is shown in the current weather div
// 5 Day forecast displays at the same time
// Values of search box are stored in local storage
// When I click on a previously visited city it displays that cities weather information again
