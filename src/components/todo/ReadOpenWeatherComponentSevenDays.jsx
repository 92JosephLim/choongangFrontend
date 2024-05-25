import { useEffect, useState } from "react";
import { getList2 } from "../../api/openWeather";
import sunnydown from "../../img/sunnydown.svg";
import foggydown from "../../img/foggydown.svg";
import cloudydown from "../../img/cloudydown.svg";
import rainydown from "../../img/rainydown.svg";
import snowydown from "../../img/snowydown.svg";
import LocationIcon from "../../img/location.png";

const ReadOpenWeatherComponentSevenDays = ({ selectedCity, setSelectedCity }) => {
  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLocationButtons, setShowLocationButtons] = useState(false);

  const toggleLocationButtonContainer = () => {
    setShowLocationButtons(!showLocationButtons);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getList2();
        const weekData = filterWeekData(data); // 7일 데이터만 필터링
        setServerData(weekData);
        localStorage.setItem("serverData", JSON.stringify(weekData)); // 데이터를 로컬 스토리지에 저장
        const secondCity = getSecondCity(weekData); // 두 번째 도시 가져오기
        setSelectedCity(secondCity); // 두 번째 도시를 기본값으로 설정
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
        setLoading(false);
      }
    };

    const storedData = JSON.parse(localStorage.getItem("serverData")); // 로컬 스토리지에서 데이터 가져오기
    if (storedData) {
      const weekData = filterWeekData(storedData); // 7일 데이터만 필터링
      setServerData(weekData); // 저장된 데이터로 상태 설정
      const secondCity = getSecondCity(weekData); // 두 번째 도시 가져오기
      setSelectedCity(secondCity); // 두 번째 도시를 기본값으로 설정
      setLoading(false);
    } else {
      fetchData(); // 저장된 데이터가 없으면 서버에서 데이터 가져오기
    }
  }, [setSelectedCity]);

  const filterWeekData = (data) => {
    const today = new Date();
    const todayISO = today.toISOString().split("T")[0]; // 오늘 날짜의 ISO 형식 (YYYY-MM-DD)
    const weekData = data.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        item.date >= todayISO && itemDate - today <= 6 * 24 * 60 * 60 * 1000
      ); // 오늘 포함 7일 이내 데이터 필터링
    });
    return weekData;
  };

  const getSecondCity = (data) => {
    const cityNames = Array.from(new Set(data.map((city) => city.urlKRName)));
    if (cityNames.length >= 2) {
      return cityNames[1]; // 두 번째 도시 반환
    } else {
      return ""; // 데이터가 없거나 도시가 하나밖에 없을 경우 빈 문자열 반환
    }
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
    // 테두리 색
    <div className="border-2 border-bg-[#12372A] mt-10 mr-2 ml-2 p-2">
      <div className="flex flex-col items-center mb-2">
        <button
          onClick={toggleLocationButtonContainer}
          className="py-1 px-2 bg-white  border border-white text-white rounded hover:bg-blue-100 focus:outline-none focus:bg-blue-100 m-1"
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
        <div className="flex overflow-x-auto space-x-2">
          {filteredData.map((openWeather) => (
            <div
              key={openWeather.tno}
              className="border border-gray-200 p-2 rounded-lg flex-none w-32"
            >
              <div className="bg-white rounded-lg p-1 m-1 text-center">
                <div className="flex flex-col items-center">
                  <img
                    src={ICONS[openWeather.weatherIcon]}
                    alt={openWeather.description}
                    className="w-6 h-6"
                  />
                  <div className="mt-1 text-xs">
                    <h3 className="text-gray-800">
                      현재 {Math.round(openWeather.dayTemp)}°
                    </h3>
                    <h3 className="text-gray-800">
                      🌝 {Math.round(openWeather.maxTemp)}°
                    </h3>
                    <h3 className="text-gray-800">
                      🌛 {Math.round(openWeather.minTemp)}°
                    </h3>
                    <h3 className="text-gray-800">
                      💧 {openWeather.humidity}%
                    </h3>
                    <h3 className="text-gray-800">
                      💨 {openWeather.speed} m/s
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default ReadOpenWeatherComponentSevenDays;
