# 🌤️ Weather App

A sleek, minimalist weather application built with **Vanilla JavaScript**. This app fetches real-time weather data and a 5-day forecast using the **OpenWeather API**.

---

## 🚀 Features

* **🔍 Global Search:** Get weather data for any city worldwide.
* **🌡️ Detailed Metrics:** View current temperature, "Feels Like" stats, and humidity.
* **🌥️ Visual Weather:** Dynamic weather descriptions and icons based on local conditions.
* **📅 5-Day Forecast:** Smart data processing that converts 3-hour snapshots into a daily view.

---

## 🛠️ Technologies

* **HTML5** - Semantic structure.
* **CSS3** - Custom styling with Flexbox/Grid.
* **JavaScript (ES6)** - Fetch API and DOM manipulation.
* **OpenWeather API** - Data source.

---

## 📦 APIs Used

The application coordinates between three specific OpenWeather endpoints:

1.  **Geocoding API** (`/geo/1.0/direct`): Translates city names into geographic coordinates ($lat, lon$).
2.  **Current Weather API** (`/data/2.5/weather`): Retrieves immediate local conditions.
3.  **5-Day Forecast API** (`/data/2.5/forecast`): Fetches 40 data points (every 3 hours).

> [!TIP]
> **Data Grouping Logic:** Since the free API tier doesn't provide a "daily" endpoint, this app filters the 3-hour interval data to display one representative entry per day (typically midday), ensuring a clean user interface.

---

## 🔑 Setup & Installation

1.  **Obtain an API Key:**
    Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api).

2.  **Configure the Project:**
    Open `script.js` and insert your API key into the variable:
    ```javascript
    const apiKey = "YOUR_API_KEY_HERE";
    ```

3.  **Run Locally:**
    No build tools or servers required. Simply open `index.html` in your browser.

---

## 📄 License

This project is open-source and intended for learning and personal use. 

---

*Built with ❤️ for the web.*
