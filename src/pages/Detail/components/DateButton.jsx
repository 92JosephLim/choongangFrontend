// DateButton.js
import React from "react";

const DateButton = ({ onDateChange }) => {
  const generateDateButtons = () => {
    const buttons = [];
    const today = new Date();
    for (let i = 0; i <= 30; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(futureDate.getDate() + i);
      const dateString = `${
        futureDate.getMonth() + 1
      }월 ${futureDate.getDate()}일`;
      buttons.push(
        <button
          key={i}
          className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          onClick={() => onDateChange(i)}
        >
          {dateString}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="date-buttons flex flex-wrap">{generateDateButtons()}</div>
  );
};

export default DateButton;
