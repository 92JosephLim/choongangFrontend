import React from "react";
import { Button, Box, Typography } from "@mui/material";

const CampingFeatureIcons = ({ data }) => {
  // 문자열을 , 기준으로 분할하여 배열로 변환
  const featureArray = data.split(",");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // 상하 배치
        gap: 1,
        mt: 2,
        border: "1px solid",
        borderColor: "grey.300",
        p: 2,
        borderRadius: 2,
        backgroundColor: "grey.50",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // 버튼들 가로 정렬
          gap: 1,
        }}
      >
        {featureArray.map((feature, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            {feature.trim()}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default CampingFeatureIcons;
