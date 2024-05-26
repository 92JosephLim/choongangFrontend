import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  region,
  searchout,
  getList,
  details,
  beach,
  downtown,
  forest,
  island,
  lake,
  mountain,
  river,
  valley,
} from "../../api/CamcokSearchApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import DetailedSearch from "../../pages/todo/DetailedSearch";
import DetailModal from "../../pages/todo/DetailModal";
import "intersection-observer";
import SearchInput from "./SearchInput";

const initState = {
  dtoList: [],
  totalCount: 0,
};

const fetchFunctions = {
  getList,
  beach,
  downtown,
  forest,
  island,
  lake,
  mountain,
  river,
  valley,
  details,
  searchout,
  region,
};

const ListComponent = ({ fetchFunctionName, setFetchFunctionName }) => {
  const [modal2, setModal2] = useState(false);
  const { size, refresh, moveToList, moveToRead } = useCustomMove();
  const location = useLocation();
  const [formData, setFormData] = useState(null); // formData 상태 추가
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const [currentFetchFunctionName, setCurrentFetchFunctionName] = useState(
    () => {
      return (
        fetchFunctionName ||
        localStorage.getItem("fetchFunctionName") ||
        "getList"
      );
    }
  );
  const [resetPage, setResetPage] = useState(false);

  // 이미지 클릭 시 실행될 함수

  const PAGE_SIZE = 10;

  const fetchItems = async ({ pageParam = 1 }) => {
    const fetchFunction = fetchFunctions[currentFetchFunctionName];
    const res = await fetchFunction(pageParam, PAGE_SIZE, formData);
    return res;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    remove,
  } = useInfiniteQuery(
    ["items", currentFetchFunctionName, formData],
    fetchItems,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.totalCount > lastPage.pageRequestDTO.page * PAGE_SIZE) {
          return lastPage.pageRequestDTO.page + 1;
        } else {
          return undefined;
        }
      },
      keepPreviousData: true,
    }
  );

  const items = data?.pages.flatMap((page) => page.dtoList) || [];

  useEffect(() => {
    const fetchFunctionName = new URLSearchParams(location.search).get(
      "fetchFunctionName"
    );
    if (fetchFunctionName) {
      setCurrentFetchFunctionName(fetchFunctionName);
      setFetchFunctionName(fetchFunctionName); // 부모 컴포넌트의 상태도 업데이트
      localStorage.setItem("fetchFunctionName", fetchFunctionName);
      setResetPage(true);
    }
  }, [location.search, setFetchFunctionName]);

  useEffect(() => {
    if (resetPage) {
      remove();
      refetch();
      setResetPage(false);
      setFetching(false);
    }
  }, [resetPage, refetch, remove]);

  useEffect(() => {
    if (formData) {
      refetch();
    }
  }, [formData, refetch]);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentFetchFunctionName("details");
    setResetPage(true);
  };

  const handleFormSubmit2 = (data) => {
    setFormData(data);
    setCurrentFetchFunctionName(data.apiType); // apiType에 따라 호출
    setResetPage(true);
  };

  return (
    <div>
      {fetching && <FetchingModal />}
      <SearchInput onSearchSubmit={handleFormSubmit2} />

      <DetailedSearch
        fetchBeachData={() => setCurrentFetchFunctionName("beach")}
        fetchIslandData={() => setCurrentFetchFunctionName("island")}
        fetchMountainData={() => setCurrentFetchFunctionName("mountain")}
        fetchForestData={() => setCurrentFetchFunctionName("forest")}
        fetchValleyData={() => setCurrentFetchFunctionName("valley")}
        fetchRiverData={() => setCurrentFetchFunctionName("river")}
        fetchLakeData={() => setCurrentFetchFunctionName("lake")}
        fetchDowntownData={() => setCurrentFetchFunctionName("downtown")}
      />
      {modal2 && <DetailModal handleSubmit={handleFormSubmit} />}
      <p
        className="md: bg-[#12372A] text-[#E8DFCA] text-2xl grid place-items-center border-solid col-span-4 my-2 py-2"
        onClick={() => {
          setModal2(!modal2);
        }}
      >
        상세검색
      </p>
      <div
        id="sequence"
        className="grid grid-cols-8 py-3 px-5 text-sm font-bold"
      >
        <span className="text-left col-start-1 col-span-4 text-xl text-black">
          총 {data?.pages[0]?.totalCount || 0} 개
        </span>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>마지막 부분</b>
          </p>
        }
        scrollThreshold={0.8}
      >
        {data &&
          data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.dtoList.map((dataEntity, itemIndex) => (
                <div key={`${dataEntity.contentId}-${itemIndex}`}>
                  <div id="searchSection" className="bg-white mt-5">
                    <div
                      id="contents"
                      className="m-5 grid grid-cols-8 ml border-2 rounded-t-xl"
                    >
                      <div
                        id="searchImage"
                        className="col-start-1 col-span-8 text-black bg-[#b9b9ff]"
                      >
                        <Link
                          to={`/read/${dataEntity.contentId}`}
                          className="w-full block"
                        >
                          <img
                            src={dataEntity.firstImageUrl}
                            className="w-full"
                            alt={dataEntity.facltNm}
                          />
                        </Link>
                      </div>
                      <div
                        id="campingContents"
                        className="col-start-1 col-span-4 grid grid-cols-4 text-black border-y-2 py-3 px-4"
                      >
                        <span className="col-span-4 text-xs font-medium">
                          {dataEntity.gnrlSiteCo > 0 &&
                            ` 일반야영장(${dataEntity.gnrlSiteCo}) `}
                          {dataEntity.autoSiteCo > 0 &&
                            ` 자동차야영장(${dataEntity.autoSiteCo}) `}
                          {dataEntity.glampSiteCo > 0 &&
                            ` 글램핑(${dataEntity.glampSiteCo}) `}
                          {dataEntity.caravSiteCo > 0 &&
                            ` 카라반(${dataEntity.caravSiteCo})`}
                        </span>
                        <span className="col-span-4 text-base mt-2 font-bold">
                          {dataEntity.facltNm}
                        </span>
                      </div>
                      <div
                        id="campingAddress"
                        className="col-start-5 col-span-4 grid grid-cols-4 text-black border-y-2 py-3 px-4"
                      >
                        <span className="col-span-4 text-xs text-right">
                          {dataEntity.addr1 && `${dataEntity.addr1} `}
                          {dataEntity.addr2 && `${dataEntity.addr2}`}
                        </span>
                        <span className="col-span-4 text-sm mt-2 text-right">
                          {dataEntity.tel}
                        </span>
                      </div>
                      <div
                        id="campingTage"
                        className="col-span-8 grid grid-cols-12 text-black p-4"
                      >
                        <span className="col-span-2 text-xs text-center mb-1 text-gray-400">
                          환경
                        </span>
                        <span className="col-span-10 text-xs mb-1 text-black">
                          {dataEntity.lctCl}
                        </span>
                        <span className="col-span-2 text-xs text-center text-gray-400">
                          태그
                        </span>
                        <span className="col-span-10 text-xs text-black">
                          {dataEntity.themaEnvrnCl}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default ListComponent;
