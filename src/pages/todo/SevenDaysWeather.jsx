import { Link } from "react-router-dom";
import pepe from "../../img/pepe.png";
import sunny from "../../img/sunny.svg";
import rainy from "../../img/rainy.svg";
import foggy from "../../img/foggy.svg";
// import map from '../../img/map.svg';
// import map1 from '../../img/map1.svg';
import { useState } from "react";
import RegionModal from "./RegionModal";
import { ReactComponent as SearchMap } from "../../img/down.svg";

const SevenDaysWeather = () => {
  const handleButtonClick = (day) => {
    console.log(day);
  };

  const handleMapClick = () => {
    console.log("Map button clicked");
    setModal(!modal);
  };

  const [modal, setModal] = useState(false);
  const [isMapPressed, setIsMapPressed] = useState(false);

  const handleMouseDown = () => {
    setIsMapPressed(true);
  };

  const handleMouseUp = () => {
    setIsMapPressed(false);
  };

  return (
    // <BasicLayout>

    <div
      id="contentSection"
      className="text-3xl text-black flex grid-cols-2 bg-[#FFFFFF] mb-10"
      style={{ display: "flex", flexDirection: "column", flexWrap: "row" }}
    >
      <div
        id="Mapweather"
        style={{ alignSelf: "center", paddingRight: "50px" }}
      >
        {/* onClick={() => handleButtonClick("목요일")} */}
        <Link
          to="/map"
          style={{
            color: "black",
            backgroundColor: "beige",
            fontSize: "15px",
            cursor: "pointer",
            transition: "transform 0.2s, background-color 0.2s",
            transform: isMapPressed ? "scale(0.95)" : "scale(1)",
            backgroundColor: isMapPressed ? "white" : "beige",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.95)";
            e.currentTarget.style.backgroundColor = "white";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "beige";
          }}
        ></Link>
      </div>
      {/* <img src={map1} alt="map1" style={{ width: "60px", height: "60px" }} /> */}
      <div className="pr-6 text-7xl col-start-5 col-span-1 flex justify-center items-center">
        <span
          id="campingLocal"
          className={`justify-center relative text-xl bg-[#FFFFFF] grid place-items-center text-[#E8DFCA] border-solid rounded-xl ${
            isMapPressed ? "pressed" : ""
          }`}
          style={{ width: "7%" }}
          onClick={handleMapClick}
          onMouseDown={() => setIsMapPressed(true)}
          onMouseUp={() => setIsMapPressed(false)}
        >
          <SearchMap className="cursor-pointer w-8 h-8" />
        </span>
      </div>

      {modal === true ? <RegionModal /> : null}

      <div id="WeekWeather" style={{ display: "flex", flexWrap: "row" }}>
        <div id="Mon" className="ml-7 mr-5 mb-5">
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "13px" }}
          >
            월요일
          </p>

          <img src={sunny} className="h-20" />
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최고: 22°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최저: 11°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            습도: 33%{" "}
          </p>
        </div>

        <div id="Tue" className=" ml-5 mr-5 mb-5">
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "13px" }}
          >
            화요일
          </p>

          <img src={rainy} className="h-20" />
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최고: 24°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최저: 14°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            습도: 48%{" "}
          </p>
        </div>

        <div id="Wes" className=" ml-5 mr-5 mb-5">
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "13px" }}
          >
            수요일
          </p>

          <img src={foggy} className="h-20" />
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최고: 22°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최저: 11°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            습도: 38%{" "}
          </p>
        </div>

        <div id="Thr" className=" ml-5 mr-5 mb-5">
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "13px" }}
          >
            목요일
          </p>

          <img src={foggy} className="h-20" />
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최고: 22°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최저: 11°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            습도: 26%{" "}
          </p>
        </div>

        <div id="Fri" className=" ml-5 mr-5 mb-5">
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "13px" }}
          >
            금요일
          </p>

          <img src={sunny} className="h-20" />
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최고: 25°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최저: 13°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            습도: 45%{" "}
          </p>
        </div>

        <div id="Sat" className=" ml-5 mr-5 mb-5">
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "13px" }}
          >
            토요일
          </p>

          <img src={foggy} className="h-20" />
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최고: 23°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최저: 10°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            습도: 65%{" "}
          </p>
        </div>

        <div id="Sun" className=" ml-5 mr-5 mb-5">
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "13px" }}
          >
            일요일
          </p>
          <img src={rainy} alt="Sun" className="h-20" />
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최고: 22°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            최저: 11°{" "}
          </p>
          <p
            className="text-sm text-black"
            style={{ color: "black", fontSize: "10px" }}
          >
            습도: 38%{" "}
          </p>{" "}
        </div>
      </div>
    </div>

    // </BasicLayout>
  );
};
export default SevenDaysWeather;
