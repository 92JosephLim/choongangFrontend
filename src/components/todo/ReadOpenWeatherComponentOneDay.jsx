import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData, setSelectedCity, setSelectedDate } from '../../pages/weatherSlice'; // 올바른 경로로 수정
import TestLogo from '../../img/logo.png';
import LocationIcon from '../../img/location.png';
import { Link } from 'react-router-dom';

const ReadOpenWeatherComponentOneDay = () => {
  const dispatch = useDispatch();
  const { data, selectedCity, selectedDate, loading, error } = useSelector((state) => state.weather);
  const [showLocationButtons, setShowLocationButtons] = useState(false);

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch]);

  const handleCityClick = (cityName) => {
    dispatch(setSelectedCity(cityName));
  };

  const handleDateChange = (e) => {
    dispatch(setSelectedDate(e.target.value));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const cityNames = Array.from(new Set(data.map((city) => city.urlKRName)));
  const filteredData = data.filter((item) => item.date === selectedDate && item.urlKRName === selectedCity);

  return (
    <div className="bg-[#12372A] w-full h-full m-0 p-0">
      <div className="flex justify-between bg-[#12372A] m-0 p-0">
        <div className="space-x-4 mb-4">
          <Link to={`/`}>
            <img src={TestLogo} className="h-20 bg-[#12372A]" alt="Logo" />
          </Link>
        </div>

        <div className="space-x-4 mb-4">
          <img
            src={LocationIcon}
            className="h-8 cursor-pointer"
            alt="Location Icon"
            onClick={() => setShowLocationButtons(!showLocationButtons)}
          />
        </div>

        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1">
            {filteredData.map((openWeather) => (
              <div key={openWeather.tno} className="border bg-[#12372A] border-[#12372A] p-4 rounded-lg">
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="p-2"
                />
                <div className="bg-slate-50">
                  <h3 className="text-lg font-bold">{openWeather.urlKRName}의 날씨</h3>
                  <h3 className="text-lg font-bold">🌛{Math.round(openWeather.minTemp)} °C 🌝 {Math.round(openWeather.maxTemp)} °C</h3>
                  <h3 className="text-lg font-bold">💧 {Math.round(openWeather.humidity)} % 💨 {Math.round(openWeather.windSpeed)} m/s</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No data available</div>
        )}
      </div>

      {showLocationButtons && (
        <div className="bg-white border-2">
          {cityNames.map((cityName) => (
            <button
              key={cityName}
              onClick={() => handleCityClick(cityName)}
              className={`py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 m-2 ${
                cityName === selectedCity ? "bg-blue-600" : ""
              }`}
            >
              {cityName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadOpenWeatherComponentOneDay;
