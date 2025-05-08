import React, { useState } from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login"; // Importa el icono de login
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate();
      setSearchTerm("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

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
        width: "100%",
      }}
    >
      <IconButton
        component={Link}
        to="/home"
        sx={{ color: "black" }}
        aria-label="Inicio"
      >
        <HomeIcon />
      </IconButton>
      <Typography
        variant="h4"
        sx={{ letterSpacing: "4px", fontWeight: 400 }}
      >
        E-COMMERCE
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.5,
            padding: 0,
            minWidth: 0,
            color: "black",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            }
          }}
          onClick={() => {
            console.log("Buscar producto");
          }}
        >
          <SearchIcon fontSize="small" />
          <Typography variant="caption">BUSCAR</Typography>
        </Button>
        <Button
          component={Link}
          to="/mi-perfil"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.5,
            padding: 0,
            minWidth: 0,
            color: "black",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            }
          }}
          onClick={() => {
            console.log("Ir a la cuenta");
          }}
        >
          <PersonIcon fontSize="small" />
          <Typography variant="caption">CUENTA</Typography>
        </Button>
        <Button
          component={Link}
          to="/carrito"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.5,
            padding: 0,
            minWidth: 0,
            color: "black",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            }
          }}
          onClick={() => {
            console.log("Ir al carrito");
          }}
        >
          <ShoppingBagIcon fontSize="small" />
          <Typography variant="caption">CARRITO</Typography>
        </Button>
        <Button
          component={Link}
          to="/usuarios"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.5,
            padding: 0,
            minWidth: 0,
            color: "black",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            }
          }}
        >
          <LoginIcon fontSize="small" />
          <Typography variant="caption">LOGIN</Typography>
        </Button>
      </Stack>
    </Box>
  );
};

export default Header;