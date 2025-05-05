import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        borderBottom: "1px solid #e0e0e0",
        position: "sticky",
        top: 0,
        bgcolor: "white",
        zIndex: 1000,
      }}
    >
      <MenuIcon />
      <Typography
        variant="h4"
        sx={{ letterSpacing: "4px", fontWeight: 400 }}
      >
        E-COMMERCE
      </Typography>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <SearchIcon fontSize="small" />
          <Typography variant="caption">BUSCAR</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <PersonIcon fontSize="small" />
          <Typography variant="caption">CUENTA</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <ShoppingBagIcon fontSize="small" />
          <Typography variant="caption">CARRITO</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;