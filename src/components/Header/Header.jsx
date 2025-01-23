import { useState } from "react";
import useWeatherAPI from "../../utils/weatheAPI";
import "./header.css";
import search from "../../assets/images/search.png";
import rain from "../../assets/images/rain.png";
import humidity from "../../assets/images/humidity.png";
import wind from "../../assets/images/wind.png";

const Header = () => {
  const [city, setCity] = useState("");
  const { weatherData, error } = useWeatherAPI(city);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  return (
    <div>
      <div className="card">
        <div className="search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="city"
              placeholder="Enter city name"
            ></input>
            <button>
              <img src={search} alt="search-icon" />
            </button>
          </form>
        </div>
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="weather">
            <img src={rain} alt="weather-icon" />
            <h1 className="temp">{Math.ceil(weatherData.main?.temp)}°C</h1>
            <h2 className="city">{weatherData.name}</h2>
            <div className="details">
              <div className="col">
                <img src={humidity} alt="humadity-icon" />
                <div>
                  <p className="humidity">{weatherData.main?.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src={wind} alt="wind-icon" />
                <div>
                  <p className="wind">{weatherData.wind?.speed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
