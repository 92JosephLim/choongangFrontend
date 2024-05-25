import { useEffect, useState } from "react";
import { getList3 } from "../../api/gocamping";
import { ReactComponent as SearchMap } from "../../img/map.svg";
import { Link } from "react-router-dom";

const ListGocampingComponent = () => {
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getList3();
        console.log(data);
        setServerData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.map((gocamping) => (
          <div
            id="contents"
            className="m-5 grid grid-cols-8 ml border-2 rounded-t-xl"
            key={gocamping.tno}
          >
            <Link to={`/read${gocamping.tno}`}>
              <SearchMap />
            </Link>
            <div
              id="searchImage"
              className="col-start-1 col-span-8 text-black bg-[#b9b9ff]"
            >
              <Link to={`/read/${gocamping.tno}`}>
                <img
                  src={gocamping.firstImageUrl}
                  alt="이미지 설명"
                  className="w-full"
                />
              </Link>
            </div>
            <div
              id="campingContents"
              className="col-start-1 col-span-4 grid grid-cols-4 text-black border-y-2 py-3 px-4"
            >
              <span className="col-span-4 text-xs font-medium">
                {gocamping.teindutyl}
              </span>
              <span className="col-span-4 text-base mt-2 font-bold">
                {gocamping.facltNm}
              </span>
            </div>
            <div
              id="campingAddress"
              className="col-start-5 col-span-4 grid grid-cols-4 text-black border-y-2 py-3 px-4"
            >
              <span className="col-span-4 text-xs text-right">
                {gocamping.addr1}
              </span>
              <span className="col-span-4 text-sm mt-2 text-right">
                {gocamping.tel}
              </span>
            </div>
            <div
              id="campingTage"
              className="col-span-8 grid grid-cols-12 text-black p-4"
            >
              <span className="col-span-2 text-xs text-center mb-1 text-gray-400">
                환경
              </span>
              <span className="col-span-10 text-xs mb-1 text-black">환경</span>
              <span className="col-span-2 text-xs text-center text-gray-400">
                태그
              </span>
              <span className="col-span-10 text-xs text-black">환경</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListGocampingComponent;
