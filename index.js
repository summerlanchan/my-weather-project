let now = new Date();
let currentTime = document.querySelector(".timeRightNow");
let hours = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
currentTime.innerHTML = `Last updated: ${day}, ${hours}: ${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <br />
      <img src="https://openweatherapp.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
         id="icons"
          width="42"
          />
    <span class="weather-forecast-max">${Math.round(
      forecastDay.temp.max
    )}&#8451; </span> 
    <br/> 
    <span class="weather-forecast-min">${Math.round(
      forecastDay.temp.min
    )}&#8451;</span></div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h6 = document.querySelector("h6");
  h6.innerHTML = `${searchInput.value} <i class="fa-solid fa-star-half-stroke"></i>`;
  let whatsYourCity = document.querySelector("#location-result");
  whatsYourCity.innerHTML = `${searchInput.value}`;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showWeather(response) {
  celsiusTemp = response.data.main.temp;
  let weatherNow = Math.round(celsiusTemp);
  let currentWeather = document.querySelector("#temperature");
  currentWeather.innerHTML = `${weatherNow}`;
  weatherDescr = response.data.weather[0].main;
  let weatherStateNow = document.querySelector("#weatherDescription");
  weatherStateNow.innerHTML = `${weatherDescr}`;
  let humidityNow = response.data.main.humidity;
  let currentHum = document.querySelector("#hum");
  currentHum.innerHTML = `Humidity:${humidityNow}%`;
  let windyNow = Math.round(response.data.wind.speed);
  let currentWindy = document.querySelector("#wind");
  currentWindy.innerHTML = `Wind: ${windyNow} m/hr`;
  let currentIcon = document.querySelector("#icon");

  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey2 = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiResult = "http://api.openweathermap/org/data/2.5/weather";
  let apiUrl2 = `${apiResult}?lat=${latitude}&lon=${longitude}&appid=${apiKey2}&units=${units}`;
  axios.get(apiUrl2).then(showWeather);
}
