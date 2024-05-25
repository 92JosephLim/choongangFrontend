import React, { useState } from "react";
import axios from "axios";

const DetailModal = ({ fetchDetailData, handleSubmit }) => {
  const [formData, setFormData] = useState({
    d200: { d_d201: false, d_d202: false, d_d203: false, d_d204: false, d_d205: false, d_d206: false, d_d207: false, d_d208: false },
    d300: { d_d301: false, d_d302: false, d_d303: false, d_d304: false },
    d400: { d_d401: false, d_d402: false, d_d403: false, d_d404: false, d_d405: false },
    d500: { d_d501: false, d_d502: false, d_d503: false, d_d504: false, d_d505: false, d_d506: false, d_d507: false, d_d508: false, d_d509: false, d_d5010: false, d_d5011: false },
    d600: { d_d601: false, d_d602: false, d_d603: false, d_d604: false, d_d605: false, d_d606: false, d_d607: false, d_d608: false, d_d609: false, d_d6010: false, d_d6011: false, d_d6012: false },
    d700: { d_d701: false, d_d702: false, d_d703: false },
  });

  const searchDetailReset = () => {
    setFormData({
      d200: { d_d201: false, d_d202: false, d_d203: false, d_d204: false, d_d205: false, d_d206: false, d_d207: false, d_d208: false },
      d300: { d_d301: false, d_d302: false, d_d303: false, d_d304: false },
      d400: { d_d401: false, d_d402: false, d_d403: false, d_d404: false, d_d405: false },
      d500: { d_d501: false, d_d502: false, d_d503: false, d_d504: false, d_d505: false, d_d506: false, d_d507: false, d_d508: false, d_d509: false, d_d5010: false, d_d5011: false },
      d600: { d_d601: false, d_d602: false, d_d603: false, d_d604: false, d_d605: false, d_d606: false, d_d607: false, d_d608: false, d_d609: false, d_d6010: false, d_d6011: false, d_d6012: false },
      d700: { d_d701: false, d_d702: false, d_d703: false },
    });

    document.getElementById("searchdetailform").reset();
  };

  const searchDetailSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/search/details', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('POST Success:', response.data);
      handleSubmit(formData); // 외부에서 제공된 handleSubmit 호출
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const [group, , key] = id.split("_");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [group]: {
        ...prevFormData[group],
        [`d_${key}`]: checked,
        
      },
    }));
  };

  return (
    <div id="campingDetail" >  
      <form id="searchdetailform" onSubmit={searchDetailSubmit}>
        <div id="campingDetailLocation" className="border-2 grid grid-cols-3 md:grid-cols-5 my-3 mx-3 border-black text-sm  text-black">
          <p className="col-span-3 md:col-span-5 ml-3">입지구분</p>
          {['해변', '섬', '산', '숲', '계곡', '강', '호수', '도심'].map((label, index) => {
            const id = `d200_d_d20${index + 1}`;
            return (
              <div key={id} className="grid grid-cols-3">
                <input id={id} type="checkbox" className="col-span-1 h-3 mx-1 my-2" onChange={handleCheckboxChange} />
                <label htmlFor={id} className="col-span-2 mr-1 text-left">{label}</label>
              </div>
            );
          })}
        </div>
        <div id="campingDetailLocation" className="border-2 grid grid-cols-3 md:grid-cols-5 my-3 mx-3 border-black text-sm  text-black">
          <p className="col-span-3 md:col-span-5 ml-3">주요시설</p>
          {['일반야영장', '글램핑', '카라반', '자동차야영장'].map((label, index) => {
            const id = `d300_d_d30${index + 1}`;
            return (
              <div key={id} className="grid grid-cols-3 last:grid-flow-row">
                <input id={id} type="checkbox" className="col-span-1 h-3 mx-1 my-2" onChange={handleCheckboxChange} />
                <label htmlFor={id} className="mr-1 col-span-2 text-left">{label}</label>
              </div>
            );
          })}
        </div>
        <div id="campingDetailLocation" className="border-2 grid grid-cols-3 md:grid-cols-5 my-3 mx-3 border-black text-sm  text-black">
          <p className="col-span-3 md:col-span-5 ml-3">바닥형태</p>
          {['잔디', '파쇄석', '데크', '자갈', '맨흙'].map((label, index) => {
            const id = `d400_d_d40${index + 1}`;
            return (
              <div key={id} className="grid grid-cols-3">
                <input id={id} type="checkbox" className="col-span-1 h-3 mx-1 my-2" onChange={handleCheckboxChange} />
                <label htmlFor={id} className="col-span-2 mr-1 text-left">{label}</label>
              </div>
            );
          })}
        </div>
        <div id="campingDetailLocation" className="border-2 grid grid-cols-3 md:grid-cols-5 my-3 mx-3 border-black text-sm  text-black">
          <p className="col-span-3 md:col-span-5 ml-3">테마별</p>
          {['일출명소', '일몰명소', '수상레저', '항공레저', '스키', '낚시', '액티비티', '봄꽃여행', '여름물놀이', '단풍명소', '눈꽃명소'].map((label, index) => {
            const id = `d500_d_d50${index + 1}`;
            return (
              <div key={id} className="grid grid-cols-3">
                <input id={id} type="checkbox" className="col-span-1 h-3 mx-1 my-2" onChange={handleCheckboxChange} />
                <label htmlFor={id} className="col-span-2 mr-1 text-left" >{label}</label>
              </div>
            );
          })}
        </div>
        <div id="campingDetailLocation" className="border-2 grid grid-cols-3 md:grid-cols-5 my-3 mx-3 border-black text-sm  text-black">
          <p className="col-span-3 md:col-span-5 ml-3">부대시설</p>
          {['전기', '무선인터넷', '장작판매', '온수', '트렘폴린', '물놀이장', '놀이터', '산책로', '운동장', '운동시설', '편의점', '덤프스테이션'].map((label, index) => {
            const id = `d600_d_d60${index + 1}`;
            return (
              <div key={id} className="grid grid-cols-3">
                <input id={id} type="checkbox" className="col-span-1 h-3 mx-1 my-2" onChange={handleCheckboxChange} />
                <label htmlFor={id} className="col-span-2 mr-1 text-left">{label}</label>
              </div>
            );
          })}
        </div>
        <div id="campingDetailLocation" className="border-2 grid grid-cols-3 md:grid-cols-5 my-3 mx-3 border-black text-sm  text-black">
          {['개인 트레일러 입장가능', '개인 캠핑카 입장가능', '반려동물 동반가능'].map((label, index) => {
            const id = `d700_d_d70${index + 1}`;
            return (
              <div key={id} className="col-span-3 grid grid-cols-3">
                <input id={id} type="checkbox" className="col-span-1 h-3 mx-1 my-2" onChange={handleCheckboxChange} />
                <label htmlFor={id} className="col-span-2  text-left">{label}</label>
              </div>
            );
          })}
        </div>
        <div id="campingDetailSelect" className="grid place-items-center grid-cols-4 my-3 mx-3 text-sm text-black">
          <button type="button" onClick={searchDetailReset} className="col-span-2 border-4 border-black my-2 py-2 md:px-20 px-5 bg-[#12372A] text-[#E8DFCA]">초기화</button>
          <button type="submit" className="col-span-2 border-4 border-black my-2 py-2 md:px-20 px-5 bg-[#12372A] text-[#E8DFCA]">보내기</button>
        </div>
      </form>
    </div>
  );
}

export default DetailModal;
