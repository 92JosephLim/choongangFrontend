import { ReactComponent as ThemeIcon_1 } from "../../img/beach.svg";
import { ReactComponent as ThemeIcon_2 } from "../../img/island.svg";
import { ReactComponent as ThemeIcon_3 } from "../../img/mountain.svg";
import { ReactComponent as ThemeIcon_4 } from "../../img/forest.svg";
import { ReactComponent as ThemeIcon_5 } from "../../img/valley.svg";
import { ReactComponent as ThemeIcon_6 } from "../../img/river.svg";
import { ReactComponent as ThemeIcon_7 } from "../../img/lake.svg";
import { ReactComponent as ThemeIcon_8 } from "../../img/city.svg";

const Themes = () => {
  return (
    // <BasicLayout>
    <div
      id="themeSection"
      className="text-3xl grid grid-rows-2 bg-[#FFFFFF] mt-10"
    >
      <div
        id="themeIcons_1"
        className="grid grid-cols-4 mb-3 mr-20 bg-[#FFFFFF]"
      >
        <div className="text-center">
          <a href="#">
            <ThemeIcon_1 className="w-16 h-16 mx-auto" />
          </a>
          <p className="mt-2 text-sm text-black">해변</p>
        </div>
        <div className="text-center">
          <a href="#">
            <ThemeIcon_2 className="w-16 h-16 mx-auto" />
          </a>
          <p className="mt-2 text-sm text-black">섬</p>
        </div>
        <div className="text-center">
          <a href="#">
            <ThemeIcon_3 className="w-16 h-16 mx-auto" />
          </a>
          <p className="mt-2 text-sm text-black">산</p>
        </div>
        <div className="text-center">
          <a href="#">
            <ThemeIcon_4 className="w-16 h-16 mx-auto" />
          </a>
          <p className="mt-2 text-sm text-black">숲</p>
        </div>
      </div>

      <div id="themeIcons_2" className="grid grid-cols-4 mb-10 mr-20">
        <div className="text-center">
          <a href="#">
            <ThemeIcon_5 className="w-16 h-16 mx-auto" />
          </a>
          <p className="mt-2 text-sm text-black">계곡</p>
        </div>
        <div className="text-center">
          <a href="#">
            <ThemeIcon_6 className="w-16 h-16 mx-auto" />
          </a>
          <p className="mt-2 text-sm text-black">강</p>
        </div>
        <div className="text-center">
          <a href="#">
            <ThemeIcon_7 className="w-16 h-16 mx-auto" />
          </a>
          <p className="mt-2 text-sm text-black">호수</p>
        </div>
        <div className="text-center">
          <a href="#">
            <ThemeIcon_8 className="w-16 h-16 mx-auto" />
          </a>
          <p className="mt-2 text-sm text-black">도심</p>
        </div>
      </div>
    </div>
    // </BasicLayout>
  );
};

export default Themes;
