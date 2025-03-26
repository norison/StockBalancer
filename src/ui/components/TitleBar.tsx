import { Box, Typography } from "@mui/material";

const TitleBar = () => {
  return (
    <Box
      className="titlebar"
      height={30}
      sx={{
        "app-region": "drag",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>Stock Balancer</Typography>
    </Box>
  );
};

export default TitleBar;
