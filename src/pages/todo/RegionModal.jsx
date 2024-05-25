import React, { useState } from "react";
import axios from "axios";

const RegionModal = ({ onSearch }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState(null);
  const [savedRegion, setSavedRegion] = useState(null);
  const [savedSubRegion, setSavedSubRegion] = useState(null);

  const regions = [
    {
      name: "강원",
      subRegions: [
        "강릉시",
        "고성군",
        "동해시",
        "삼척시",
        "속초시",
        "양구군",
        "양양군",
        "영월군",
        "원주시",
        "인제군",
        "정선군",
        "철원군",
        "춘천시",
        "태백시",
        "평창군",
        "홍천군",
        "화천군",
      ],
    },
    {
      name: "경기",
      subRegions: [
        "가평군",
        "고양시",
        "과천시",
        "광명시",
        "광주시",
        "구리시",
        "군포시",
        "김포시",
        "남양주시",
        "동두천시",
        "부천시",
        "성남시",
        "수원시",
        "시흥시",
        "안산시",
        "안성시",
        "안양시",
        "양주시",
        "양평군",
        "여주시",
        "연천군",
        "오산시",
        "용인시",
        "의왕시",
        "의정부시",
        "이천시",
        "파주시",
        "평택시",
        "포천시",
        "하남시",
        "화성시",
      ],
    },
    {
      name: "경남",
      subRegions: [
        "거제시",
        "거창군",
        "고성군",
        "김해시",
        "남해군",
        "밀양시",
        "사천시",
        "산청군",
        "양산시",
        "의령군",
        "진주시",
        "창녕군",
        "창원시",
        "통영시",
        "하동군",
        "함안군",
        "함양군",
        "합천군",
      ],
    },
    {
      name: "경북",
      subRegions: [
        "경산시",
        "경주시",
        "고령군",
        "구미시",
        "군위군",
        "김천시",
        "문경시",
        "봉화군",
        "상주시",
        "성주군",
        "안동시",
        "영덕군",
        "영양군",
        "영주시",
        "영천시",
        "예천군",
        "울릉군",
        "울진군",
        "의성군",
        "청도군",
        "청송군",
        "칠곡군",
        "포항시",
      ],
    },
    { name: "광주", subRegions: ["광산구", "남구", "동구", "북구", "서구"] },
    {
      name: "대구",
      subRegions: [
        "남구",
        "달서구",
        "달성군",
        "동구",
        "북구",
        "서구",
        "수성구",
        "중구",
        "군위군",
      ],
    },
    { name: "대전", subRegions: ["대덕구", "동구", "서구", "유성구", "중구"] },
    {
      name: "부산",
      subRegions: [
        "강서구",
        "금정구",
        "기장군",
        "남구",
        "동구",
        "동래구",
        "부산진구",
        "북구",
        "사상구",
        "사하구",
        "서구",
        "수영구",
        "연제구",
        "영도구",
        "중구",
        "해운대구",
      ],
    },
    {
      name: "서울",
      subRegions: [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "관악구",
        "광진구",
        "구로구",
        "금천구",
        "노원구",
        "도봉구",
        "동대문구",
        "동작구",
        "마포구",
        "서대문구",
        "서초구",
        "성동구",
        "성북구",
        "송파구",
        "양천구",
        "영등포구",
        "용산구",
        "은평구",
        "종로구",
        "중구",
        "중랑구",
      ],
    },
    { name: "세종", subRegions: [""] },
    { name: "울산", subRegions: ["남구", "동구", "북구", "울주군", "중구"] },
    {
      name: "인천",
      subRegions: [
        "강화군",
        "계양구",
        "남동구",
        "동구",
        "미추홀구",
        "부평구",
        "서구",
        "연수구",
        "옹진군",
        "중구",
      ],
    },
    {
      name: "전남",
      subRegions: [
        "강진군",
        "고흥군",
        "곡성군",
        "광양시",
        "구례군",
        "나주시",
        "담양군",
        "목포시",
        "무안군",
        "보성군",
        "순천시",
        "신안군",
        "여수시",
        "영광군",
        "영암군",
        "완도군",
        "장성군",
        "장흥군",
        "진도군",
        "함평군",
        "해남군",
        "화순군",
      ],
    },
    {
      name: "전북",
      subRegions: [
        "고창군",
        "군산시",
        "김제시",
        "남원시",
        "무주군",
        "부안군",
        "순창군",
        "완주군",
        "익산시",
        "임실군",
        "장수군",
        "전주시",
        "정읍시",
        "진안군",
      ],
    },
    { name: "제주", subRegions: ["서귀포시", "제주시"] },
    {
      name: "충남",
      subRegions: [
        "계룡시",
        "공주시",
        "금산군",
        "논산시",
        "당진시",
        "보령시",
        "부여군",
        "서산시",
        "서천군",
        "아산시",
        "예산군",
        "천안시",
        "청양군",
        "태안군",
        "홍성군",
      ],
    },
    {
      name: "충북",
      subRegions: [
        "괴산군",
        "단양군",
        "보은군",
        "영동군",
        "옥천군",
        "음성군",
        "제천시",
        "증평군",
        "진천군",
        "청주시",
        "충주시",
      ],
    },
  ];

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedSubRegion(null);
    setSavedRegion(region.name); // 선택된 지역 이름을 저장
    setSavedSubRegion(null);
  };

  const handleSubRegionClick = (subRegion) => {
    setSelectedSubRegion(subRegion);
    if (selectedRegion) {
      setSavedRegion(selectedRegion.name);
      setSavedSubRegion(subRegion); // 선택된 하위 지역 이름을 저장
    }
  };

  const handleSearchClick = () => {
    if (savedRegion && savedSubRegion) {
      const data = { doNm: savedRegion, sigunguNm: savedSubRegion };
      axios
        .post("http://localhost:8080/search/regionPage", data)
        .then((response) => {
          console.log(response.data);
          onSearch(data); // 선택된 지역 정보를 전달
        })
        .catch((error) => {
          console.error("There was an error sending the data!", error);
        });
    } else if (savedRegion) {
      const data = { doNm: savedRegion, sigunguNm: "" };
      axios
        .post("http://localhost:8080/search/regionPage", data)
        .then((response) => {
          console.log(response.data);
          onSearch(data); // 선택된 지역 정보를 전달
        })
        .catch((error) => {
          console.error("There was an error sending the data!", error);
        });
    }
  };

  return (
    <div id="CampingLocalSearch" className="grid grid-cols-4">
      <div
        id="CampingLocalSelect"
        className="text-sm col-start-1 col-span-1 bg-[#E8DFCA] md:text-2xl p-4"
      >
        <div className="list-none text-center leading-relaxed">
          {regions.map((region) => (
            <button
              key={region.name}
              className={`px-1 m-1 ${
                region === selectedRegion ? "bg-[#F5EFE6]" : ""
              }`}
              onClick={() => handleRegionClick(region)}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>
      <div
        id="CampingLocalDetailSelect"
        className="text-center grid grid-cols-3 col-span-3"
      >
        <div className="list-none col-span-3 grid grid-cols-3 bg-[#F5EFE6] text-xl">
          <div className="col-span-3"></div>
          {selectedRegion &&
            selectedRegion.subRegions.map((subRegion, index) => (
              <button
                key={index}
                className={`col-span-1 p-2 h-10 ${
                  subRegion === selectedSubRegion
                    ? "bg-[#12372A] text-[#E8DFCA]"
                    : ""
                }`}
                onClick={() => handleSubRegionClick(subRegion)}
              >
                {subRegion}
              </button>
            ))}
        </div>
      </div>
      <div
        id="CampingSelect"
        className="grid grid-cols-4 col-span-4 bg-[#F5EFE6]"
      >
        <div
          id="Localinit"
          className="col-span-2 text-xl bg-[#12372A] grid place-items-center text-[#E8DFCA] border-solid ml-2 mr-1 my-1.5 rounded-l"
          onClick={() => {
            setSelectedRegion(null);
            setSelectedSubRegion(null);
            setSavedRegion(null);
            setSavedSubRegion(null);
          }}
        >
          초기화
        </div>
        <div
          id="Localinit"
          className="col-span-2 text-xl bg-[#12372A] grid place-items-center text-[#E8DFCA] border-solid ml-1 mr-2 my-1.5 rounded-l"
          onClick={handleSearchClick}
        >
          선택
        </div>
      </div>
    </div>
  );
};

export default RegionModal;
