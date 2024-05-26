import React from 'react';
import BasicFooter from "../components/menus/BasicFooter";
import ReadOpenWeatherComponentOneDay from "../components/todo/ReadOpenWeatherComponentOneDay";

const BasicLayout = ({ children }) => {
  return (
    <>
      <div className="bg-[#FFFFFF] max-w-screen-sm mx-auto border-x-2 border-[#436850]">
        <ReadOpenWeatherComponentOneDay />
        <div className="bg-white w-full grid grid-cols-8 space-y-4 md:flex-row my-1 md:space-x-1 md:space-y-0">
          <main className="bg-[#FFFFFF] col-start-1 col-span-8">
            {children}
          </main>
        </div>
        <BasicFooter />
      </div>
    </>
  );
};

export default BasicLayout;
