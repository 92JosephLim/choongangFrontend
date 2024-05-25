import React, { useEffect, useState } from "react";
import { getList2 } from "../../api/openWeather";
import TestLogo from "../../img/logo.png";
import LocationIcon from "../../img/location.png";
import { Link } from "react-router-dom";

const ReadOpenWeatherComponentOneDay = ({ selectedCity, setSelectedCity }) => {
  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [showLocationButtons, setShowLocationButtons] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getList2();
        const todayData = filterTodayData(data);
        setServerData(todayData);
        localStorage.setItem("serverData", JSON.stringify(todayData));
        const secondCity = getSecondCity(todayData);
        setSelectedCity(secondCity);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
        setLoading(false);
      }
    };

    const storedData = JSON.parse(localStorage.getItem("serverData"));
    if (storedData) {
      const todayData = filterTodayData(storedData);
      setServerData(todayData);
      const secondCity = getSecondCity(todayData);
      setSelectedCity(secondCity);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [selectedDate, setSelectedCity]);

  const filterTodayData = (data) => {
    const today = selectedDate;
    return data.filter((item) => item.date === today);
  };

  const getSecondCity = (data) => {
    const cityNames = Array.from(new Set(data.map((city) => city.urlKRName)));
    if (cityNames.length >= 2) {
      return cityNames[1];
    } else {
      return "";
    }
  };

  const handleCityClick = (cityName) => {
    setSelectedCity(cityName);
  };

  const toggleLocationButtonContainer = () => {
    setShowLocationButtons(!showLocationButtons);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const cityNames = Array.from(new Set(serverData.map((city) => city.urlKRName)));
  const filteredData = serverData.filter((data) => data.urlKRName === selectedCity);

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
            onClick={toggleLocationButtonContainer}
          />
        </div>

        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 ">
            {filteredData.map((openWeather) => (
              <div
                key={openWeather.tno}
                className="border bg-[#12372A] border-[#12372A] p-4 rounded-lg"
              >
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="p-2"
                />
                <div className="bg-slate-50">
                  <h3 className="text-lg font-bold">
                    {openWeather.urlKRName}의 날씨
                  </h3>

                  <h3 className="text-lg font-bold">
                    🌛{Math.round(openWeather.minTemp)} °C 🌝{" "}
                    {Math.round(openWeather.maxTemp)} °C
                  </h3>

                  <h3 className="text-lg font-bold">
                    💧 {Math.round(openWeather.humidity)} % 💨{" "}
                    {Math.round(openWeather.windSpeed)} m/s
                  </h3>
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
