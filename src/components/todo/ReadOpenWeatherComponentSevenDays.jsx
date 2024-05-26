import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCity } from '../../pages/weatherSlice'; // 경로 수정 필요
import sunnydown from '../../img/sunnydown.svg';
import foggydown from '../../img/foggydown.svg';
import cloudydown from '../../img/cloudydown.svg';
import rainydown from '../../img/rainydown.svg';
import snowydown from '../../img/snowydown.svg';
import LocationIcon from '../../img/location.png';

const ReadOpenWeatherComponentSevenDays = () => {
  const dispatch = useDispatch();
  const { data, selectedCity, loading, error } = useSelector((state) => state.weather);
  const [showLocationButtons, setShowLocationButtons] = useState(false);

  // 로컬스토리지에서 selectedCity 불러오기
  useEffect(() => {
    const storedCity = localStorage.getItem('selectedCity');
    if (storedCity) {
      dispatch(setSelectedCity(storedCity));
    }
  }, [dispatch]);

  // selectedCity가 변경될 때 로컬스토리지에 저장
  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem('selectedCity', selectedCity);
    }
  }, [selectedCity]);

  const ICONS = {
    "01d": sunnydown,
    "01n": sunnydown,
    "02d": cloudydown,
    "02n": cloudydown,
    "03d": cloudydown,
    "03n": cloudydown,
    "04d": cloudydown,
    "04n": cloudydown,
    "09d": rainydown,
    "09n": rainydown,
    "10d": rainydown,
    "10n": rainydown,
    "11d": rainydown,
    "11n": rainydown,
    "13d": snowydown,
    "13n": snowydown,
    "50d": foggydown,
    "50n": foggydown,
  };

  const handleCityClick = (cityName) => {
    dispatch(setSelectedCity(cityName));
  };

  const toggleLocationButtonContainer = () => {
    setShowLocationButtons(!showLocationButtons);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const cityNames = Array.from(new Set(data.map((city) => city.urlKRName)));
  const filteredData = data
    .filter((item) => item.urlKRName === selectedCity)
    .filter((item) => {
      const today = new Date();
      const itemDate = new Date(item.date);
      const diffInDays = (itemDate - today) / (1000 * 60 * 60 * 24);
      return diffInDays >= 0 && diffInDays <= 8;
    });

  return (
    <div className="border-2 border-bg-[#12372A] mt-10 mr-2 ml-2 p-2">
      <div className="flex flex-col items-center mb-2">
        <button
          onClick={toggleLocationButtonContainer}
          className="py-1 px-2 bg-white border border-white text-white rounded hover:bg-blue-100 focus:outline-none focus:bg-blue-100 m-1"
        >
          <img
            src={LocationIcon}
            alt="Locations"
            className="w-4 h-4 object-contain mr-1 inline"
          />
        </button>

        {showLocationButtons && (
          <div className="flex flex-wrap justify-center space-x-2 mb-2">
            {cityNames.map((cityName) => (
              <button
                key={cityName}
                onClick={() => handleCityClick(cityName)}
                className={`py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 m-1 ${
                  cityName === selectedCity ? "bg-blue-600" : ""
                }`}
              >
                {cityName}
              </button>
            ))}
          </div>
        )}
      </div>
      {filteredData.length > 0 ? (
        <div>
          <h2 className="text-lg font-bold text-center mb-2">{selectedCity}</h2>
          <div className="flex overflow-x-auto space-x-2">
            {filteredData.map((openWeather) => (
              <div key={openWeather.tno} className="border border-gray-200 p-2 rounded-lg flex-none w-32">
                <div className="bg-white rounded-lg p-1 m-1 text-center">
                  <div className="flex flex-col items-center">
                    <img src={ICONS[openWeather.weatherIcon]} alt={openWeather.description} className="w-6 h-6" />
                    <div className="mt-1 text-xs">
                      <h3 className="text-gray-800">{new Date(openWeather.date).toLocaleDateString()}</h3>
                      <h3 className="text-gray-800">현재 {Math.round(openWeather.dayTemp)}°</h3>
                      <h3 className="text-gray-800">🌛 {Math.round(openWeather.minTemp)}°</h3>
                      <h3 className="text-gray-800">🌝 {Math.round(openWeather.maxTemp)}°</h3>
                      <h3 className="text-gray-800">💧 {openWeather.humidity}%</h3>
                      <h3 className="text-gray-800">💨 {Math.round(openWeather.windSpeed)} m/s</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default ReadOpenWeatherComponentSevenDays;
