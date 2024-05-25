import { useEffect, useState } from "react";
import { getList2 } from "../../api/openWeather";

const ReadOpenWeatherComponentThirtyDays = () => {
  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(""); // 디폴트 값은 빈 문자열로 설정

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("serverData")); // 로컬 스토리지에서 데이터 가져오기
    if (storedData) {
      setServerData(storedData); // 저장된 데이터로 상태 설정
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
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCityClick = (cityName) => {
    setSelectedCity(cityName);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const cityNames = Array.from(
    new Set(serverData.map((city) => city.urlKRName))
  );

  // 선택한 도시에 해당하는 데이터만 필터링
  const filteredData = serverData.filter(
    (data) => data.urlKRName === selectedCity
  );

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2 p-4">
      <div className="flex flex-wrap justify-center space-x-4 mb-4">
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
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((openWeather) => (
            <div
              key={openWeather.tno}
              className="border border-gray-200 p-4 rounded-lg"
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

export default ReadOpenWeatherComponentThirtyDays;
