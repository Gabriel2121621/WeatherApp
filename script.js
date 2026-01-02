async function fetchWeather() {
    let searchInput = document.getElementById("search").value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
    const apiKey = "apiKey";

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

    //Function to get the wheatherData and render
    async function getWeatherData(lon,lat) {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=en`;
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

    //Function to get the forecast
    async function getForecast(lon,lat) {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=en`;
        const response = await fetch(forecastUrl);
        
        if(!response.ok){
            console.log("Bad response! ", response.status);
            return;
        }
        return await response.json();
    }

    function pickDailyFrom3hList(list) {
        const byDay = {};
        for (const item of list) {
            const day = item.dt_txt.slice(0,10);
            (byDay[day] ||= []).push(item);
        }

        const daily = [];
        for (const day of Object.keys(byDay)) {
            const items = byDay[day];

            let best = items[0];
            let bestDiff = Infinity;

            for (const it of items) {
                const hour = Number(it.dt_txt.slice(11,13));
                const diff = Math.abs(hour - 12);
                if (diff < bestDiff) {
                    bestDiff = diff;
                    best = it;
                }
            }
            daily.push({day, ...best});
        }
        daily.sort((a,b) => a.day.localeCompare(b.day));
        return daily.slice(1,6);
    }

    //Function to render the forecast
    function renderForecast(daily){
        const el = document.getElementById("forecast");
        if (!el) return;
        el.style.display = "block";

        el.innerHTML = `
        <h3>Five days forecast</h3>
        <div class="forecast-grid">
            ${daily.map(data => `
                <div style="border:1px solid #ddd; border-radius:10px; padding:10px; width:150px;">
                <strong>${data.day}</strong><br/>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="" />
                <div>${Math.round(data.main.temp - 273.15)}ºC</div>
                <small>${data.weather[0].description}</small>
                </div>
            `).join("")}
        </div>
        `;
    }

    document.getElementById("search").value="";
    const geocodeData = await getLonAndLat();
    if (!geocodeData) return;

    const forecastData = await getForecast(geocodeData.lon,geocodeData.lat);
    console.log("forecastData:", forecastData);
    if (forecastData?.list) {
        const daily = pickDailyFrom3hList(forecastData.list);
        renderForecast(daily);
    }
    
    await getWeatherData(geocodeData.lon,geocodeData.lat);
    
}