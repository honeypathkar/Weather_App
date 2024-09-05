import "./Weather.css";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import humidity from "./images/humidity.png";
import wind from "./images/wind.png";
import weather from "./images/weather.png";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(false);
  const [localTime, setLocalTime] = useState(""); // State to store local time
  const [localDate, setLocalDate] = useState(""); // State to store local date

  const apiKey = process.env.REACT_APP_WEATHER_API;

  // Function to calculate local time and date based on timezone offset
  const calculateLocalTime = (timezone) => {
    const currentUTC =
      new Date().getTime() + new Date().getTimezoneOffset() * 60000; // Get current UTC time in milliseconds
    const localTime = new Date(currentUTC + timezone * 1000); // Calculate local time using the timezone offset
    setLocalTime(localTime.toLocaleTimeString()); // Update state with the formatted local time
    setLocalDate(localTime.toLocaleDateString()); // Update state with the formatted local date
  };

  //Modifying function for displaying local time and date
  const fetchWeatherBySearch = async () => {
    if (search === "") {
      alert("Write city name");
    } else {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`;
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setCity(result);
      setLoading(false);
      setError(result.cod !== 200); // Set error state if the city is not found
      if (result.cod === 200) {
        calculateLocalTime(result.timezone); // Calculate local time when city is found
      }
    }
  };

  //Modifying function for displaying local time and date
  const fetchWeatherByLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setCity(result);
      setLoading(false);
      setError(false);
      calculateLocalTime(result.timezone); // Calculate local time when location is found
    });
  };

  useEffect(() => {
    fetchWeatherByLocation();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherBySearch();
  };

  return (
    <div className="App">
      <form className="search" onSubmit={handleSearch}>
        <h1>
          Weather App <img src={weather} alt="" />
        </h1>
        <div className="inputBar">
          <input
            className="form-control me-2 outline-secondary"
            type="search"
            placeholder="Enter City Name.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-primary">
            Search
          </button>
        </div>
      </form>
      {loading && <Spinner />}
      {!loading && city?.name ? (
        <div className="details">
          <div className="main">
            <img
              src={`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
              alt="weather icon"
            />
            <h1>{city?.name}</h1>
            <h2>{Math.floor(city?.main?.temp)}°C</h2>
            <p>Date: {localDate}</p> {/* Display local date */}
            <p>Time: {localTime}</p> {/* Display local time */}
            <div style={{ lineHeight: "1rem" }}>
              <p>Feels Like : {Math.floor(city?.main?.feels_like)}°C</p>
              <p>Max : {Math.floor(city?.main?.temp_max + 3)}°C</p>
              <p>Min: {Math.floor(city?.main?.temp_min - 3)}°C</p>
              <p>{city.weather[0].main}</p>
            </div>
          </div>
          <div className="other mt-4">
            <div>
              <img src={humidity} alt="humidity" />
              <br />
              <p>Humidity : {city?.main?.humidity}%</p>
            </div>
            <div>
              <img src={wind} alt="wind" />
              <br />
              <p>Wind : {city?.wind?.speed}km/h</p>
            </div>
          </div>
        </div>
      ) : error ? (
        <p className="error">City not found</p>
      ) : null}
    </div>
  );
}
