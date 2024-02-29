import "./Weather.css";
import clear from "./images/clear.png";
import humidity from "./images/humidity.png";
import wind from "./images/wind.png";

export default function Weather() {

  return (
    <div className="App">
      <form className="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Enter City Name.."
          
        />
      </form>
        <div>
          <div className="main mt-4">
            <img src={clear} alt="clear" />
            <h1>Baran</h1>
            <h2>22°C</h2>
            <div style={{lineHeight: "1rem"}}>
            <p>Max : 23°C</p>
            <p>Min: 19°C</p>
            </div>

          </div>
          <div className="other mt-4">
            <div>
            <img src={humidity} alt="" />
            <p>Humidity: 20%</p>
            </div>
            <div>
            <img src={wind} alt="" />
            <p>Wind :12km/h</p>
            </div>
          </div>
        </div>
    </div>
  );
}
