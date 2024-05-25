import React, { useState } from "react";
import axios from "axios";
import { ReactComponent as Search } from "../../img/searchmini.svg";
import RegionModal from "../../pages/todo/RegionModal";

const SearchInput = ({ onSearchSubmit }) => {
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log("Input value changed:", event.target.value);
  };

  const searchPage = async (event) => {
    event.preventDefault();
    console.log("Form submitted with input value:", inputValue);

    const formOutput = { facltNm: inputValue };
    try {
      const response = await axios.post('http://localhost:8080/search/searchpage', formOutput, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('POST Success:', response.data);
      onSearchSubmit({ ...formOutput, apiType: "searchout" });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegionSearch = (regionData) => {
    setSelectedRegion(regionData);
    setModal(false);
    onSearchSubmit({ ...regionData, apiType: "region" });
  };

  return (
    <div id="campingSearch" className="text-3xl text-black">
      <div id="searchPageSearch" className="grid grid-cols-10 border-b-2">
        <input
          type="text"
          id="campSearch"
          value={inputValue}
          onChange={handleInputChange}
          className="col-span-9 md:col-span-4 py-2 text-sm text-black text-center border-2 m-3 border-black rounded-xl"
          placeholder="검색"
        />
        <button
          type="submit"
          onClick={searchPage}
          className="md:text-black mr-3 text-base col-span-1"
        >
          <Search className="h-8" />
        </button>
        <span
          id="campingLocal"
          className="col-start-7 col-span-4 m-0 md:col-start-9 md:col-span-2 text-base bg-[#12372A] grid place-items-center text-[#E8DFCA] border-solid ml-8 mr-0.5 my-1.5 rounded-xl"
          onClick={() => setModal(!modal)}
        >
          지역선택
        </span>
      </div>

      {modal && <RegionModal onSearch={handleRegionSearch} />}
    </div>
  );
};

export default SearchInput;
