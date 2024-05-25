import React, { useState } from "react";

const WeekTabs = ({ onDayChange }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const generateWeekTabs = () => {
    let tabs = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      tabs.push({
        day: days[date.getDay()],
        fullDate: formatDate(date),
        displayDate: `${date.getMonth() + 1}.${date.getDate()}`,
      });
    }
    return tabs;
  };

  const handleTabClick = (index) => {
    setSelectedDate(generateWeekTabs()[index].fullDate);
    onDayChange(index);
  };

  return (
    <ul className="flex justify-center space-x-2">
      {generateWeekTabs().map((tab, index) => (
        <li
          key={index}
          className={`py-2 px-4 rounded-lg cursor-pointer ${
            tab.fullDate === selectedDate
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <button type="button" onClick={() => handleTabClick(index)}>
            <span className="day">{tab.day}</span>
            <span className="date ml-1">{tab.displayDate}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default WeekTabs;
