// Variables
var citySearchForm = document.querySelector('#cityForm');
var citySearchInput = document.querySelector('#cityInput');
var citySearchDisplay = document.querySelector('#searchedCity');
var currentWeatherEl = document.querySelector('#currentWeatherContainer');
var fiveDayForecastTitle = document.querySelector('#forecastTitle');
var fiveDayForecastEl = document.querySelector('#forecastContainer');
var previousSearchBtns = document.querySelector('#previousSearchBtns');

var apiKey = `ba973368929878e06f2318c9fa6bd307`;

// Array to store user city inputs
var cities = [];

var formSubmit = (event) => {
  event.preventDefault();
  var city = citySearchInput.value.trim();

  if (city) {
    currentWeather(city);
    fiveDayForecast(city);

    cities.unshift({ city });
    citySearchInput.value = '';
  } else {
    alert('Please enter a city name');
  }

  savedCities();

  previousSearch(city);
};

var savedCities = () => {
  localStorage.setItem('cities', JSON.stringify(cities));
};

var currentWeather = (city) => {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl).then((response) => {
    response.json().then((data) => {
      displayCurrentWeather(data, city);
    });
  });
};

var displayCurrentWeather = (weather, searchedCity) => {
  currentWeatherEl.textContent = '';
  citySearchDisplay.textContent = searchedCity;
  citySearchDisplay.classList = 'text-capitalize';

  var currentDate = document.createElement('span');
  currentDate.textContent = ' (' + moment(weather.dt.value).format('L') + ') ';

  var weatherIcon = document.createElement('img');
  weatherIcon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  );

  var tempEl = document.createElement('span');
  tempEl.textContent =
    'Current Temp: ' + Math.round(weather.main.temp) + '\u00b0 F';
  tempEl.classList = 'list-group-item';

  var humidityEl = document.createElement('span');
  humidityEl.textContent = 'Humidity: ' + weather.main.humidity + '%';
  humidityEl.classList = 'list-group-item';

  var windSpeedEl = document.createElement('span');
  windSpeedEl.textContent = 'Wind Speed: ' + weather.wind.speed + ' KTs';
  windSpeedEl.classList = 'list-group-item';

  citySearchDisplay.append(
    currentDate,
    weatherIcon,
    tempEl,
    humidityEl,
    windSpeedEl
  );

  var lat = weather.coord.lat;
  var lon = weather.coord.lon;

  getUvIndex(lat, lon);
};

var getUvIndex = (lat, lon) => {
  var uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  fetch(uvUrl).then(function (response) {
    response.json().then(function (data) {
      displayUvIndex(data);
    });
  });
};

var displayUvIndex = (index) => {
  var currentUvIndex = index.current.uvi;

  var uvContainer = document.createElement('div');
  uvContainer.textContent = 'UV Index: ';
  uvContainer.classList = 'list-group-item';

  var uvIndexSpan = document.createElement('span');
  uvIndexSpan.textContent = currentUvIndex;

  if (currentUvIndex < 2) {
    uvIndexSpan.classList = 'low';
  } else if (currentUvIndex > 2 && currentUvIndex < 7) {
    uvIndexSpan.classList = 'moderate';
  } else {
    uvIndexSpan.classList = 'high';
  }
  uvContainer.appendChild(uvIndexSpan);
  citySearchDisplay.appendChild(uvContainer);
};

var fiveDayForecast = (city) => {
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;

  fetch(forecastUrl).then(function (response) {
    response.json().then(function (data) {
      displayFiveDayForecast(data);
    });
  });
};

var displayFiveDayForecast = (forecast) => {
  fiveDayForecastEl.textContent = '';
  fiveDayForecastTitle.textContent = '5-Day Forecast';

  var forecastData = forecast.list;

  for (var i = 5; i < forecastData.length; i = i + 8) {
    var dailyForecastData = forecastData[i];

    var forecastDataEl = document.createElement('div');
    forecastDataEl.classList = 'card m-2 p1-0 bg-primary text-white';

    var forecastDate = document.createElement('h4');
    forecastDate.textContent = moment.unix(dailyForecastData.dt).format('L');
    forecastDate.classList = 'card-header  border-style d-flex flex-nowrap';

    var weatherIcon = document.createElement('img');
    weatherIcon.setAttribute(
      'src',
      `https://openweathermap.org/img/wn/${dailyForecastData.weather[0].icon}@2x.png`
    );
    weatherIcon.classList = 'card-body';

    var temperature = document.createElement('div');
    temperature.textContent =
      'Temp: ' + Math.round(dailyForecastData.main.temp) + '\u00B0 F';
    temperature.classList = 'card-body';

    var windSpeed = document.createElement('div');
    windSpeed.textContent =
      'Wind Speed: ' + dailyForecastData.wind.speed + ' KTs';
    windSpeed.classList = 'card-body';

    var humidity = document.createElement('div');
    humidity.textContent = 'Humidity: ' + dailyForecastData.main.humidity + '%';
    humidity.classList = 'card-body';

    forecastDataEl.append(
      forecastDate,
      weatherIcon,
      temperature,
      windSpeed,
      humidity
    );

    fiveDayForecastEl.appendChild(forecastDataEl);
  }
};

var previousSearch = (previousSearch) => {
  var previousSearchEl = document.createElement('button');
  previousSearchEl.textContent = previousSearch;
  previousSearchEl.setAttribute('data-city', previousSearch);
  previousSearchEl.setAttribute('type', 'submit');
  previousSearchEl.classList = 'btn btn-secondary w-100 my-2 text-capitalize';

  previousSearchBtns.prepend(previousSearchEl);
};

var previousSearchHandler = (event) => {
  var city = event.target.getAttribute('data-city');

  if (city) {
    currentWeather(city);
    fiveDayForecast(city);
  }
};

citySearchForm.addEventListener('submit', formSubmit);

previousSearchBtns.addEventListener('click', previousSearchHandler);
