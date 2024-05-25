import BasicMenu from "../components/menus/BasicMenu";
import BasicFooter from "../components/menus/BasicFooter";
import ReadOpenWeatherComponentOneDay from "../components/todo/ReadOpenWeatherComponentOneDay";

const BasicLayout = ({ children, selectedCity, setSelectedCity }) => {
  return (
    <>
      <div className="bg-[#FFFFFF] max-w-screen-sm mx-auto border-x-2 border-[#436850]">
        <ReadOpenWeatherComponentOneDay selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        {/* 상단 여백 my-5(상/하 마진) md:space-x-1 : 왼쪽 여백 설정 */}
        <div className="bg-white w-full grid grid-cols-8 space-y-4 md:flex-row my-1 md:space-x-1 md:space-y-0">
          {/* py(위/아래 패딩)-40  --> py-5 */}
          <main className="bg-[#FFFFFF] col-start-1 col-span-8">
            <h1 className="">{children}</h1>
          </main>
        </div>
        <BasicFooter />
      </div>
    </>
  );
};

export default BasicLayout;
