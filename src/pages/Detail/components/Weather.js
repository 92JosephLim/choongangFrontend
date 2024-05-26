import { useEffect, useState } from "react";
import { getList2 } from "../../../api/openWeather";

const Weather = ({  }) => {
  const [serverData, setServerData] = useState([]); //30일
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(""); // 디폴트 값은 빈 문자열로 설정


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("serverData")); // 로컬 스토리지에서 데이터 가져오기
    if (storedData) {
      setServerData(storedData); // 저장된 데이터로 상태 설정
      const secondCity = getSecondCity(storedData); // 두 번째 도시 가져오기
      setSelectedCity(secondCity); // 두 번째 도시를 기본값으로 설정
      setLoading(false);
    } else {
      fetchData(); // 저장된 데이터가 없으면 서버에서 데이터 가져오기
    }
  }, []);

  const fetchData = () => {
    setLoading(true);
    getList2()
      .then((data) => {
        console.log("Received data: ", data);
        setServerData(data);
        localStorage.setItem("serverData", JSON.stringify(data)); // 데이터를 로컬 스토리지에 저장
        const secondCity = getSecondCity(data); // 두 번째 도시 가져오기
        setSelectedCity(secondCity); // 두 번째 도시를 기본값으로 설정
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSecondCity = (data) => {
    const cityNames = Array.from(new Set(data.map((city) => city.urlKRName)));
    if (cityNames.length >= 2) {
      return cityNames[1]; // 두 번째 도시 반환
    } else {
      return ""; // 데이터가 없거나 도시가 하나밖에 없을 경우 빈 문자열 반환
    }
  };

  //에러 시 표현
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 선택한 도시에 해당하는 데이터만 필터링
  const filteredData = serverData.filter(
    (data) => data.urlKRName === selectedCity
  );

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2 p-4 overflow-x-auto">
      {filteredData.length > 0 ? (
        <div className="flex flex-nowrap gap-4">
          {filteredData.map((openWeather) => (
            <div
              key={openWeather.tno}
              className="border border-gray-200 p-4 rounded-lg min-w-max"
            >
              <div className="font-bold">{openWeather.weatherName}</div>
              <div className="mt-2">Date: {openWeather.date}</div>
              <div>Weather Icon: {getWeatherIcon(openWeather.weatherIcon)}</div>
              <div>Day Temp: {Math.round(openWeather.dayTemp)}°C</div>
              <div>Max Temp: {Math.round(openWeather.maxTemp)}°C</div>
              <div>Min Temp: {Math.round(openWeather.minTemp)}°C</div>
            </div>
          ))}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

const getWeatherIcon = (weatherIcon) => {
  switch (weatherIcon) {
    case "01d":
      return "☀️"; // 맑음 (주간)
    case "01n":
      return "🌙"; // 맑음 (야간)
    case "02d":
    case "02n":
      return "⛅"; // 구름 조금 (주간, 야간)
    case "03d":
    case "03n":
      return "🌥️"; // 구름 (주간, 야간)
    case "04d":
    case "04n":
      return "☁️"; // 흐림 (주간, 야간)
    case "09d":
    case "09n":
      return "🌧️"; // 비 (주간, 야간)
    case "10d":
    case "10n":
      return "🌧️"; // 비 (주간, 야간)
    case "11d":
    case "11n":
      return "⛈️"; // 천둥번개 (주간, 야간)
    case "13d":
    case "13n":
      return "❄️"; // 눈 (주간, 야간)
    case "50d":
    case "50n":
      return "🌫️"; // 안개 (주간, 야간)
    default:
      return ""; // 기타
  }
};

export default Weather;
