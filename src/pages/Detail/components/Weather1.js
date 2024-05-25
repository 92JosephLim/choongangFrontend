import React, { useState, useEffect } from "react";
import axios from "axios";

// OpenWeatherMap API 키
const API_KEY = "17b429a820b8a6496558ef04590c64f9";

function Weather1({ gocamping }) {
  // 날씨 정보를 저장할 상태 변수
  const [weatherInfo, setWeatherInfo] = useState(null);
  // 현재 날씨
  const SEOUL_COORDS = { lat: gocamping.mapY, lon: gocamping.mapX };

  useEffect(() => {
    // 서울의 날씨 정보를 가져오는 비동기 함수
    //async 키워드는 함수가 비동기적으로 작동함을 나타냅니다. 이는 함수가 비동기적으로 실행될 때 해당 함수가 다른 코드와 동시에 실행될 수 있음을 의미합니다.

    const fetchSeoulWeather = async () => {
      try {
        // OpenWeatherMap API를 사용하여 서울의 7일간의 날씨 정보 요청
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${SEOUL_COORDS.lat}&lon=${SEOUL_COORDS.lon}&cnt=7&appid=${API_KEY}&units=metric`
        );

        // 요청한 날씨 정보를 상태 변수에 저장
        setWeatherInfo(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // 컴포넌트가 마운트될 때 날씨 정보를 가져오는 함수 호출
    fetchSeoulWeather();
  }, []);

  // 날씨 정보가 없는 경우 로딩 메시지 표시
  if (!weatherInfo) {
    return <div className="text-center p-5">Loading...</div>;
  }

  // 날씨 정보가 있는 경우 화면에 표시
  return (
    <div className="flex justify-center overflow-x-auto whitespace-nowrap">
      <div className="flex w-[520px]">
        {weatherInfo.list.map((weather, index) => (
          <div
            key={index}
            className={`bg-sky-200 rounded-lg p-3 mx-2 inline-block flex-none min-w-[128px] text-center`}
          >
            <h3 className="text-xs">
              {new Date(weather.dt * 1000).toLocaleString("ko-KR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                weekday: "short",
              })}
            </h3>
            <div className="flex flex-col items-center">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="w-12 h-12"
              />
              <div className="mt-2">
                <h3 className="text-xs">
                  현재 온도:{" "}
                  <span className="text-xs">
                    {weather.temp.day.toFixed(2)} °C
                  </span>
                </h3>
                <h3 className="text-xs">
                  최저 온도:{" "}
                  <span className="text-xs">
                    {weather.temp.min.toFixed(2)} °C
                  </span>
                </h3>
                <h3 className="text-xs">
                  최고 온도:{" "}
                  <span className="text-xs">
                    {weather.temp.max.toFixed(2)} °C
                  </span>
                </h3>
                <h3 className="text-xs">
                  풍 속:{" "}
                  <span className="text-xs">
                    {weather.speed.toFixed(2)} km/h
                  </span>
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather1;
