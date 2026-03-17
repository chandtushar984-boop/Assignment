const API_KEY = "0133cc5316757ac730cc46ae342334e4"

const form = document.querySelector("#form")
const weatherDetail = document.querySelector(".info")
const searchHistory = document.querySelector(".historyBtn")
const consoleBox = document.querySelector(".console")

let cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || []

// console logger
function log(message) {
    const p = document.createElement("div")
    p.textContent = message
    consoleBox.appendChild(p)
    consoleBox.scrollTop = consoleBox.scrollHeight
}

// reusable function
async function getData(searchCity) {
    if (!searchCity) return

    consoleBox.innerHTML = ""
    log("Sync Start")

    try {
        log("Async Start fetching")

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}`)

        Promise.resolve().then(() => {
            log("Promise.then (Microtask)")
        })

        setTimeout(() => {
            log("setTimeout (Macrotask)")
        }, 0)

        const data = await res.json()

        if (data.cod === 200) {
            weatherDetail.innerHTML = `
                <p>City: ${data.name}</p>
                <p>Temp: ${(data.main.temp - 273).toFixed(1)}°C</p>
                <p>Weather: ${data.weather[0].main}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind: ${data.wind.speed} m/s</p>
            `

            log("Async Data Received")

            // store unique cities
            cityHistory.push(searchCity)
            cityHistory = [...new Set(cityHistory)]

            localStorage.setItem("cityHistory", JSON.stringify(cityHistory))
            displayHistory()
        } else {
            weatherDetail.innerHTML = `<p style="color:red;">City not found</p>`
            log("Error: City not found")
        }
    } catch (e) {
        log("Error: " + e.message)
    }
}

// form submit
form.addEventListener('submit', function (event) {
    event.preventDefault()
    const searchCity = city.value.trim()
    getData(searchCity)
})

// display history buttons
function displayHistory() {
    searchHistory.innerHTML = ""

    cityHistory.forEach((city) => {
        const btn = document.createElement("button")
        btn.innerText = city

        btn.addEventListener('click', function () {
            getData(city)
        })

        searchHistory.appendChild(btn)
    })
}

// load history
displayHistory()