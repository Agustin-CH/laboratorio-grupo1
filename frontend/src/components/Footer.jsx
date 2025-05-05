import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    sx={{
      backgroundColor: "black",
      color: "white",
      textAlign: "center",
      py: 1,
      fontSize: "0.75rem",
      position: "relative",
    }}
  >
    <Typography>
      ENVÍO GRATIS EN COMPRAS SUPERIORES A $100.000
    </Typography>
  </Box>
);

export default Footer;