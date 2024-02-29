import "./Weather.css";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner"
import clear from "./images/clear.png";
import humidity from "./images/humidity.png";
import wind from "./images/wind.png";

export default function Weather(props) {

    const [search, setSearch] = useState("Baran");
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState(null);
    const apiKey = "5ae31873f38f72e145efd7dcf91bb748";
  
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
    }, [search]);

  return (
    <div className="App">
      <form className="search">
        <input
          className="form-control me-2"
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
          <div className="main mt-4">
            <img src={clear} alt="clear" />
            <h1>{city?.name}</h1>
            <h2>{city?.main?.temp}°C</h2>
            <div style={{lineHeight: "1rem"}}>
            <p>Max : {city?.main?.temp_max}</p>
            <p>Min: {city?.main?.temp_min}</p>
            </div>

          </div>
          <div className="other mt-4">
            <div>
            <img src={humidity} alt="" />
            <p>Humidity: {city?.main?.humidity}%</p>
            </div>
            <div>
            <img src={wind} alt="" />
            <p>Wind :{city?.wind?.speed}km/h</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="error">Not Found</p>
      )}
    </div>
  );
}
