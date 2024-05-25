import React, { useState, useEffect } from "react";
import TestLogo from "../../img/logo.png";
import { Link } from "react-router-dom";
import ReadOpenWeatherComponentOneDay from "../todo/ReadOpenWeatherComponentOneDay";

const API_KEY = "17b429a820b8a6496558ef04590c64f9"; // OpenWeather API 키를 여기에 입력하세요

const BasicMenu = () => {
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
    // 다른 도시들 추가...
  ];

  // 현재 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const [selectedCity, setSelectedCity] = useState(cityIds[0]);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date())); // 현재 날짜를 기본값으로 설정
  const [weather, setWeather] = useState(null);

  // 날씨 정보 가져오기
  const fetchWeather = async () => {
    if (!selectedDate) return;

    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${selectedCity.lat}&lon=${selectedCity.lon}&cnt=7&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("API 요청 실패: " + response.status);
      }
      const data = await response.json();

      if (!data.daily) {
        console.error("응답에 daily 필드가 없습니다:", data);
        return;
      }

      const weatherForDate = data.daily.find((day) => {
        const date = new Date(day.dt * 1000);
        return date.toISOString().split("T")[0] === selectedDate;
      });

      setWeather(weatherForDate);
    } catch (error) {
      console.error("날씨 정보를 가져오는 도중 오류가 발생했습니다:", error);
    }
  };

  // return (
  //   <div className="col-start-1 col-span-8 bg-[#12372A] p-4">
  //     <div className="flex flex-row justify-between items-center">
  //       <div>
  //         <Link to="/">
  //           <img src={TestLogo} className="h-20 bg-[#FFFFFF]" alt="Logo" />
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default BasicMenu;
