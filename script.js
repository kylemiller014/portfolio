// ============================
// MENU NAV-BAR
// ============================

function toggleMenu() {
    const menu =document.querySelector(".menu-links"); 
    const icon =document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// ============================
// CONFIG
// ============================

const apiKey = "19bab67245074f7a839171248253012";
const defaultCity = "Pensacola";

// DOM refs
const input = document.getElementById("weather_input");
const btn = document.getElementById("weather_btn");

const locationEl = document.getElementById("weather_location");
const tempEl = document.getElementById("weather_temp");
const conditionEl = document.getElementById("weather_condition");
const iconEl = document.getElementById("weather_icon");
const updatedEl = document.getElementById("weather_updated");

// For timestamp
function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}

// ============================
// FETCH WEATHER
// ============================

async function loadWeather(city = defaultCity) {

  locationEl.textContent = "Loading...";
  tempEl.textContent = "";
  conditionEl.textContent = "";
  iconEl.src = "";
  updatedEl.textContent = "";

  const url =
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("Bad response");

    const data = await res.json();

    locationEl.textContent =
      `${data.location.name}, ${data.location.region}`;

    tempEl.textContent =
      `${data.current.temp_f}°F`;

    conditionEl.textContent =
      data.current.condition.text;

    iconEl.src =
      "https:" + data.current.condition.icon;

    // add timestamp
    updatedEl.textContent =
      `Last updated: ${formatTime()}`;

  } catch (err) {
    locationEl.textContent = "Location not found";
    console.error(err);
  }
}


// ============================
// EVENTS
// ============================

// button click
btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) loadWeather(city);
});

// press Enter to search
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") btn.click();
});


// initial load
loadWeather();