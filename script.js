function fetchWeather() {
    let searchInput = document.getElementById("search").ariaValueMax;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
    const apiKey = "7e93c5dc2b7e9ca943e427e826c2ee31";

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
        const responce = await fetch(geocodeURL);
        const data = await Response.json();
        if(!Response.ok) {
            console.log("Bad response! ", Response.status);
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
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(weatherURL);
        if(!response.ok){
            console.log("Bad response! ", response.status);
            return;
        }
        const data = await response.json();
    }
}