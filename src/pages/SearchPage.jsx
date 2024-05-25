import BasicLayout from "../layouts/BasicLayout";

import { useState } from "react";

import ListComponent from "../components/searchs/ListComponent";

const SearchPage = () => {
  return (
    <BasicLayout>
      <ListComponent></ListComponent>
    </BasicLayout>
  );
};

export default SearchPage;
