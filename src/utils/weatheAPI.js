import { useState, useEffect } from "react";

const apiKey = "b65e6b6b6a391b42d889fdb536260d56";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const useWeatherAPI = (city) => {
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status === 404) {
          setError("Unknown city name");
        } else {
          const data = await response.json();
          setWeatherData(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchWeatherData();
  }, [city]);

  return { weatherData, error };
};

export default useWeatherAPI;
