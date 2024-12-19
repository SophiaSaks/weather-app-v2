import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Startpage.css'

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const fetchWeather = async () => {
        if (!city) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:5202/api/weather/${city}`);
            setWeather(response.data);
        } catch (err) {
            setError('Could not fetch weather data.');
        } finally {
            setLoading(false);
        }
    };

    return (


        <div className="main">
            <div className="header">
                    <input
                        type="text"
                        value={city}
                        onChange={handleCityChange}
                        placeholder="Enter a city, like 'Stockholm' for example"
                    />
                    <button onClick={fetchWeather}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </div>
            {weather && (
                <div className="weathersection">
                    <section className="result">
                        <figure className="name" id="city">
                            <figcaption id="figcaption">{weather.name}</figcaption>
                        </figure>
                        <figure className="temperature">
                            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather-picture" />
                            <figcaption>
                                <span>{Math.floor(weather.main.temp)}</span>
                                <sup>o</sup>
                            </figcaption>
                        </figure>
                    </section>
                    <span className="description">{weather.weather[0].description}</span>
                    <ul>
                        <li>
                            <span>Humidity</span>
                            <span className="humidity">{weather.main.humidity}</span>%
                        </li>
                        <li>
                            <span>Pressure</span>
                            <span className="pressure">{weather.main.pressure}</span>hPa
                        </li>
                    </ul>
                </div>
            )}
        </div>

    );
};

export default Weather;