import { Link } from "react-router-dom";
import { ReactComponent as Home } from "../../img/home.svg";
import { ReactComponent as SearchMap } from "../../img/map.svg";
import { ReactComponent as Search } from "../../img/search.svg";

const BasicFooter = () => {
  return (
    <nav id="camFooter" className="grid grid-cols-8 ">
      <div className="col-start-1 col-span-8 bg-[#12372A]">
        <ul className="grid grid-cols-7 p-2">
          <li className="col-start-2 col-span-1 flex justify-center">
            <Link to={"/search"}>
              <Search />
            </Link>
          </li>
          <li className="col-start-4 col-span-1 flex justify-center">
            <Link to={"/"}>
              <Home />
            </Link>
          </li>
          <li className="col-start-6 col-span-1 flex justify-center">
            <Link to={"/mappage"}>
              <SearchMap />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BasicFooter;
