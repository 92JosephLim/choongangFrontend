import React, { useEffect, useRef, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import Kakaomapapi from "./todo/CampingInfo";

const MapPage = () => {
  return (
    <BasicLayout>
      <Kakaomapapi></Kakaomapapi>
    </BasicLayout>
  );
};

export default MapPage;
