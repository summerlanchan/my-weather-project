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

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h6 = document.querySelector("h6");
  h6.innerHTML = `${searchInput.value} <i class="fa-solid fa-star-half-stroke"></i>`;
  let whatsYourCity = document.querySelector("#location-result");
  whatsYourCity.innerHTML = `${searchInput.value}`;
  let apiKey = "7b40952ca13f5d687e1b65fcac145eab";
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

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col"><h4 class="weather-forecast-date">${day}<br /><img src="http://openweathermap.org/img/wn/10d@2x.png" id="icon-forecast" width="42px"/></i>
    <p>35&#8451; <br/> 24&#8451;</p></div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey2 = "7b40952ca13f5d687e1b65fcac145eab";
  let apiResult = "http://api.openweathermap/org/data/2.5/weather";
  let apiUrl2 = `${apiResult}?lat=${latitude}&lon=${longitude}&appid=${apiKey2}&units=${units}`;
  axios.get(apiUrl2).then(showWeather);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7b40952ca13f5d687e1b65fcac145eab";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid={apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
displayForecast();
