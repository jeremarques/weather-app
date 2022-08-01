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
const oCity1 = document.querySelector('.city-1');
const oCity2 = document.querySelector('.city-2');

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
oCity1.addEventListener('click', () => {
  searchResults("Brasília");
  searchBox.classList.remove('search-box-show');
});
oCity2.addEventListener('click', () => {
  searchResults("Porto Alegre");
  searchBox.classList.remove('search-box-show');
});

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
const twentySeconds = 20000;
setInterval(() => {
  searchBrasilia("Brasília");
  searchPortoAlegre("Porto Alegre");
}, twentySeconds);
async function coordsResult(latitude, longitude) {
  const response = await fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&lang=${api.lang}&units=${api.units}&appid=${api.key}`);
  
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  } else console.log(response);

  const data = await response.json();
  showResults(data);
};

async function searchBrasilia() {
  const response = await fetch(`${api.base}weather?q=Brasília&lang=${api.lang}&units=${api.units}&appid=${api.key}`);
  
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  };

  const data = await response.json();
  brasiliaResults(data);
};

async function searchPortoAlegre(city) {
  const response = await fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&appid=${api.key}`);
  
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  };

  const data = await response.json();
  portoAlegreResults(data);
};

async function searchResults(city) {
  const response = await fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&appid=${api.key}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  } else console.log(response);
  
  const data = await response.json();
  showResults(data);
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
  ilustrationDetailsWeather.src = `/assets/3d weather icons webp/${weather.weather[0].icon}.webp`;
};

const cityName1 = document.querySelector('#title-o-city-1');
const ilustrationCity1 = document.querySelector('#img-o-city-1');
const temperatureCity1 = document.querySelector('#informations-o-city-1');

function brasiliaResults(weather) {
  cityName1.innerHTML = `${weather.name}`;
  ilustrationCity1.innerHTML = `/assets/3d weather icons webp/${weather.weather[0].icon}.webp`;
  temperatureCity1.innerHTML = `${Math.round(weather.main.temp)}ºC`;
};

const cityName2 = document.querySelector('#title-o-city-2');
const ilustrationCity2 = document.querySelector('#img-o-city-2');
const temperatureCity2 = document.querySelector('#informations-o-city-2');

function portoAlegreResults(weather) {
  cityName2.innerHTML = `${weather.name}`;
  ilustrationCity2.innerHTML = `/assets/3d weather icons webp/${weather.weather[0].icon}.webp`;
  temperatureCity2.innerHTML = `${Math.round(weather.main.temp)}ºC`;
};

function setDate() {
  const date = new Date();
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  dateOfCity.innerHTML = `${date.getUTCDate()}, ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
setDate();