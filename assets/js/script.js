var searchBtnEl = document.querySelector('.search-btn');
var searchFieldEl = document.querySelector('#searchField');

var getWeatherData = function (data) {
  var apiUrl =
    'https://api.openweathermap.org/data/2.5/weather?q=austin&appid=ba973368929878e06f2318c9fa6bd307';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {});
    }
  });
};

searchBtnEl.addEventListener('click', getWeatherData);
