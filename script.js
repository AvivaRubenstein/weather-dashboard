var latitude;
var longitude;
var todayBox = $('#todays-forecast');
var cityNameTodayBox = $("#cityName");
var searchBox = $("search-box");
var day1box = $(".5dayBox")[0];
var cityName; 

//TODO: Add event listener to location search form
//TODO:Use location search input to get longitude and latitude for that location
//TODO: fetch request to get longitude and lattitude from location name
//TODO:Use coordinates to get weather data for that location
//TODO: fetch request to get weather data using coordinates
//TODO: figure out how to get units in Fahrenheit, MPH etc

//this event listener looks for when the search button is pressed, and retrieves that search term that was input by the user
$('.btn').on("click", function (event) { 
    event.preventDefault();
    cityName = $("#searchInput").val();
//Once we have the city name, we can get the coordinates from the openweathermap API
    getCoordinates();
    getForecast();
    setSearchHistory();
});

//the getCoordinates function sends a fetch request to receive the longitude and latitude coordinates for the user's searched city name
var getCoordinates = function () {
    var getCoordinatesURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=e7ab2c780e57f015e576cf3eb59ae5a7';
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

//the getForecast function sends a fetch request to receive weather data for the user's searched city, using the longitude and latitude we retrieved
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





var setSearchHistory = function () {
 //here we set existing storage equal to anything that is contained in local storage under the key "searchStorage"
 var existingStorage = JSON.parse(localStorage.getItem("searchStorage"));
 if (existingStorage === null){
 localStorage.setItem("searchStorage", JSON.stringify([cityName]));
 } else {existingStorage.push(cityName);
 localStorage.setItem("searchStorage", JSON.stringify(existingStorage)); }
 }

