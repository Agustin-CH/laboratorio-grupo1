import React from "react";
import { Button } from "@mui/material";

const MainButton = ({ children, ...props }) => (
  <Button
    variant="outlined"
    sx={{
      color: "black",
      borderColor: "black",
      backgroundColor: "white",
      px: 4,
      borderRadius: 0,
      fontSize: "0.75rem",
      fontWeight: 600,
    }}
    {...props}
  >
    {children}
  </Button>
);

export default MainButton;