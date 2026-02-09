# 🌤️ Weather App: Global Forecast

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![OpenWeather](https://img.shields.io/badge/OpenWeather-EB6E4B?style=for-the-badge&logo=openweathermap&logoColor=white)

A sleek, minimalist weather application that provides real-time conditions and a 5-day forecast for any city worldwide.

---

## 🚀 Features

* **🔍 Global Search:** Instantly fetch weather data for any city.
* **🌡️ Detailed Metrics:** View current temperature, "Feels Like" stats, and humidity.
* **🌥️ Visual Weather:** Dynamic weather descriptions and icons mapped to local conditions.
* **📅 5-Day Forecast:** Intelligent data processing that converts 3-hour interval snapshots into a clean daily view.

---

## 📸 Showcase & UI

<div align="center">
  <img src="https://github.com/user-attachments/assets/51a116a9-fcaf-441e-8ced-ca118e0ad3c0" width="32%" alt="Current Weather" />
  <img src="https://github.com/user-attachments/assets/ede592ef-6265-48ee-abac-161d18b8e35e" width="32%" alt="Search Interface" />
  <img src="https://github.com/user-attachments/assets/0e60f3b8-1452-45fa-b507-7eb0b2fca526" width="32%" alt="5-Day Forecast" />
</div>

---

## 🛠️ Technical Flow

The application manages a three-step asynchronous chain to display accurate data:

1.  **Geocoding API:** Translates city names into geographic coordinates ($lat, lon$).
2.  **Current Weather API:** Retrieves immediate local conditions.
3.  **5-Day Forecast API:** Fetches 40 data points (every 3 hours).

---

## 🔧 Installation & Setup

1.  **Obtain an API Key:**
    Sign up at [OpenWeatherMap](https://openweathermap.org/api).

2.  **Configure the Project:**
    Locate the `apiKey` variable in `script.js` and insert your key:
    ```javascript
    const apiKey = "YOUR_API_KEY_HERE";
    ```

3.  **Run Locally:**
    Simply open `index.html` in your browser—no build steps or servers required.

---

## 📄 License
This project is open-source and intended for educational use.

