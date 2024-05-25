import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));

const Search = lazy(() => import("../pages/SearchPage"));
const MapPage = lazy(() => import("../pages/MapPage"));
const GocampingRead = lazy(() => import("../pages/todo/ReadPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },

  {
    path: "mappage",
    element: (
      <Suspense fallback={Loading}>
        <MapPage />
      </Suspense>
    ),
  },
  {
    path: "search",
    element: <Outlet />, // Outlet을 사용하여 중첩 라우트를 처리
    children: [
      {
        path: "",
        element: <Navigate replace to="list" />,
      },
      {
        path: "list",
        element: (
          <Suspense fallback={Loading}>
            <Search />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "read/:tno",
    element: (
      <Suspense fallback={Loading}>
        <GocampingRead />
      </Suspense>
    ),
  },
]);

export default root;
