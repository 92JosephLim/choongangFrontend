import React, { createContext, useState } from 'react';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  // formatDate 함수를 useState 이전에 정의
  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  return (
    <WeatherContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
