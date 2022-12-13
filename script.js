var latitude;
var longitude;
//TODO: Add event listener to location search form
//TODO:Use location search input to get longitude and latitude for that location
//TODO: fetch request to get longitude and lattitude from location name
//TODO:Use coordinates to get weather data for that location
//TODO: fetch request to get weather data using coordinates


var getCoordinatesURL = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=e7ab2c780e57f015e576cf3eb59ae5a7';
// var getCoordinatesURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=e7ab2c780e57f015e576cf3eb59ae5a7';

var getCoordinates = function () {
    fetch(getCoordinatesURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            latitude = data[0].lat;
            longitude = data[0].lon;
            console.log(latitude);
            console.log(longitude);
        })
};

var getForecast = function () {
    var getForecastURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=e7ab2c780e57f015e576cf3eb59ae5a7';
    fetch(getForecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
};

getCoordinates();
getForecast();
