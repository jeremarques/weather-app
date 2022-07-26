const themeSwitcher = document.querySelector('.theme-switcher');
const backgroundSvg = document.querySelector('.bg');

const city = document.querySelector('#city');
const country = document.querySelector('#country');
const dateOfCity = document.querySelector('#date-country');
const temperature = document.querySelector('#temperature');
const descriptionOfTemperature = document.querySelector('#description');
const ilustrationOfTemperature = document.querySelector('#temp-ilusta');
const searchCity = document.querySelector('#search-city');
const searchBar = document.querySelector('.fa-magnifying-glass')

searchBar.addEventListener('click', () => searchCity.classList.toggle('search-bar-show'))

themeSwitcher.addEventListener('click', toggleThemePage);
function toggleThemePage() {
  document.body.classList.toggle('light-theme');
  themeSwitcher.classList.toggle('light');
  backgroundSvg.classList.toggle('bg-light');
};

//========================//

const api = {
  key: "f3fb7888586e257660ae9d68ed9afafc",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric"
};

searchCity.addEventListener('keypress', (event) => {
  key = event.keyCode;
  if (key == 13) searchResults(searchCity.value);
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
  descriptionOfTemperature.innerHTML = `${weather.weather[0].description}`;
  temperature.innerHTML = `${Math.round(weather.main.temp)}ºC`;
  ilustrationOfTemperature.src = `/assets/3d weather icons/${weather.weather[0].icon}.png`
};
function setDate() {
  const date = new Date();
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  dateOfCity.innerHTML = `${date.getUTCDate()}, ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
setDate();