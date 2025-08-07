import React, { useEffect, useRef, useState } from 'react'

import { CiCloudSun, CiSearch } from "react-icons/ci";
import Wind from './assets/wind.png';
import Humidity from './assets/humidity.png';



const App = () => {

  const [weatherData,setWeatherData] = useState(false);
  const inputRef = useRef();
  const search = async(city)=>{
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      setWeatherData({
        temperature : Math.floor(data.main.temp),
        humidity : data.main.humidity,
        feelsLike : Math.floor(data.main.feels_like),
        location : data.name,
        wind : data.wind.speed,
      })
    } catch (error) {
      alert("Enter a valid city name");
    }

  }

  const handleClick =()=>{
    search(inputRef.current.value);
    inputRef.current.value = "";
  }

  useEffect(()=>{
    search("Dhaka")
  },[])
  return (
    <>
      <div className='bg-blue-200 w-full h-screen flex justify-center'>

          <div className='w-full h-screen sm:h-5/6 flex flex-col md:1/2 lg:w-1/3 bg-gradient-to-r from-blue-800 to-purple-700 p-8 md:m-10 md:rounded-lg text-white shadow-slate-400 shadow-xl '>
            <div className='flex w-full flex-row h-10 mt-5'>
              <input ref={inputRef} placeholder='Enter a city name' type='text' className='p-4 w-full rounded-l-xl bg-transparent border outline-none border-white placeholder:text-gray-200'></input>
              <button type='search' className='p-2 pl-4 pr-4 bg-gray-100  bg-opacity-50 flex items-center justify-center border border-white rounded-r-sm text-purple-800 hover:bg-gray-100 hover:text-blue-600 duration-300 transition-all' onClick={handleClick}>
                <CiSearch size={32} className='font-bold'/>
              </button>
            </div>


          <div className='flex flex-col justify-center items-center pt-16'>
            <div className='text-white pb-5'><CiCloudSun size={80}/></div>  
            <div className='flex flex-col justify-center items-center gap-1'>
              <h1 className='text-6xl font-semibold'>{weatherData.temperature}°C</h1>
              <span className='text-sm text-gray-100 pb-2'>Feels Like : {weatherData.feelsLike}°C</span>
              <p className='text-3xl tracking-wider'>{weatherData.location}</p>
            </div>          
          </div>

          <div className='flex pt-20 justify-between pl-5 pr-5 gap-2'>
            <div className='flex gap-2'>
            <div>
              <img src={Humidity} />
            </div>
              <div>
                <p>{weatherData.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className='flex gap-2'>
            <div>
              <img src={Wind} />
            </div>
              <div>
                <p>{weatherData.wind} km/h</p>
                <p>Wind speed</p>
              </div>
            </div>
          </div>


          </div>

      </div>
    </>
  )
}

export default App