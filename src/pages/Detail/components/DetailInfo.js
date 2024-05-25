import React, { useEffect, useState } from "react";

import WcIcon from "@mui/icons-material/Wc";
import ShowerIcon from "@mui/icons-material/Shower";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import PetsIcon from "@mui/icons-material/Pets";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CampingFeatureIcons from "./CampingFeatureIcons ";

function DetailInfo({ gocamping }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(gocamping);
  }, [gocamping]);

  const Section = ({ title, children }) => (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );

  const SiteInfoItem = ({ type, count }) =>
    count > 0 && (
      <li>
        {type} : {count} 평
      </li>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {data.intro && (
          <Section title="캠핑장 소개">
            <p>{data.intro}</p>
          </Section>
        )}
        {data.glampSiteCo > 0 && (
          <Section title="글램핑 정보">
            사이트 개수 : {data.glampSiteCo}
          </Section>
        )}
        {data.caravSiteCo + data.indvdlCaravSiteCo > 0 && (
          <Section title="카라반 정보">
            <p>
              사이트 개수 : {data.caravSiteCo} 개 <br />
              개인 카라반 : {data.indvdlCaravSiteCo} 개
            </p>
          </Section>
        )}
        {data.gnrlSiteCo > 0 && (
          <Section title="일반야영장 정보">
            사이트 개수 : {data.gnrlSiteCo}
          </Section>
        )}
        {data.siteBottomCl1 +
          data.siteBottomCl2 +
          data.siteBottomCl3 +
          data.siteBottomCl4 +
          data.siteBottomCl5 >
          0 && (
          <Section title="사이트 정보">
            <ul>
              <SiteInfoItem type="잔디" count={data.siteBottomCl1} />
              <SiteInfoItem type="파쇄석" count={data.siteBottomCl2} />
              <SiteInfoItem type="테크" count={data.siteBottomCl3} />
              <SiteInfoItem type="자갈" count={data.siteBottomCl4} />
              <SiteInfoItem type="맨흙" count={data.siteBottomCl5} />
            </ul>
          </Section>
        )}
      </div>

      {data.eqpmnLendCl && data.eqpmnLendCl !== "" && (
        <Section title="캠핑 장비 대여 품목">
          <CampingFeatureIcons data={data.eqpmnLendCl} />
        </Section>
      )}
      {data.posblFcltyCl && data.posblFcltyCl !== "" && (
        <Section title="주변 이용 가능 시설">
          <CampingFeatureIcons data={data.posblFcltyCl} />
        </Section>
      )}

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">기타 정보</h1>
        {data.자동차야영장사이트 && data.자동차야영장사이트 !== 0 && (
          <Section title={`자동차야영장 사이트(${data.자동차야영장사이트}면)`}>
            <p>개인 트레일러 입장 가능</p>
          </Section>
        )}

        <Section>
          {data.operDeCl && data.operDeCl !== 0 && (
            <h2 className="text-lg font-semibold mb-2">
              운영 요일 : {data.operDeCl}
            </h2>
          )}
          {data.operPdCl && data.operPdCl !== 0 && (
            <CampingFeatureIcons data={data.operPdCl} />
          )}
        </Section>

        <Section className="flex flex-wrap items-center gap-4">
          <div className="grid grid-cols-2 justify-center gap-4">
            {data.toiletCo && data.toiletCo !== 0 && (
              <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                <p>🚽</p>
                <div className="flex items-center gap-2 justify-center">
                  <WcIcon /> <p>{data.toiletCo}개</p>
                </div>
              </div>
            )}
            {data.wtrplCo && data.wtrplCo !== 0 && (
              <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                <p>🚰</p>
                <div className="flex items-center gap-2 justify-center">
                  <WaterDropIcon />
                  <p>{data.wtrplCo}개</p>
                </div>
              </div>
            )}
            {data.swrmCo && data.swrmCo !== 0 && (
              <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                <p>🚿</p>
                <div className="flex items-center gap-2 justify-center">
                  <ShowerIcon /> <p>{data.swrmCo}개</p>
                </div>
              </div>
            )}
            {data.brazierCl && data.brazierCl !== 0 && (
              <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                <p>화로대</p>
                <div className="flex items-center gap-2 justify-center">
                  <FireplaceIcon /> <p>{data.brazierCl}</p>
                </div>
              </div>
            )}
            {data.animalCmgCl && (
              <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                <p>애견</p>
                <div className="flex items-center gap-2 justify-center">
                  <PetsIcon />
                  <p>
                    {data.animalCmgCl === "가능" && " 가능"}
                    {data.animalCmgCl === "불가능" && " 불가능"}
                    {data.animalCmgCl === "가능(소형견)" && "소형견 가능"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}

export default DetailInfo;
