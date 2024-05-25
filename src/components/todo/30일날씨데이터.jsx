import { useEffect, useState } from "react";
import { getList2 } from "../../api/openWeather";

//지역 선택시 그 지역 30일 날씨 데이터
const WeatherData = ({ cityName }) => {
  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState("서울"); // 디폴트 값은 빈 문자열로 설정

  useEffect(() => {
    setSelectedCity(cityName);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const cityNames = Array.from(
    new Set(serverData.map((city) => city.urlKRName))
  );

  // 선택한 도시에 해당하는 데이터만 필터링
  const filteredData = serverData.filter(
    (data) => data.urlKRName === selectedCity
  );

  return data;
};

export default WeatherData;
