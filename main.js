// function toggleMenu() {
//   document.getElementById("unitsMenu").classList.toggle("show");
// }

// // document.querySelector(".units-menu").classList.add("");
// const apiKey = "5785b236b9e71e01b01b3f76476903be";

// const searchBox = document.querySelector(".searchBox input");
// const searchBtn = document.querySelector(".searchBox button");

// const locationEl = document.querySelector(".location");
// const tempEl = document.querySelector(".currentTemp");
// const descEl = document.querySelector(".desc");

// /* ===============================
//    Weather by city name
// ================================ */
// async function getWeatherByCity(city) {
//   if (!city) return;

//   const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
//   const res = await fetch(url);
//   const data = await res.json();

//   if (data.cod !== 200) {
//     alert("City not found");
//     return;
//   }

//   updateUI(data);
// }

// /* ===============================
//    Weather by GPS
// ================================ */
// async function getWeatherByCoords(lat, lon) {
//   const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
//   const res = await fetch(url);
//   const data = await res.json();

//   updateUI(data);
// }

// /* ===============================
//    Update main card
// ================================ */
// function updateUI(data) {
//   locationEl.innerHTML = `${data.name}, ${data.sys.country}`;
//   tempEl.innerHTML = Math.round(data.main.temp) + "°";
//   descEl.innerHTML = data.weather[0].description;
// }

// /* ===============================
//    Load GPS on page start
// ================================ */
// function loadCurrentLocation() {
//   if (!navigator.geolocation) {
//     locationEl.innerHTML = "Geolocation not supported";
//     return;
//   }

//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const lat = position.coords.latitude;
//       const lon = position.coords.longitude;
//       getWeatherByCoords(lat, lon);
//     },
//     () => {
//       locationEl.innerHTML = "Location access denied";
//     }
//   );
// }

// /* ===============================
//    Events
// ================================ */
// searchBtn.addEventListener("click", () => {
//   getWeatherByCity(searchBox.value);
// });

// searchBox.addEventListener("keyup", (e) => {
//   if (e.key === "Enter") {
//     getWeatherByCity(searchBox.value);
//   }
// });

// /* ===============================
//    Start
// ================================ */
// loadCurrentLocation();
 


// ===== Units Menu =====
function toggleMenu() {
  document.getElementById("unitsMenu").classList.toggle("show");
}

// ===== Elements =====
const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");

const feelsLikeEl = document.getElementById("item1 h3");
const humidityEl  = document.getElementById("item2 h3");
const windEl      = document.getElementById("item3 h3");
const precipEl    = document.getElementById("item4 h3");

const searchInput = document.getElementById("searchBox input");
const searchBtn   = document.getElementById("searchButtom");

// ===== Fetch Weather =====
function getWeather(city) {
  fetch(`http://localhost:3000/weather?city=${city}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        alert("City not found");
        return;
      }

      const w = data[0];
  

      
      cityEl.textContent = `${w.city}, ${w.country}`;
      tempEl.textContent = w.temperature + "°";

      feelsLikeEl.textContent = w.feelsLike;
      humidityEl.textContent  = w.humidity + "%";
      windEl.textContent      = w.wind + " km/h";
      precipEl.textContent   = w.precipitation + " in";
    })
    .catch(err => console.error(err));
}

// ===== Default Load =====
getWeather("Herat");

// ===== Search Button =====
searchBtn.addEventListener("click", () => {
  if (searchInput.value.trim() !== "") {
    getWeather(searchInput.value.trim());
  }
});