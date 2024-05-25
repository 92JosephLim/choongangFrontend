import { useCallback } from "react";
import {
  useNavigate,
  useParams,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";

import ReadComponent2 from "../../components/todo/ReadComponent2";

import BasicLayout from "../../layouts/BasicLayout";

const ReadPage = (props) => {
  // function ReadPage(props) {
  const { tno } = useParams();

  const navigate = useNavigate();

  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  const queryStr = createSearchParams({ page, size }).toString();

  const moveToModify = useCallback(
    (tno) => {
      navigate({
        pathname: `/todo/modify/${tno}`,
        search: queryStr,
      });
    },
    [tno, page, size]
  );

  const moveToList = useCallback(() => {
    navigate({
      pathname: `/todo/list`,
      search: queryStr,
    });
  }, [page, size]);
  // 변경 -------------------------
  return (
    <div className="text-xl font-extrabold text-center text-neutral-900 bg-white  w-full pt-5  mt-4">
      {/* bg-white */}

      <BasicLayout>
        <ReadComponent2 tno={tno}> </ReadComponent2>
      </BasicLayout>
    </div>
  );
};
export default ReadPage;
