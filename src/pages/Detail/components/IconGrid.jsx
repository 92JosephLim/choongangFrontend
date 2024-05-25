import React from "react";
import { Grid, IconButton, Typography, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";

const IconGrid = ({ homepage, tel, resveUrl, addr1 }) => {
  const items = [
    { icon: <PhoneIcon />, title: tel, link: `tel:${tel}` },
    { icon: <EventIcon />, title: "예약", link: resveUrl },
    { icon: <MapIcon />, title: addr1 },
    {
      icon: <HomeIcon />,
      title: "홈페이지",
      link: `http://${homepage}`,
    },
  ];

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "grey.300",
        p: 2,
        borderRadius: 2,
        backgroundColor: "grey.50",
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={3} key={index} textAlign="center">
            <IconButton onClick={() => (window.location.href = item.link)}>
              {item.icon}
            </IconButton>
            <Typography variant="subtitle1">{item.title}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default IconGrid;
