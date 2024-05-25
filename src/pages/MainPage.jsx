import BasicLayout from "../layouts/BasicLayout";
import Banner from "../pages/todo/Banner";
import Themes from "../pages/todo/Themes";
import TypeContents from "../pages/todo/TypeContents";
import ReadOpenWeatherComponentSevenDays from "../components/todo/ReadOpenWeatherComponentSevenDays";
import { useState } from "react";

const MainPage = () => {
  // selectedCity 상태와 이를 업데이트하는 함수 생성
  const [selectedCity, setSelectedCity] = useState("");

  return (
   
    <BasicLayout selectedCity={selectedCity} setSelectedCity={setSelectedCity}>
      
      <div>test</div>
      <Banner />
      <Themes />
      <TypeContents />
      <ReadOpenWeatherComponentSevenDays selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
    </BasicLayout>
  );
};

export default MainPage;
