function getDayName(dayNumber){
    switch(dayNumber){
        case 1: return "Monday";
        case 2: return "Thuesday";
        case 3: return "Wensday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        case 7: return "Sunday";
    }
}
function getMonthName(monthNumber){
    switch(monthNumber){
        case 1: return "January";
        case 2: return "Webruary";
        case 3: return "March";
        case 4: return "April";
        case 5: return "May";
        case 6: return "June";
        case 7: return "July";
        case 8: return "August";
        case 9: return "September";
        case 10: return "October";
        case 11: return "November";
        case 12: return "December";
        default: return "";
    }
}
function getWeatherIcon(type){
    console.log(type);
    switch(type){
        case "Clouds": return "cloud.svg";
        case "Drizzle": return "rain.svg";
        default: return "";
    }
}

function Weather(weatherVM) {

    var degrees = weatherVM.querySelector('.weather-value');
    var degreesIcon = weatherVM.querySelector('.weather-icon--deg');

    var location = weatherVM.querySelector('.weather-location');

    var infoVM = weatherVM.querySelector('.weather-info');
    var windVM = weatherVM.querySelector('.weather-wind');
    var humidityVM = weatherVM.querySelector('.weather-humidity');
    var descriptionVM = weatherVM.querySelector('.weather-description');

    var iconVM = weatherVM.querySelector('.weather-icon--type');

    var dateVM = weatherVM.querySelector('.date');
    var date = new Date();
    dateVM.innerText = getMonthName(date.getMonth() + 1) + " " + date.getDate()  +  ", " + getDayName(date.getDay());

    navigator.geolocation.getCurrentPosition(function (position) {
        
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        console.log(position);

        var xhrURL = "";
        xhrURL = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lng + "&appid=6712e6cc05d91d982fbb76726cb550eb";

        var xhr = new XMLHttpRequest();
        xhr.open('POST', xhrURL);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(xhr.responseText);

                console.log(response);

                degrees.innerText = Math.round(parseFloat(response.main.temp) - 273, 15);
                degrees.appendChild(degreesIcon);

                location.innerText = response.name + ", " + response.sys.country;

                var iconURL = getWeatherIcon(response.weather[0].main);
                if (iconURL !== ""){
                    iconVM.setAttribute('src', './weather/icons/' + iconURL);
                } else {
                    weatherVM.querySelector('.weather-date').removeChild(iconVM);
                }

                descriptionVM.innerText = response.weather[0].description;
                humidityVM.innerText = "Humidity: " + response.main.humidity;
                windVM.innerText = "Wind speed: " + response.wind.speed;
                degrees.appendChild(infoVM);
            }
        }
    });



}

function initWeather() {

    new Weather(
        document.querySelector('.weather')
    );
}
initWeather();