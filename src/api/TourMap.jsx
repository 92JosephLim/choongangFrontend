import axios from "axios";
import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { touristData } from "./전국관광지정보표준데이터";

function TourInfo({ gocamping }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(touristData);
  }, []);
  return <KakaoMap data={data} gocamping={gocamping} />;
}

function KakaoMap({ data, gocamping }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [isCurrentLocationOpen, setIsCurrentLocationOpen] = useState(false);

  return (
    <>
      <Map
        id="map"
        center={{
          lat: gocamping.mapY, // 위도
          lng: gocamping.mapX, // 경도
        }}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={10}
      >
        <MapMarker
          position={{ lat: gocamping.mapY, lng: gocamping.mapX }}
          image={{
            src: `${process.env.PUBLIC_URL}/img/camPing.png`, // 현재 위치를 나타내는 이미지
            size: {
              width: 40,
              height: 40,
            },
            options: {
              offset: {
                x: 20,
                y: 40,
              },
            },
          }}
          onClick={() => setIsCurrentLocationOpen(!isCurrentLocationOpen)}
        />
        {isCurrentLocationOpen && (
          <CustomOverlayMap
            position={{ lat: gocamping.mapY, lng: gocamping.mapX }}
          >
            <div className="wrap bg-white border border-black p-2 max-w-sm mx-auto rounded-lg shadow-l w-[500px]">
              <div className="info">
                <div className="title flex justify-between items-center">
                  <div className="flex items-center">
                    <span>{gocamping.facltNm}</span>
                  </div>
                  <div
                    className="close cursor-pointer"
                    onClick={() => setIsCurrentLocationOpen(false)}
                    title="닫기"
                  >
                    X
                  </div>
                </div>
                <div className="body">
                  <div className="img">
                    <img
                      src={gocamping.firstImageUrl}
                      width="100%"
                      height="60"
                      alt={gocamping.title}
                    />
                  </div>
                  <div className="desc">
                    <div className="ellipsis">{gocamping.induty}</div>
                    <div className="jibun ellipsis flex items-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/locationPing.png`}
                        alt="Location"
                        style={{ width: 20, height: 20 }}
                      />
                      <span>{gocamping.addr1}</span>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/img/home.png`}
                        alt="Homepage"
                        style={{ width: 20, height: 20 }}
                      />
                      <a
                        href={gocamping.homepage}
                        target="_blank"
                        className="link"
                        rel="noreferrer"
                      >
                        홈페이지
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        )}
        {data &&
          data.map((marker, index) => (
            <React.Fragment key={marker.contentId}>
              <MapMarker
                position={{ lat: marker.위도, lng: marker.경도 }}
                onClick={() => setOpenIndex(index)}
                image={{
                  src: `${process.env.PUBLIC_URL}/img/tourPing.png`,
                  size: {
                    width: 50,
                    height: 50,
                  },
                  options: {
                    offset: {
                      x: 27,
                      y: 69,
                    },
                  },
                }}
              />
              {openIndex === index && (
                <CustomOverlayMap
                  position={{ lat: marker.위도, lng: marker.경도 }}
                >
                  <div className="wrap bg-white border border-black p-2 max-w-sm mx-auto rounded-lg shadow-l w-[600px]">
                    <div className="info">
                      <div className="title flex justify-between items-center">
                        {marker.관광지명}
                        <div
                          className="close cursor-pointer"
                          onClick={() => setOpenIndex(null)}
                          title="닫기"
                        >
                          X
                        </div>
                      </div>
                      <div className="body">
                        <div className="desc">
                          <div className="ellipsis jibun flex items-center">
                            {marker.관광지구분}
                          </div>
                          <div className="jibun ellipsis flex items-center">
                            <img
                              src={`${process.env.PUBLIC_URL}/img/locationPing.png`}
                              alt="Location"
                              style={{ width: 20, height: 20 }}
                            />
                            <span>
                              {marker.소재지도로명주소 || marker.소재지지번주소}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CustomOverlayMap>
              )}
            </React.Fragment>
          ))}
      </Map>
    </>
  );
}

export default TourInfo;
