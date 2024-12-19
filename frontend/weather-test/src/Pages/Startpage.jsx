import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Startpage.css'

const Weather = () => {
    const [city, setCity] = useState('London');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        if (!city) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:5202/api/weather/${city}`);
            setWeather(response.data);
            console.log(response.data)
        } catch (err) {
            setError('Could not fetch weather data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (city) {
            fetchWeather();
        }
    }, [city]);

    return (
        <div>
            <main>
                <label class="inputLabel" for="valueSearch">Enter city name:</label>
                <form action="">
                    <input type="text" placeholder="Write 'Stockholm' for example..." autocomplete="off" id="valueSearch" value={city} onChange={(e) => setCity(e.target.value)} />
                    {/* <button onClick={(e) => setCity(e.target.value)}>
                        Search
                    </button> */}
                </form>
                {weather &&
                    <>
                        <section class="result">
                            <figure id="city">
                                <img src="https://flagsapi.com/GB/flat/32.png" alt="country-flag" />
                            </figure>
                            <figure class="temperature">
                                <img src="http://openweathermap.org/img/wn/10d@4x.png" alt="weather-picture" />
                                <figcaption>
                                    <span>20</span>
                                    <sup>o</sup>
                                </figcaption>
                            </figure>
                        </section>
                        <p class="description">
                            Overcast clouds
                        </p>

                        <ul>
                            <li>
                                <span>Humidity</span>
                                <i class="fa-solid fa-droplet"></i>
                                <span class="humidity">{weather.main.humidity}</span>%
                            </li>
                        </ul>
                    </>

                }


            </main>
        </div>
    );
};

export default Weather;
