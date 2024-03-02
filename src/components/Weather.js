import "./Weather.css";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner"
import humidity from "./images/humidity.png";
import wind from "./images/wind.png";
import weather from "./images/weather.png"



export default function Weather() {

    const [search, setSearch] = useState("Baran");
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState(null);
    const apiKey = process.env.REACT_APP_WEATHER_API;
  
    useEffect(() => {
      const fetchWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`;
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setCity(result);
        setLoading(false);
      };
      fetchWeather();
      // eslint-disable-next-line
    }, [search]);

    // console.log(city.weather[0].icon);

  return (
    <div className="App">
      <form className="search">
        <h1>Weather App <img src={weather} alt="" /> </h1>
        <input
          className="form-control me-2 outline-secondary"
          type="search"
          placeholder="Enter City Name.."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          
        />
      </form>
      {loading && <Spinner/>}
      {!loading && city?.name ? (
        <div>
          <div className="main">
            <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="weather icon" />
            <h1>{city?.name}</h1>
            <h2>{city?.main?.temp}°C</h2>
            <div style={{lineHeight: "1rem"}}>
            <p>Feels Like : {city?.main?.feels_like}</p>
            <p>Max : {city?.main?.temp_max}</p>
            <p>Min: {city?.main?.temp_min}</p>
            <p>{city.weather[0].main}</p>
            </div>

          </div>
          <div className="other mt-4">
            <div>
            <img src={humidity} alt="humidity" /><br/>
            <p>Humidity : {city?.main?.humidity}%</p>
            </div>
            <div>
            <img src={wind} alt="wind" /><br/>
            <p>Wind : {city?.wind?.speed}km/h</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="error">Not Found</p>
      )}
    </div>
  );
}
