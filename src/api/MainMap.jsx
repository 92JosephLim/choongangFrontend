import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer,
} from "react-kakao-maps-sdk";

export const API_SERVER_LIST =
  "http://apis.data.go.kr/B551011/GoCamping/locationBasedList";
export const SERVER_KEY =
  "U2v8FkBtZre3faTP2NxqCqGArEkkO%2FvbnC7DDbFYtQPe0TpytXrzQywGbyZc9AgNXDrskylfErU4EddyuXAuKg%3D%3D";

function CampingInfo1() {
  const [campingData, setCampingData] = useState([]);

  useEffect(() => {
    const fetchCampingData = async () => {
      try {
        const response = await axios.get(API_SERVER_LIST, {
          params: {
            serviceKey: decodeURIComponent(SERVER_KEY),
            numOfRows: 2,
            pageNo: 1,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            mapX: 128.6580419,
            mapY: 36.0485005,
            radius: 50000000,
            _type: "json",
          },
        });
        setCampingData(response.data.response.body.items.item);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchCampingData();
  }, []);

  return <MainMap campingData={campingData} />;
}

function MainMap({ campingData }) {
  console.log(campingData);
  const mapRef = useRef();
  const [openIndex, setOpenIndex] = useState(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setPositions(campingData); // 배열을 다시 감싸지 않음
  }, [campingData]); // campingData가 변경될 때마다 실행

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 36.2683,
        lng: 127.6358,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
      }}
      level={14} // 지도의 확대 레벨
      ref={mapRef}
    >
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={10} // 클러스터 할 최소 지도 레벨
        disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        // 마커 클러스터러에 클릭이벤트를 등록합니다
        // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
        // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
        onClusterclick={onClusterclick}
      >
        {positions.map((pos) => (
          <MapMarker
            key={`${pos.mapY}-${pos.mapX}`}
            position={{
              lat: pos.mapY,
              lng: pos.mapX,
            }}
          />
        ))}
      </MarkerClusterer>
    </Map>
  );
}

export default CampingInfo1;
