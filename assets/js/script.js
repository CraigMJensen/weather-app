// variables
var searchBtnEl = document.querySelector('.search-btn');
var searchFieldEl = document.querySelector('#searchField');

// Weather Element Data
var currentWeatherEl = document.querySelector('.current-weather');
var cityDateEl = document.querySelector('.city-date');
var cityTempEl = document.querySelector('.temp');
var cityFeelsEl = document.querySelector('.feels-like');
var cityHumidityEl = document.querySelector('.humidity');
var weatherDescriptionEl = document.querySelector('.weather');

// 5 Day Forecast Data
var weatherCardEl0 = document.querySelector('#weatherCard0');
var cardTempEl0 = document.querySelector('.temp0');
var cardRealTempEl0 = document.querySelector('.real-temp0');
var cardHumidityEl0 = document.querySelector('.humidity0');
var cardWeatherEl0 = document.querySelector('.weather0');

var weatherCardEl1 = document.querySelector('#weatherCard1');
var cardTempEl1 = document.querySelector('.temp1');
var cardRealTempEl1 = document.querySelector('.real-temp1');
var cardHumidityEl1 = document.querySelector('.humidity1');
var cardWeatherEl1 = document.querySelector('.weather1');

var weatherCardEl2 = document.querySelector('#weatherCard2');
var cardTempEl2 = document.querySelector('.temp2');
var cardRealTempEl2 = document.querySelector('.real-temp2');
var cardHumidityEl2 = document.querySelector('.humidity2');
var cardWeatherEl2 = document.querySelector('.weather2');

var weatherCardEl3 = document.querySelector('#weatherCard3');
var cardTempEl3 = document.querySelector('.temp3');
var cardRealTempEl3 = document.querySelector('.real-temp3');
var cardHumidityEl3 = document.querySelector('.humidity3');
var cardWeatherEl3 = document.querySelector('.weather3');

var weatherCardEl4 = document.querySelector('#weatherCard4');
var cardTempEl4 = document.querySelector('.temp4');
var cardRealTempEl4 = document.querySelector('.real-temp4');
var cardHumidityEl4 = document.querySelector('.humidity4');
var cardWeatherEl4 = document.querySelector('.weather4');

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
        // 5 Day Weather Card 0
        weatherCardEl0.innerHTML = data.list[2].dt_txt;
        cardTempEl0.innerHTML =
          'Temp: ' + Math.round(data.list[2].main.temp) + ' F';
        cardRealTempEl0.innerHTML =
          'Real Feel: ' + Math.round(data.list[2].main.feels_like) + ' F';
        cardHumidityEl0.innerHTML = data.list[2].main.humidity + '%';
        cardWeatherEl0.innerHTML = data.list[2].weather[0].description;

        // 5 Day Weather Card 1
        weatherCardEl1.innerHTML = data.list[10].dt_txt;
        cardTempEl1.innerHTML =
          'Temp: ' + Math.round(data.list[10].main.temp) + ' F';
        cardRealTempEl1.innerHTML =
          'Real Feel: ' + Math.round(data.list[10].main.feels_like) + ' F';
        cardHumidityEl1.innerHTML = data.list[10].main.humidity + '%';
        cardWeatherEl1.innerHTML = data.list[10].weather[0].description;

        // 5 Day Weather Card 2
        weatherCardEl2.innerHTML = data.list[18].dt_txt;
        cardTempEl2.innerHTML =
          'Temp: ' + Math.round(data.list[18].main.temp) + ' F';
        cardRealTempEl2.innerHTML =
          'Real Feel: ' + Math.round(data.list[18].main.feels_like) + ' F';
        cardHumidityEl2.innerHTML = data.list[18].main.humidity + '%';
        cardWeatherEl2.innerHTML = data.list[18].weather[0].description;

        // 5 Day Weather Card 3
        weatherCardEl3.innerHTML = data.list[26].dt_txt;
        cardTempEl3.innerHTML =
          'Temp: ' + Math.round(data.list[26].main.temp) + ' F';
        cardRealTempEl3.innerHTML =
          'Real Feel: ' + Math.round(data.list[26].main.feels_like) + ' F';
        cardHumidityEl3.innerHTML = data.list[26].main.humidity + '%';
        cardWeatherEl3.innerHTML = data.list[26].weather[0].description;

        // 5 Day Weather Card 4
        weatherCardEl4.innerHTML = data.list[34].dt_txt;
        cardTempEl4.innerHTML =
          'Temp: ' + Math.round(data.list[34].main.temp) + ' F';
        cardRealTempEl4.innerHTML =
          'Real Feel: ' + Math.round(data.list[34].main.feels_like) + ' F';
        cardHumidityEl4.innerHTML = data.list[34].main.humidity + '%';
        cardWeatherEl4.innerHTML = data.list[34].weather[0].description;

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
