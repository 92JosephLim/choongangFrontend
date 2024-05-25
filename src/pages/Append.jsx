import React, { useState, useEffect } from "react";
import axios from "axios";
import sunnydown from "../img/sunnydown.svg";
import foggydown from "../img/foggydown.svg";
import cloudydown from "../img/cloudydown.svg";
import rainydown from "../img/rainydown.svg";
import snowydown from "../img/snowydown.svg";
import { ReactComponent as SearchMap } from "../img/down.svg";

const API_KEY = "17b429a820b8a6496558ef04590c64f9";

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

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const options = { month: "2-digit", day: "2-digit", weekday: "short" };
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};

const ModalComponent = ({ handleClose, setAddress1, setAddress2 }) => {
  const regions = {
    서울: { lat: "37.5665", lon: "126.9780" },
    인천: { lat: "37.4563", lon: "126.7052" },
    수원: { lat: "37.2911", lon: "127.0089" },
    강릉: { lat: "37.7556", lon: "128.8961" },
    춘천: { lat: "37.8747", lon: "127.7342" },
    홍성: { lat: "36.6009", lon: "126.665" },
    대전: { lat: "36.3333", lon: "127.4167" },
    청주: { lat: "36.6372", lon: "127.4897" },
    부산: { lat: "35.1028", lon: "129.0403" },
    포항: { lat: "36.0322", lon: "129.365" },
    대구: { lat: "35.8703", lon: "128.5911" },
    안동: { lat: "36.5656", lon: "128.725" },
    울산: { lat: "35.8703", lon: "128.5911" },
    창원: { lat: "35.2281", lon: "128.6811" },
    광주: { lat: "35.1547", lon: "126.9156" },
    전주: { lat: "35.8219", lon: "127.1489" },
    목포: { lat: "34.7936", lon: "126.3886" },
    여수: { lat: "34.7546", lon: "127.6599" },
    제주: { lat: "33.5097", lon: "126.5219" },
  };

  const initialState = null;

  const [selectedRegion, setSelectedRegion] = useState(initialState);

  const handleReset = () => {
    setSelectedRegion(initialState); // 초기화 버튼 클릭 시 상태 업데이트
  };

  return (
    <div id="CampingLocalSearch" className="grid grid-cols-3 overflow-x-auto">
      <div
        id="CampingLocalSelect"
        className="col-start-1 col-span-1 bg-[#E8DFCA]"
      >
        <ul className="list-none text-center text-black">
          {Object.keys(regions).map((region) => (
            <li
              key={region}
              onClick={() => {
                setAddress1(regions[region].lat);
                setAddress2(regions[region].lon);
                setSelectedRegion(region);
              }}
              style={{ cursor: "pointer" }} // 여기에 커서 스타일 추가
            >
              {region}
            </li>
          ))}
        </ul>
      </div>
      <div
        id="CampingLocalDetailSelect"
        className="text-center grid grid-cols-2 col-span-2"
      >
        <div className="list-none col-span-2 grid grid-cols-2 bg-[#F5EFE6] text-black">
          <div className="col-span-2">{selectedRegion}</div>
        </div>
      </div>
      <div
        id="CampingSelect"
        className="grid grid-cols-3 col-span-3 bg-[#F5EFE6]"
      >
        <div
          id="Localinit"
          onClick={handleReset}
          className="col-span-1 text-xl bg-[#12372A] grid place-items-center text-[#E8DFCA] border-solid ml-2 mr-1 my-1.5 rounded-l"
        >
          초기화
        </div>
        <div
          id="Localinit"
          className="col-span-2 text-xl bg-[#12372A] grid place-items-center text-[#E8DFCA] border-solid ml-1 mr-2 my-1.5 rounded-l"
        >
          검색하기
        </div>
      </div>
    </div>
  );
};

const Append = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [modal, setModal] = useState(false);
  const [address1, setAddress1] = useState("37.5665");
  const [address2, setAddress2] = useState("126.9780");

  useEffect(() => {
    const fetchWeatherByLocation = async (lat, lon) => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${API_KEY}&units=metric`
        );
        console.log(response.data); // API 응답 데이터 출력
        setWeatherInfo(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByLocation(latitude, longitude);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchWeatherByLocation(address1, address2);
    if (!address1 || !address2) {
      getLocation();
    }
  }, [address1, address2]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div className="flex flex-wrap justify-center p-1">
      <div className="w-full flex justify-center mb-3">
        <button
          onClick={toggleModal}
          className="bg-white text-black rounded-full py-1 px-3 m-1 hover:bg-gray-200 transition-colors duration-300"
        >
          <SearchMap className="w-8 h-8" />
        </button>
      </div>
      {modal && (
        <ModalComponent
          handleClose={handleCloseModal}
          setAddress1={setAddress1}
          setAddress2={setAddress2}
        />
      )}
      <div className="overflow-x-auto w-full flex flex-nowrap justify-center">
        {weatherInfo &&
          weatherInfo.list.map((weather, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-1 m-1 flex-none text-center flex-shrink-0"
            >
              <h2 className="text-xxxxs font-bold mb-0">
                {formatDate(weather.dt).split(" ")[0]}
              </h2>
              <div className="flex flex-col items-center">
                <img
                  src={ICONS[weather.weather[0].icon]}
                  alt={weather.weather[0].description}
                  className="w-8 h-8"
                />
                <div className="mt-1">
                  <h3 className="text-xs text-gray-800">
                    현재{" "}
                    <span className="text-xxxxxxxs">
                      {Math.round(weather.temp.day)}°
                    </span>
                  </h3>
                  <h3 className="text-xs text-gray-800">
                    최저{" "}
                    <span className="text-xxxxxxxs">
                      {Math.round(weather.temp.min)}°
                    </span>
                  </h3>
                  <h3 className="text-xs text-gray-800">
                    최고{" "}
                    <span className="text-xxxxxxxs">
                      {Math.round(weather.temp.max)}°
                    </span>
                  </h3>
                  <h3 className="text-xs text-gray-800">
                    습도{" "}
                    <span className="text-xxxxxxxs">{weather.humidity}%</span>
                  </h3>
                  <h3 className="text-xs text-gray-800">
                    풍속{" "}
                    <span className="text-xxxxxxxs">{weather.speed} m/s</span>
                  </h3>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Append;
