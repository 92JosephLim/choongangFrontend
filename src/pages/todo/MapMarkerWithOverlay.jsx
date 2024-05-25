import React, { useState, useEffect, useCallback, useRef } from "react";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

function MapMarkerWithOverlay({ marker, index, openIndex, setOpenIndex }) {
  const overlayRef = useRef(null);

  const onMarkerClick = useCallback(() => {
    console.log("Marker clicked:", marker.facltNm);
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  }, [index, marker.facltNm, setOpenIndex]);

  useEffect(() => {
    if (openIndex === index && overlayRef.current) {
      console.log("Overlay should be visible for:", marker.facltNm);
      overlayRef.current.style.display = "block";
      overlayRef.current.style.position = "absolute";
      overlayRef.current.style.zIndex = 1000;
      overlayRef.current.style.backgroundColor = "white";
    } else if (overlayRef.current) {
      overlayRef.current.style.display = "none";
    }
  }, [openIndex, index, marker.facltNm]);

  return (
    <>
      <MapMarker
        position={{
          lat: parseFloat(marker.mapY),
          lng: parseFloat(marker.mapX),
        }}
        onClick={onMarkerClick}
        image={{
          src: `${process.env.PUBLIC_URL}/img/camPing.png`,
          size: { width: 50, height: 50 },
          options: { offset: { x: 25, y: 50 } },
        }}
      />
      <CustomOverlayMap
        key={`overlay-${marker.contentId}`}
        position={{
          lat: parseFloat(marker.mapY),
          lng: parseFloat(marker.mapX),
        }}
        yAnchor={1.2}
        zIndex={1000}
        clickable={true}
      >
        <div
          ref={overlayRef}
          id={`overlay-${marker.contentId}`}
          className="wrap bg-white border border-black p-2 max-w-sm mx-auto rounded-lg shadow-lg text-black"
          style={{
            display: "none",
            position: "absolute",
            zIndex: 1000,
            backgroundColor: "white",
          }}
        >
          <div className="info">
            <div className="title flex justify-between items-center">
              <span>{marker.facltNm}</span>
              <button
                onClick={() => setOpenIndex(null)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "red",
                }}
              >
                X
              </button>
            </div>
            <div className="body">
              <img
                src={
                  marker.firstImageUrl ||
                  `${process.env.PUBLIC_URL}/img/default_image.png`
                }
                alt={marker.facltNm}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="desc">
                <p>{marker.induty}</p>
                <p>{marker.addr1}</p>
                <a href={marker.homepage} target="_blank" rel="noreferrer">
                  홈페이지
                </a>
              </div>
            </div>
          </div>
        </div>
      </CustomOverlayMap>
    </>
  );
}

export default MapMarkerWithOverlay;
