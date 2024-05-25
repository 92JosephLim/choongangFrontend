import { useEffect, useState } from "react";
import { getOne3 } from "../../api/gocamping";
import useCustomMove from "../../hooks/useCustomMove";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import React from "react";
import CopyButton from "../../pages/Detail/components/CopyButton";
import IconGrid from "../../pages/Detail/components/IconGrid";
import CampingFeatureIcons from "../../pages/Detail/components/CampingFeatureIcons ";
import DetailTab from "../../pages/Detail/components/DetailTab";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
};

const initState = {
  tno: 0,
  facltNm: "",
  addr1: "",
  lineIntro: "",
  intro: "",
  tel: "",
  featureNm: "",
  teindutyl: "",
  lctCl: "",
  homepage: "",
  resveUrl: "",
  firstImageUrl: "",
  sbrsCl: "",
  mapX: "",
  mapY: "",
  animalCmgCl: "",
  autoSiteCO: "", //주요시설 자동차야영장
  brazierCl: "", //화로대
  caravSiteCo: "", //주요시설 카라반
  eqpmnLendCl: "", //캠핑장비대여
  glampSiteCo: "", //주요시설 글램핑
  gnrlSiteCo: "", //주요시설 일반야영장
  manageNmpr: "", //상주관리인원
  toiletCo: "", //화장실 개수
  trlerAcmpnyAt: "", //개인 트레일러 동반 여부(Y:사용, N:미사용)
  wtrplCo: "", //개수대 개수
  sitedStnc: "", //사이트간 거리 필요?
  operDeCl: "", //평일+주말
  operPdCl: "", //봄,여름,가을
  posblFcltyCl: "",
};

const ReadComponent2 = ({ tno }) => {
  const [gocamping, setGocamping] = useState(initState); //아직 todo는 사용하지 않음
  const navigate = useNavigate();
  const { moveToList, moveToModify } = useCustomMove();
  const { contentId } = useParams();

  //useEffect(이펙트 함수, 배열)
  useEffect(() => {
    const fetchData = async () => {
      const data = await getOne3(tno); // id를 사용하여 데이터를 가져옴
      setGocamping(data);
    };

    fetchData();
  }, [tno]);
  const currentUrl = window.location.href;

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4 relative">
      <div className="absolute top-0 left-0 m-4 flex items-center space-x-2 ">
        <button
          onClick={() => navigate(-1)}
          className=" bg-opacity-50 text-white px-3 py-2 rounded ml-4"
          style={{ zIndex: 10 }}
        >
          <svg
            viewBox="0 0 24 24"
            height="30px"
            width="30px"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
            className="icon-svg"
          >
            <path d="M0 0h24v24H0V0z" fill="none" opacity=".87"></path>
            <path
              d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"
              fill="white"
            ></path>
          </svg>
        </button>
        <span
          className=" bg-opacity-50 text-white px-3 py-2 rounded"
          style={{ zIndex: 10 }}
        >
          {gocamping.facltNm}
        </span>
      </div>
      <div className="absolute top-0 right-0 m-4 " style={{ zIndex: 10 }}>
        <CopyButton currentUrl={currentUrl} />
      </div>
      <style>
        {`
          @keyframes zoomInOut {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }

          .zoom-animation {
            animation: zoomInOut 10s ease-in-out infinite;
          }
        `}
      </style>
      <div className="container mx-auto px-4 flex justify-center items-center ">
        <div className="w-[600px] h-[350px] overflow-hidden flex justify-center items-center">
          <img
            src={gocamping.firstImageUrl}
            alt="Zooming"
            className="zoom-animation w-full h-full object-cover"
          />
        </div>
      </div>
      <Box className="panel-box" sx={{ textAlign: "left" }}>
        <Box className="flex flex-row w-full">
          <Box className="flex flex-col flex-1">
            <Box>
              <Box className="text-sm text-primary mt-2 mb-2">
                <span className="point-split ">{gocamping.teindutyl}</span>
              </Box>
            </Box>
            <Typography
              variant="h5"
              className="text-2xl font-medium truncate "
              sx={{ color: "blue" }}
            >
              {gocamping.facltNm}
            </Typography>

            <Box className="text-base flex flex-row items-center text-gray-500">
              <span className="point-split">{gocamping.lineIntro}</span>
            </Box>
          </Box>
        </Box>
      </Box>
      <IconGrid
        homepage={gocamping.homepage}
        tel={gocamping.tel}
        resveUrl={gocamping.resveUrl}
        addr1={gocamping.addr1}
      />
      {gocamping.sbrsCl !== "" && (
        <>
          <h1 className="mt-5">시설</h1>
          <CampingFeatureIcons data={gocamping.sbrsCl} />
        </>
      )}

      <DetailTab gocamping={gocamping} />
    </div>
  );
};

export default ReadComponent2;
