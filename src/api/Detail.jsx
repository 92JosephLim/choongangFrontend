import axios from "axios";
import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import WeekTabs from "../pages/Detail/components/WeekTabs";

const API_KEY = "17b429a820b8a6496558ef04590c64f9";

function WeatherInfo() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    "1835848", // 서울 Seoul
    "1838519", // 춘천 Chuncheon
    "1846898", // 백령 Baengnyeong
    "1835553", // 수원 Suwon
    "1845604", // 청주 Cheongju
    "1842025", // 강릉 Gangneung
    "1839873", // 울릉 Ulleung
    "1835224", // 독도 Dokdo (특정 ID 찾기 어려움, 울릉도와 같이 사용 권장)
    "1835224", // 대전 Daejeon
    "1846986", // 안동 Andong
    "1835327", // 대구 Daegu
    "1833747", // 울산 Ulsan
    "1838524", // 부산 Busan
    "1832157", // 여수 Yeosu
    "1841066", // 목포 Mokpo
    "1841811", // 광주 Gwangju
    "1845457", // 전주 Jeonju
    "1846266", // 제주 Jeju
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const responses = await Promise.all(
          cityIds.map((id) =>
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric&lang=kr`
            )
          )
        );

        const newData = responses.map((res) => ({
          city: res.data.name,
          temperature: res.data.main.temp,
          lat: res.data.coord.lat,
          lng: res.data.coord.lon,
          weather: weatherIcons[res.data.weather[0].icon] || "날씨 정보 없음",
          img: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
        }));

        setWeatherData(newData);
      } catch (error) {
        console.error("날씨 정보를 불러오는 중 오류가 발생했습니다.", error);
        setError("날씨 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <WeatherMap weatherData={weatherData} />;
}

function WeatherMap({ weatherData }) {
  return (
    <>
      <WeekTabs />
      <Map
        id="map"
        center={{
          lat: 36.0345423,
          lng: 128.6142847,
        }}
        style={{
          width: "100%",
          height: "600px",
        }}
        level={13}
      >
        {weatherData.map((weather, index) => (
          <CustomOverlayMap
            key={index}
            position={{ lat: weather.lat, lng: weather.lng }}
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
                      src={weather.img}
                      alt={weather.weather}
                      className="w-8 h-8 mb-1"
                    />
                    <span className="text-[12px]">
                      {weather.temperature.toFixed(1)}°C
                    </span>
                    <span className="text-[12px]">{weather.weather}</span>
                  </div>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        ))}
      </Map>
    </>
  );
}

export default WeatherInfo;
