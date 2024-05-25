import { Link } from "react-router-dom";
import glamping from "../../img/glamping.png";
import autoCamping from "../../img/autocamping.png";

const TypeContents = ({ imgSrc }) => {
  return (
    <div
      id="contentSection"
      className="text-3xl grid grid-cols-2 bg-[#FFFFFF] mb-10"
    >
      <div
        id="contentImg1"
        className={`grid ml-20 mr-5 mb-10 ${
          imgSrc === "Rainy" || imgSrc === "Snowy" ? "" : "hidden"
        }`}
      >
        <Link to="/caravan-glamping">
          <img src={glamping} className="h-80" />
          <span>카라반&글램핑</span>
        </Link>
      </div>
      <div
        id="contentImg2"
        className={`grid mr-20 ml-5 mb-0 ${
          imgSrc !== "Rainy" || imgSrc !== "Snowy" ? "hidden" : ""
        }`}
      >
        <Link to="/autoCamping">
          <img src={autoCamping} className="h-80" />
          <span>오토캠핑</span>
        </Link>
      </div>
    </div>
  );
};

export default TypeContents;
