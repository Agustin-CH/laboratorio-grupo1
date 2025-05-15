import React, { useState, useContext } from "react";
import { Box, Typography, Stack, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); 

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        borderBottom: "1px solid #e0e0e0",
        position: "sticky",
        top: 0,
        left: 0,
        bgcolor: "white",
        zIndex: 1000,
        width: "100vw", // <--- clave para ignorar padding/margen de contenedor
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
          component={Link}
          to="/catalogo"
          sx={{
            display: "flex",
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
          <SearchIcon fontSize="small" />
          <Typography variant="caption">BUSCAR</Typography>
        </Button>

        <Button
          component={Link}
          to="/mi-perfil"
          sx={{
            display: "flex",
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
          <PersonIcon fontSize="small" />
          <Typography variant="caption">
            {user ? user.nombre : "CUENTA"}
          </Typography>
        </Button>

        <Button
          component={Link}
          to="/carrito"
          sx={{
            display: "flex",
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
          <ShoppingBagIcon fontSize="small" />
          <Typography variant="caption">CARRITO</Typography>
        </Button>

        {user ? (
          <Button
            onClick={() => {
              logout();
              navigate("/home");
            }}
            sx={{
              display: "flex",
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
            <LogoutIcon fontSize="small" />
            <Typography variant="caption">LOGOUT</Typography>
          </Button>
        ) : (
          <Button
            component={Link}
            to="/usuarios"
            sx={{
              display: "flex",
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
        )}
      </Stack>
    </Box>
  );
};

export default Header;