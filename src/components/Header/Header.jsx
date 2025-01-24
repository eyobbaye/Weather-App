import { useState } from "react";
import useWeatherAPI from "../../utils/weatheAPI";
import "./header.css";
import search from "../../assets/images/search.png";
import rain from "../../assets/images/rain.png";
import humidity from "../../assets/images/humidity.png";
import wind from "../../assets/images/wind.png";

import clear from "../../assets/images/clear.png";
import clouds from "../../assets/images/clouds.png";
import drizzle from "../../assets/images/drizzle.png";
import snow from "../../assets/images/snow.png";
import sea from "../../assets/images/sea-level.png";
// import mist from "../../assets/images/mist.png";

const weatherIons = {
  "01d": clear,
  "01n": clear,
  "02d": clouds,
  "02n": clouds,
  "03d": clouds,
  "03n": clouds,
  "04d": clouds,
  "04n": clouds,
  "09d": drizzle,
  "09n": drizzle,
  "10d": rain,
  "10n": rain,
  "13d": snow,
  "13n": snow,
};

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
            <img
              src={
                weatherData.weather
                  ? weatherIons[weatherData.weather[0].icon]
                  : rain
              }
              alt="weather-icon"
            />
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
              <div className="col">
                <img src={wind} alt="wind-icon" />
                <div>
                  <p className="country">{weatherData.sys?.country} </p>
                  <p>Counrty</p>
                </div>
              </div>
              <div className="col">
                <img src={sea} alt="sea-level icon" />
                <div>
                  <p className="sea">{weatherData.main?.sea_level}</p>
                  <p>Sea Level</p>
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
