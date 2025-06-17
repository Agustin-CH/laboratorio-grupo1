import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Button
} from "@mui/material";
import {
  Search as SearchIcon,
  Person as PersonIcon,
  ShoppingBag as ShoppingBagIcon,
  Home as HomeIcon,
  Login as LoginIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";
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
        width: "100vw",
      }}
    >
      {/* Logo / Home */}
      <IconButton component={Link} to="/home" aria-label="Inicio">
        <HomeIcon />
      </IconButton>

      <Typography variant="h4" sx={{ letterSpacing: "4px", fontWeight: 400 }}>
        E-COMMERCE
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        {/* Buscar catálogo */}
        <Button
          component={Link}
          to="/catalogo"
          startIcon={<SearchIcon />}
          sx={{ textTransform: "none" }}
        >
          Buscar
        </Button>

        {/* Mi Perfil */}
        {user ? (
          <Button
            component={Link}
            to="/mi-perfil"
            startIcon={<PersonIcon />}
            sx={{ textTransform: "none" }}
          >
            {user.fullName}
          </Button>
        ) : null}

        {/* Carrito */}
        <Button
          component={Link}
          to="/carrito"
          startIcon={<ShoppingBagIcon />}
          sx={{ textTransform: "none" }}
        >
          Carrito
        </Button>

        {/* Login / Logout */}
        {user ? (
          <Button
            onClick={() => {
              logout();
              navigate("/home");
            }}
            startIcon={<LogoutIcon />}
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
        ) : (
          <Button
            component={Link}
            to="/login"
            startIcon={<LoginIcon />}
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Header;