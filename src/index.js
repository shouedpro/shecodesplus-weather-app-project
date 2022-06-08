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

function updateWeather(response) {
  let temperatureNowData = Math.round(response.data.main.temp);
  let temperatureHighestData = Math.round(response.data.main.temp_max);
  let temperatureLowestData = Math.round(response.data.main.temp_min);
  let weatherDescriptionData = response.data.weather[0].description;
  let humidityData = Math.round(response.data.main.humidity);
  let windSpeedData = Math.round(response.data.wind.speed);

  document.querySelector("h1#city-name").innerHTML = response.data.name;
  document.querySelector(
    "#current-temperature"
  ).innerHTML = `${temperatureNowData}`;
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
}

let searchButton = document.querySelector("#search-city-form");
searchButton.addEventListener("submit", showWeather);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);
