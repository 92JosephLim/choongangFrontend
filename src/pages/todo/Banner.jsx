import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerImg_1 from "../../img/BannerImg1.png";
import BannerImg_2 from "../../img/BannerImg2.png";
import BannerImg_3 from "../../img/BannerImg3.png";
import BannerImg_4 from "../../img/BannerImg4.png";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    marginBottom: 5,
  };

  return (
    <div id="bannerSection" className="text-3xl bg-[#FFFFFF]">
      <Slider {...settings}>
        <div className="place-items-center">
          <a
            href="https://www.danojefestival.or.kr/contents.asp?page=537"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={BannerImg_1}
              className="h-80 w-full mt-10 mb-5 bg-[#FFFFFF]"
              alt="Banner 1"
            />
          </a>
        </div>
        <div className="place-items-center">
          <a
            href="https://festival.phcf.or.kr/fireWorks/subMain.do"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={BannerImg_2}
              className="h-80 w-full mt-10 mb-5 bg-[#FFFFFF]"
              alt="Banner 2"
            />
          </a>
        </div>
        <div className="place-items-center">
          <a
            href="http://www.cjdive.kr/2024/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={BannerImg_3}
              className="h-80 w-full mt-10 mb-5 bg-[#FFFFFF]"
              alt="Banner 3"
            />
          </a>
        </div>
        <div className="place-items-center">
          <a
            href="http://www.mimefestival.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={BannerImg_4}
              className="h-80 w-full mt-10 mb-5 bg-[#FFFFFF]"
              alt="Banner 4"
            />
          </a>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
