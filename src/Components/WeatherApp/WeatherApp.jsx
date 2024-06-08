import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  //these must stay outside the function
  let api_key = "fc54e79ddcfe848cf41a52ea240683ab";
  const [wicon,setWicon] = useState();
  const [windIcon,setWindIcon] = useState();
  const [humidityIcon,setHumidityIcon] = useState();

  //call this function at 'search-icon' click
  const search = async () => {
    const element = document.getElementsByClassName('cityInput');
    if(element[0].value === ''){
      return 0;
    } 
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
    //put data from the api to response variable
    let response = await fetch(url);
    //convert response to json
    let data = await response.json();
    //async and await together
    const humidity = document.getElementsByClassName('humidity-percent');
    const wind = document.getElementsByClassName('wind-rate');
    const temprature = document.getElementsByClassName('weather-temp');
    const location = document.getElementsByClassName('weather-location');
    const humidityTxt = document.getElementsByClassName('humidity-text');
    const windTxt = document.getElementsByClassName('wind-text');
    
    humidity[0].innerHTML = data.main.humidity + ' %';
    wind[0].innerHTML = Math.floor(data.wind.speed) + ' km/h';
    temprature[0].innerHTML = Math.floor(data.main.temp) + ' °C';
    location[0].innerHTML = data.name;
    humidityTxt[0].innerHTML = 'Humidity';
    windTxt[0].innerHTML = 'Wind Speed';

    if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
      setWicon(clear_icon);    
    } else if (data.weather[0].icon==='02d' || data.weather[0].icon==='02n'){
      setWicon(cloud_icon);
    } else if (data.weather[0].icon==='03d' || data.weather[0].icon==='03n'){
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon==='04d' || data.weather[0].icon==='04n'){
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon==='09d' || data.weather[0].icon==='09n'){
      setWicon(rain_icon);
    } else if (data.weather[0].icon==='10d' || data.weather[0].icon==='10n'){
      setWicon(rain_icon);
    } else if (data.weather[0].icon==='13d' || data.weather[0].icon==='13n'){
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
    setWindIcon(wind_icon);
    setHumidityIcon(humidity_icon);
  }

  return (
    <div className='container'>
        <div className='top-bar'>
          <input type="text" className='cityInput' placeholder='Search city' />
          <div className="search-icon" onClick={()=>{search()}}>
            <img src={search_icon}/>
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon}/>
        </div>
        <div className="weather-temp"></div>
        <div className="weather-location"></div>
        <div className="data-container">
          <div className="element">
            <img src={humidityIcon} alt="" className='icon' />
            <div className="data">
              <div className="humidity-percent"></div>
              <div className="humidity-text"></div>
            </div>
          </div>
          <div className="element">
            <img src={windIcon} alt="" className='icon' />
            <div className="data">
              <div className="wind-rate"></div>
              <div className="wind-text"></div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default WeatherApp