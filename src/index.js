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

function showWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;

  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "a43101e0424a3e682b9d1a16a6e9590e";
  let units = "metric";
  let apiUrl = `${endPoint}q=${cityInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateTemp);
}

let searchButton = document.querySelector("#search-city-form");
searchButton.addEventListener("submit", showWeather);

function updateTemp(response) {
  document.querySelector("h1#city-name").innerHTML = response.data.name;
  let temperatureNowData = Math.round(response.data.main.temp);
  let temperatureHighestData = Math.round(response.data.main.temp_max);
  let temperatureLowestData = Math.round(response.data.main.temp_min);
  let weatherDescriptionData = response.data.weather[0].description;
  let currentTemp = document.querySelector("#current-temperature");
  let currentTempHighest = document.querySelector("#current-highest-temp");
  let currentTempLowest = document.querySelector("#current-lowest-temp");
  let weatherDescription = document.querySelector("#weather-description");
  let weathericonData = document.querySelector("#weather-icon");
  // let localTime = document.querySelector("#current-time");
  let currentDay = document.querySelector("h4#current-day");
  currentTemp.innerHTML = `${temperatureNowData}`;
  currentTempHighest.innerHTML = `${temperatureHighestData}`;
  currentTempLowest.innerHTML = `${temperatureLowestData}`;
  weatherDescription.innerHTML = `${weatherDescriptionData}`;
  //localTime.innerHTML = formatTime(response.data.dt * 1000);
  currentDay.innerHTML = formatDay(response.data.dt);
  weathericonData.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(pullLocation);
}

function pullLocation(location) {
  let apiKey = "a43101e0424a3e682b9d1a16a6e9590e";
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showLocalWeather);
}

function showLocalWeather(response) {
  let temperatureNowData = Math.round(response.data.main.temp);
  let temperatureHighestData = Math.round(response.data.main.temp_max);
  let temperatureLowestData = Math.round(response.data.main.temp_min);
  let weatherDescriptionData = response.data.weather[0].description;
  let locationNameData = response.data.name;
  let currentTemp = document.querySelector("#current-temperature");
  let currentTempHighest = document.querySelector("#current-highest-temp");
  let currentTempLowest = document.querySelector("#current-lowest-temp");
  let weatherDescription = document.querySelector("#weather-description");
  let updateLocation = document.querySelector("#city-name");
  currentTemp.innerHTML = `${temperatureNowData}`;
  currentTempHighest.innerHTML = `${temperatureHighestData}`;
  currentTempLowest.innerHTML = `${temperatureLowestData}`;
  weatherDescription.innerHTML = `${weatherDescriptionData}`;
  updateLocation.innerHTML = `${locationNameData}`;
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);
