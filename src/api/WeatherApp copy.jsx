import axios from "axios";
import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import WeekTabs from "../pages/Detail/components/WeekTabs";

const API_KEY = "17b429a820b8a6496558ef04590c64f9";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);

  const weatherIcons = {
    "01d": "맑음",
    "02d": "구름 조금",
    "03d": "구름 많음",
    "04d": "흐림",
    "09d": "소나기",
    "10d": "비",
    "11d": "천둥",
    "13d": "눈",
    "50d": "안개",
  };

  const cityIds = [
    { name: "서울", lat: 37.5665, lon: 126.978 },
    { name: "춘천", lat: 37.8813, lon: 127.7298 },
    { name: "백령", lat: 37.9697, lon: 124.6305 },
    { name: "수원", lat: 37.2636, lon: 127.0286 },
    { name: "청주", lat: 36.6424, lon: 127.489 },
    { name: "강원", lat: 37.7519, lon: 128.8761 },
    { name: "울릉/독도", lat: 37.4914, lon: 130.9057 },
    { name: "대전", lat: 36.3504, lon: 127.3845 },
    { name: "안동", lat: 36.5684, lon: 128.7294 },
    { name: "대구", lat: 35.8722, lon: 128.6014 },
    { name: "울산", lat: 35.5384, lon: 129.3114 },
    { name: "부산", lat: 35.1796, lon: 129.0756 },
    { name: "여수", lat: 34.7604, lon: 127.6622 },
    { name: "목포", lat: 34.8118, lon: 126.3922 },
    { name: "광주", lat: 35.1595, lon: 126.8526 },
    { name: "전주", lat: 35.8242, lon: 127.148 },
    { name: "제주", lat: 33.4996, lon: 126.5312 },
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const responses = await Promise.all(
          cityIds.map((id) =>
            axios.get(
              `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${id.lat}&lon=${id.lon}&cnt=7&appid=${API_KEY}&units=metric`
            )
          )
        );

        const newData = responses.map((res, index) => ({
          city: cityIds[index].name,
          data: res.data.list.map((day) => ({
            min: day.temp.min,
            max: day.temp.max,
            weather: weatherIcons[day.weather[0].icon] || "날씨 정보 없음",
            img: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
          })),
        }));

        setWeatherData(newData);
      } catch (error) {
        console.error("날씨 정보를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchWeatherData();
  }, []);

  const handleDayChange = (dayIndex) => {
    setSelectedDay(dayIndex);
  };

  return (
    <>
      <WeekTabs onDayChange={handleDayChange} />
      <WeatherMap
        weatherData={weatherData}
        selectedDay={selectedDay}
        cityIds={cityIds}
      />
    </>
  );
}

function WeatherMap({ weatherData, selectedDay, cityIds }) {
  return (
    <Map
      id="map"
      center={{ lat: 36.0345423, lng: 128.6142847 }}
      style={{ width: "100%", height: "600px" }}
      level={13}
    >
      {weatherData.map((weather, index) => (
        <CustomOverlayMap
          key={index}
          position={{ lat: cityIds[index].lat, lng: cityIds[index].lon }}
        >
          <div className="wrap bg-sky-50 border p-2 w-20 h-20 mx-auto rounded-lg shadow-lg flex flex-col justify-center items-center text-xs">
            <div className="info text-center">
              <div className="title flex justify-between items-center ">
                <span className="ellipsis w-full text-center truncate">
                  {weather.city}
                </span>
              </div>
              <div className="body">
                <div className="desc flex flex-col items-center ">
                  <img
                    src={weather.data[selectedDay].img}
                    alt={weather.data[selectedDay].weather}
                    className="w-8 h-8 mb-1"
                  />
                  <span className="text-[12px]">
                    {weather.data[selectedDay].min.toFixed(1)}°C -{" "}
                    {weather.data[selectedDay].max.toFixed(1)}°C
                  </span>
                  <span className="text-[12px]">
                    {weather.data[selectedDay].weather}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CustomOverlayMap>
      ))}
    </Map>
  );
}

export default WeatherApp;
