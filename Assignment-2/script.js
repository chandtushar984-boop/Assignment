
const API_KEY = "0133cc5316757ac730cc46ae342334e4";

const form = document.querySelector("#form");
const cityInput = document.querySelector("#city");
const weatherDetail = document.querySelector(".info");
const searchHistory = document.querySelector(".historyBtn");
const consoleBox = document.querySelector(".console");

let cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];


function log(msg) {
    const p = document.createElement("div");
    p.textContent = msg;
    consoleBox.appendChild(p);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}


async function getWeather(city) {
    log("Sync Start");

    try {
        log("Async: Start Fetching");

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );

        log("Promise resolved (Microtask)");

        const data = await res.json();

        if (data.cod === 200) {
            log("Async Data Received");

            const tempC = (data.main.temp - 273.15).toFixed(1);

            weatherDetail.innerHTML = `
                <h3>Weather Info</h3>
                <p><b>City:</b> ${data.name}</p>
                <p><b>Temp:</b> ${tempC} °C</p>
                <p><b>Weather:</b> ${data.weather[0].main}</p>
                <p><b>Humidity:</b> ${data.main.humidity}%</p>
                <p><b>Wind:</b> ${data.wind.speed} m/s</p>
            `;

            addToHistory(city);

        } else {
            throw new Error("City not found");
        }

    } catch (err) {
        log("Error: " + err.message);

        weatherDetail.innerHTML = `
            <h3>Weather Info</h3>
            <p style="color:red;">${err.message}</p>
        `;
    }
}


function addToHistory(city) {
    city = city.trim();

    if (!cityHistory.includes(city)) {
        cityHistory.push(city);
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    }

    displayHistory();
}

function displayHistory() {
    searchHistory.innerHTML = "";

    cityHistory.forEach((city) => {
        const btn = document.createElement("button");
        btn.innerText = city;

        btn.addEventListener("click", () => {
            cityInput.value = city;
            form.dispatchEvent(new Event("submit"));
        });

        searchHistory.appendChild(btn);
    });
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();
    if (!city) return;

    consoleBox.innerHTML = ""; 
    getWeather(city);
});


displayHistory();
