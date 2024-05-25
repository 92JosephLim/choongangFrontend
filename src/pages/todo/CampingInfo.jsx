/* global kakao */
import React, { useEffect, useState, useCallback } from "react";
import { Map, MarkerClusterer, ZoomControl } from "react-kakao-maps-sdk";
import { getList } from '../../api/CamcokSearchApi';
import MapMarkerWithOverlay from './MapMarkerWithOverlay';

function CampingInfo() {
  const [campingData, setCampingData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getList(1, 3826);
      console.log("Response:", response);
      if (response && response.dtoList && Array.isArray(response.dtoList)) {
        setCampingData(response.dtoList);
      } else {
        console.error('Data is not an array or invalid response:', response);
        setCampingData([]);
      }
    };
    fetchData();
  }, []);

  const handleClusterClick = useCallback((cluster) => {
    const markers = cluster.getMarkers();
    if (markers.length === 0) return;

    const map = cluster.getMap();
    const level = map.getLevel();
    const newCenter = markers.reduce((acc, marker) => {
      return {
        lat: acc.lat + marker.getPosition().getLat(),
        lng: acc.lng + marker.getPosition().getLng()
      };
    }, { lat: 0, lng: 0 });

    newCenter.lat /= markers.length;
    newCenter.lng /= markers.length;

    map.setLevel(level - 1, { anchor: new kakao.maps.LatLng(newCenter.lat, newCenter.lng) });
  }, []);

  return (
    <Map
      center={{ lat: 36.0345423, lng: 128.6142847 }}
      style={{ width: "100%", height: "80vh" }}
      level={10}
    >
      <MarkerClusterer
        averageCenter={true}
        minLevel={10}
        onClusterclick={handleClusterClick}
      >
        {campingData.map((marker, index) => (
          <MapMarkerWithOverlay
            key={marker.contentId}
            marker={marker}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </MarkerClusterer>
      <ZoomControl />
    </Map>
  );
}

export default CampingInfo;
