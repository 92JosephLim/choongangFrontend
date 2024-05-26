import { ReactComponent as Home } from "../../img/home.svg";


const DetailedSearch = ({
  fetchBeachData,
  fetchIslandData,
  fetchMountainData,
  fetchForestData,
  fetchValleyData,
  fetchRiverData,
  fetchLakeData,
  fetchDowntownData,
}) => {
  return (
    <>
      <div id="DetailedSearch" className="grid grid-cols-4">
        <a href="#" onClick={fetchBeachData} className="m-auto">
          <Home className="ml-1" />
        </a>
        <a href="#" onClick={fetchIslandData} className="m-auto">
          <Home className="ml-1" />
        </a>
        <a href="#" onClick={fetchMountainData} className="m-auto">
          <Home className="ml-1" />
        </a>
        <a href="#" onClick={fetchForestData} className="m-auto">
          <Home className="ml-1" />
        </a>
        <a href="#" onClick={fetchValleyData} className="m-auto">
          <Home className="ml-1" />
        </a>
        <a href="#" onClick={fetchRiverData} className="m-auto">
          <Home className="ml-1" />
        </a>
        <a href="#" onClick={fetchLakeData} className="m-auto">
          <Home className="ml-1" />
        </a>
        <a href="#" onClick={fetchDowntownData} className="m-auto">
          <Home className="ml-1" />
        </a>
      </div>
    </>
  );
};

export default DetailedSearch;
