async function fetchWeather() {
    let searchInput = document.getElementById("search").value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
    const apiKey = "apikey";

    if (searchInput == "") {
        weatherDataSection.innerHTML = `
        <div>
            <h2>Empty input</h2>
            <p>Please try again with a valid <u>city name</u>.</p>
        </div>
        `;
        return;
    }

    async function getLonAndLat() {
        const countryCode = 1;
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;
        const response = await fetch(geocodeURL);
        const data = await response.json();
        if(!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }

        if (data.length == 0){
            console.log("Somenthing went wrong here.");
            weatherDataSection.innerHTML = `
            <div>
                <h2>Invalid Input: "${searchInput}"</h2>
                <p>Please try again with a valid <u>city name</u>.</p>
            </div> `;
            return;
        }else{
            return data[0];
        }
    }

    async function getWeatherData(lon,lat) {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=es`;
        const response = await fetch(weatherURL);
        if(!response.ok){
            console.log("Bad response! ", response.status);
            return;
        }
        const data = await response.json();
        weatherDataSection.style.display = "flex";

        const displayName = searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
        weatherDataSection.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
        <div>
            <h2>${displayName}</h2>
            <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}ºC</p>
            <p><strong>Feels like:</strong> ${Math.round(data.main.feels_like - 273.15)}ºC</p>
            <p><strong>Description:</strong> ${data.weather[0].description}</p>
        </div>
        `;
        console.log(data);
    }

    document.getElementById("search").value="";
    const geocodeData = await getLonAndLat();
    getWeatherData(geocodeData.lon, geocodeData.lat);
    
}