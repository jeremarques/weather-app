const themeSwitcher = document.querySelector('.theme-switcher');
const backgroundSvg = document.querySelector('.bg');
const backgroundSvgSearch = document.querySelector('.bg-search-box');
const dateOfCity = document.querySelector('#date-country');

const city = document.querySelector('#city');
const country = document.querySelector('#country');
const temperature = document.querySelector('#temperature');
const descriptionOfTemperature = document.querySelector('#description');
const ilustrationOfTemperature = document.querySelector('#temp-ilusta');
const ilustrationDetailsWeather = document.querySelector('#ilustration-weather');
const sensation = document.querySelector('#sensation-percent');
const wind = document.querySelector('#wind-velocity');
const humidity = document.querySelector('#humidity-percent');
const presure = document.querySelector('#presure-percent');

const searchInput = document.querySelector('#search-city');
const searchBox = document.querySelector('.search-box');
const searchBarIcon = document.querySelector('.fa-magnifying-glass');
const btnBack = document.querySelector('.back');
const searchInInput = document.querySelector('.search-for-input');
const clearInput = document.querySelector('.clear-input');

searchBarIcon.addEventListener('click', () => searchBox.classList.toggle('search-box-show'));
btnBack.addEventListener('click', () => searchBox.classList.remove('search-box-show'));
clearInput.addEventListener('click', () => searchInput.value = "");
searchInInput.addEventListener('click', () => {
  searchResults(searchInput.value);
  searchBox.classList.remove('search-box-show');
  searchInput.value = "";
});

themeSwitcher.addEventListener('click', toggleThemePage);
function toggleThemePage() {
  document.body.classList.toggle('light-theme');
  themeSwitcher.classList.toggle('light');
  backgroundSvg.classList.toggle('bg-light');
  backgroundSvgSearch.classList.toggle('bg-search-box-light');
};

//========== API CONNECTION ==============//

const api = {
  key: "f3fb7888586e257660ae9d68ed9afafc",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric"
};

searchInput.addEventListener('keypress', (event) => {
  key = event.keyCode;
  if (key == 13) {
    searchResults(searchInput.value);
    searchBox.classList.remove('search-box-show');
    searchInput.value = "";
  };
});

window.addEventListener('load', () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    console.error('Geolocalização não suportada neste navegador.');
  };

  function setPosition(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    coordsResult(latitude, longitude);
  };
  function showError() {
    console.log(error.message);
  };
});

function coordsResult(latitude, longitude) {
  fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&lang=${api.lang}&units=${api.units}&appid=${api.key}`)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      };
      return response.json();
    })
    .catch(error => console.error(error))
    .then(response => showResults(response));
}

function searchResults(city) {
  fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&appid=${api.key}`)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      };
      return response.json();
    })
    .catch(error => console.error(error))
    .then(response => showResults(response));
};

function showResults(weather) {
  console.log(weather)
  city.innerHTML = `${weather.name}, <span id="country">${weather.sys.country}</span>`;
  let description = weather.weather[0].description;
  descriptionOfTemperature.innerHTML = `${description[0].toUpperCase() + description.substr(1)}`;
  temperature.innerHTML = `${Math.round(weather.main.temp)}ºC`;
  ilustrationOfTemperature.src = `/assets/3d weather icons webp/${weather.weather[0].icon}.webp`;

  sensation.innerHTML = `${Math.round(weather.main.feels_like)}ºC`;
  humidity.innerHTML = `${weather.main.humidity}%`;
  wind.innerHTML = `${Math.round(weather.wind.speed)} km/h`;
  presure.innerHTML = `${weather.main.pressure}`;
  ilustrationDetailsWeather.src = `/assets/3d weather icons webp/${weather.weather[0].icon}.webp`

};

function setDate() {
  const date = new Date();
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  dateOfCity.innerHTML = `${date.getUTCDate()}, ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
setDate();