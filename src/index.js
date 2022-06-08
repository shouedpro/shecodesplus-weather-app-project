function formatTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day}`;
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(pullLocation);
}

function pullLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "a43101e0424a3e682b9d1a16a6e9590e";
  let units = "metric";
  let apiUrl = `${endPoint}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

function showWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "a43101e0424a3e682b9d1a16a6e9590e";
  let units = "metric";
  let apiUrl = `${endPoint}q=${cityInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateWeather);
  //.catch(alert("Sorry, that city does not exist"));
}

function getForecast(coord) {
  let apiKey = "a43101e0424a3e682b9d1a16a6e9590e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function updateWeather(response) {
  let currentTempData = Math.round(response.data.main.temp);
  let temperatureHighestData = Math.round(response.data.main.temp_max);
  let temperatureLowestData = Math.round(response.data.main.temp_min);
  let weatherDescriptionData = response.data.weather[0].description;
  let humidityData = Math.round(response.data.main.humidity);
  let windSpeedData = Math.round(response.data.wind.speed);

  document.querySelector("h1#city-name").innerHTML = response.data.name;
  document.querySelector(
    "#current-temperature"
  ).innerHTML = `${currentTempData}`;
  document.querySelector(
    "#current-highest-temp"
  ).innerHTML = `${temperatureHighestData}`;
  document.querySelector(
    "#current-lowest-temp"
  ).innerHTML = `${temperatureLowestData}`;
  document.querySelector(
    "#weather-description"
  ).innerHTML = `${weatherDescriptionData}`;
  document.querySelector("#current-time").innerHTML = formatTime(
    response.data.dt * 1000
  );
  document.querySelector("h4#current-day").innerHTML = formatDay(
    response.data.dt * 1000
  );
  document.querySelector("#humidity").innerHTML = `${humidityData}%`;
  document.querySelector("#wind-speed").innerHTML = `${windSpeedData}km/h `;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function formatForecastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastData = document.querySelector("#weather-forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-1 mx-auto">
        <h6 class="card-title weather-forecast-date">${formatForecastDays(
          forecastDay.dt
        )}</h6>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="week-weather-icon" class="week-weather-icon" id="weather-icon">
        <div class="weekHighLow">
          H: <span class="week-highest-temp"><small>${Math.round(
            forecastDay.temp.max
          )}</small></span>°
          L: <span class="week-lowest-temp"><small>${Math.round(
            forecastDay.temp.min
          )}</small></span>°
        </div>
 </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastData.innerHTML = forecastHTML;
}

let searchButton = document.querySelector("#search-city-form");
searchButton.addEventListener("submit", showWeather);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);
