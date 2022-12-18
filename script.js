var latitude;
var longitude;
var todayBox = $('#todays-forecast');
var cityNameTodayBox = $("#cityName");
var searchBox = $("search-box");
var dayBoxes = document.querySelectorAll(".dayBoxes");
var cityName;
var existingStorage;


//TODO:Use coordinates to get weather data for that location
//TODO: fetch request to get weather data using coordinates
//TODAY: city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
//5-day forecast: date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//TODO: get searchHistory to display on HTML page
//TODO: get weather data  for 5 day forecast to display in .5dayBox[0]-[4]
//TODO: figure out how to make past search history clickable to search for that term again


//this event listener looks for when the search button is pressed, and retrieves that search term that was input by the user
$('.btn').on("click", function (event) {
    event.preventDefault();
    cityName = $("#searchInput").val();
    //Once we have the city name, we can get the coordinates from the openweathermap API
    getCoordinates();
    //with every search, we update the search history in local storage and update the display on our page
    setSearchHistory();
});

//the getCoordinates function sends a fetch request to receive the longitude and latitude coordinates for the user's searched city name
var getCoordinates = function () {
    var getCoordinatesURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=e7ab2c780e57f015e576cf3eb59ae5a7';
    fetch(getCoordinatesURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            latitude = data[0].lat;
            longitude = data[0].lon;
            console.log(latitude);
            console.log(longitude);
            getForecast();
        })
};

//the getForecast function sends a fetch request to receive weather data for the user's searched city, using the longitude and latitude we retrieved
var getForecast = function () {
    var getForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=e7ab2c780e57f015e576cf3eb59ae5a7&units=imperial';
    fetch(getForecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.list);
            setTodayBox(data.list[0]);
            set5dayBoxes(data.list);
        })
};





var setSearchHistory = function () {
    //if nothing is in existing storage, we put the current cityName into local storage, and if there is already stuff in local storage
    //we push the current cityName into the existing storage array, and then set the local storage to be the entire existingStorage
    if (existingStorage === null) {
        localStorage.setItem("searchStorage", JSON.stringify([cityName]));
    } else {
        existingStorage.push(cityName);
        localStorage.setItem("searchStorage", JSON.stringify(existingStorage));
    }

}
var loadPrevSearchHist = function () {
    existingStorage = JSON.parse(localStorage.getItem("searchStorage"));
    //this for loop will loop through the search history and make each one appear on the page as a button
    if (existingStorage !== null) {
        for (i = 0; i < existingStorage.length; i++) {
            var histbtn = document.createElement("button");
            histbtn.type = "submit";
            histbtn.name = "search-history-btn";
            histbtn.innerHTML = existingStorage[i];
            histbtn.setAttribute("class", "history-btns");
            histbtn.setAttribute("id", `hist-btn-${[i]}`);
            $("#search-history-box").append(histbtn);
        }
    }
    //this event listener looks for when one of the search history buttons was clicked, and identifies the text of that button
    $(".history-btns").on("click", function (event) {
        event.preventDefault();
        //we set the current cityName equal to whatever city name was clicked on in our search history
        cityName = this.innerHTML;
        //then we can do the process of getting coordinates for that city name, and getting and displaying the forecast for that location 
        getCoordinates();
    });
}

//this function sets the box for today's forecast to have text content based on what is returned from our getForecast() function
//we are passing in data from that function as a parameter here --- in this case the first index of the data is passed in, so that we are accessing only information about the first day in the array (i.e. now)
var setTodayBox = function (data) {
    document.getElementById("today-date").textContent = data.dt_txt.split(" ")[0];
    document.getElementById("city-name").textContent = cityName;
    document.getElementById("today-temp").textContent = "Temperature: " + data.main.temp + " degrees";
    document.getElementById("today-humidity").textContent = "Humidity: " + data.main.humidity + "%";
    document.getElementById("today-wind-speed").textContent = "Wind Speed: " + data.wind.speed + " MPH";
    document.getElementById("today-image").setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
}

var arrayInList = 6;
var set5dayBoxes = function (data) {
    for (i = 0; i < dayBoxes.length; i++) {
        document.getElementById(`today-date${[i]}`).textContent = data[arrayInList].dt_txt.split(" ")[0];
        document.getElementById(`today-temp${[i]}`).textContent = "Temperature: " + data[arrayInList].main.temp + " degrees";
        document.getElementById(`today-humidity${[i]}`).textContent = "Humidity: " + data[arrayInList].main.humidity + "%";
        document.getElementById(`today-wind-speed${[i]}`).textContent = "Wind Speed: " + data[arrayInList].wind.speed + " MPH";
        document.getElementById(`today-image${[i]}`).setAttribute("src", "http://openweathermap.org/img/w/" + data[arrayInList].weather[0].icon + ".png");

        arrayInList += 8;
    } 
    arrayInList = 6;
}

//load previous search history onto page
loadPrevSearchHist();