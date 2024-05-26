import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeatherData } from '../pages/weatherSlice';
import BasicLayout from '../layouts/BasicLayout';
import Banner from '../pages/todo/Banner';
import Themes from '../pages/todo/Themes';
import TypeContents from '../pages/todo/TypeContents';
import ReadOpenWeatherComponentSevenDays from '../components/todo/ReadOpenWeatherComponentSevenDays';

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherData());
  }, [dispatch]);

  return (
    <BasicLayout>
      <Banner />
      <Themes />
      <TypeContents />
      <ReadOpenWeatherComponentSevenDays />
    </BasicLayout>
  );
};

export default MainPage;
