import React, { useState } from 'react'
import './Input.css'
import axios from 'axios';

const Input=()=>{
  const [city,setCity]=useState('');
  const [weatherData,setWeatherData]=useState(null);
  const [error,setError]=useState('');
  const [units,setUnits]=useState('metric')
  const apiKey='36531e6af6c292ecf4cf0c18f022a79a';

  const fetchWeather=async()=>{
    setError('');
    setWeatherData(null);
    try{
      const response =await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
      );
      setWeatherData(response.data);
    }
  catch(err){
      setError('Could not retrieve weather data for the city');
      console.log("Error fetchong weather: ",err);
      setWeatherData(null);
    }
  };

  const handleInputChange=(event)=>{
    setCity(event.target.value);
  };

  const handleUnitChange=(event)=>{
    setUnits(event.target.value);
  };

  const handleSubmit=(event)=>{
    event.preventDefault();
    if(city.trim()){
      fetchWeather();
    }else{
      setError('Please enter a city name.');
    }
  };
  const formatTemperature=(temp)=>{
    if(units==='metric'){
      return `${Math.round(temp)}°C`;
    }else if(units==='imperial'){
      return `${Math.round(temp)}°F`;
    }
    return `${Math.round(temp)}K`;
  };

  return (
    <div className='input'>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Area' value={city} onChange={handleInputChange}/><br/>
          <button type='submit'>Get Weather</button>
        </form>
        <div>
            <label>
              <input 
                type='radio'
                value='metric'
                checked={units==='metric'}
                onChange={handleUnitChange}
              />
              Celsius 
            </label>
            <label>
              <input 
                type='radio'
                value='imperial'
                checked={units==='imperial'}
                onChange={handleUnitChange}
              />
              Fahrenheit 
            </label>
        </div>
        {error && <p style={{color:'red'}}>{error}</p>}

        {weatherData &&(
          <div className='display' >
            <h2>{weatherData.name}</h2>
            <p>Temperature: {formatTemperature(weatherData.main.temp)}</p>
            <p>Description: {weatherData.weather[0]?.description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind?.speed} m/s</p>
          </div>
        )}
       <i>Kindly submit the request again if you want to see the Temperature in different measurement unit.</i>
    </div>
  )
}
export default Input