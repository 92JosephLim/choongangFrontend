import { useEffect, useState } from "react";
import { getList2 } from "../api/openWeather";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";

const ReadOpenWeatherComponentThirtyDays = () => {
  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today); // 디폴트 값은 빈 문자열로 설정

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("serverData")); // 로컬 스토리지에서 데이터 가져오기
    console.log(storedData);
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
    setSelectedDate(cityName);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const cityNames = Array.from(
    new Set(serverData.map((city) => city.urlKRName))
  );
  const cityLat = Array.from(
    new Set(serverData.map((city) => city.urlStringLat))
  );
  const cityDates = Array.from(new Set(serverData.map((city) => city.date)));

  // 선택한 도시에 해당하는 데이터만 필터링
  const filteredData = serverData.filter((data) => data.date === selectedDate);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2 p-4">
      <div className="flex flex-wrap justify-center space-x-4 mb-4">
        <div className="overflow-x-auto whitespace-nowrap">
          {cityDates.map((cityDate) => (
            <button
              key={cityDate}
              onClick={() => handleCityClick(cityDate)}
              className={`py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 m-2 ${
                cityDate === selectedDate ? "bg-blue-600" : ""
              }`}
            >
              {cityDate}
            </button>
          ))}
        </div>
      </div>
      {filteredData.length > 0 ? (
        <div>
          <div className="border border-gray-200 p-4 rounded-lg">
            <Map
              id="map"
              center={{ lat: 36.0345423, lng: 128.6142847 }}
              style={{ width: "100%", height: "600px" }}
              level={13}
            >
              {filteredData.map((openWeather) => (
                <CustomOverlayMap
                  key={openWeather.urlKRName}
                  position={{
                    lat: openWeather.urlStringLat,
                    lng: openWeather.urlStringLon,
                  }}
                >
                  <div className="wrap bg-sky-50 border p-1 w-auto h-auto mx-auto rounded-lg shadow-lg flex flex-col justify-center items-center text-xs">
                    <div className="info text-center">
                      <div className="title flex justify-between items-center ">
                        <span className="ellipsis w-full text-center truncate">
                          🚩{openWeather.urlKRName}{" "}
                          {getWeatherIcon(openWeather.weatherIcon)}
                        </span>
                      </div>
                      <div className="body">
                        <div className="desc flex flex-col items-center ">
                          <img />
                          <span className="text-[12px]">
                            🌝{Math.round(openWeather.minTemp)}°C/🌛
                            {Math.round(openWeather.maxTemp)}°C
                          </span>
                          <span className="text-[12px]">
                            💧 {Math.round(openWeather.humidity)}%
                          </span>
                          <span className="text-[12px]">
                            💨 {Math.round(openWeather.windSpeed)}m/s
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CustomOverlayMap>
              ))}
            </Map>
          </div>
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
