import React from "react";
import { Box, Typography, Stack, Button, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";

const Home = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: isMobile ? 2 : 4,
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
          variant={isMobile ? "h5" : "h4"}
          sx={{ letterSpacing: "4px", fontWeight: 400 }}
        >
          E-COMMERCE
        </Typography>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <SearchIcon fontSize="small" />
            {!isMobile && <Typography variant="caption">BUSCAR</Typography>}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <PersonIcon fontSize="small" />
            {!isMobile && <Typography variant="caption">CUENTA</Typography>}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <ShoppingBagIcon fontSize="small" />
            {!isMobile && <Typography variant="caption">CARRITO</Typography>}
          </Stack>
        </Stack>
      </Box>

      {/* Hero principal */}
      <Box
        sx={{
          height: { xs: "100vh", md: "90vh" },
          backgroundImage: `url("https://images.unsplash.com/photo-1604335399109-8adf5da42863")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "column",
          px: 2,
          pb: { xs: 6, md: 10 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            letterSpacing: "2px",
            textAlign: "center",
            color: "black",
            backgroundColor: "rgba(255,255,255,0.7)",
            px: 2,
            py: 1,
            mb: 1,
          }}
        >
          COMPRA ONLINE<br />DE FORMA FÁCIL Y RÁPIDA
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.85rem",
            color: "black",
            backgroundColor: "rgba(255,255,255,0.6)",
            px: 2,
            py: 0.5,
            mb: 2,
            textAlign: "center",
          }}
        >
          Accedé a productos únicos desde la comodidad de tu casa.
        </Typography>
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
        >
          VER PRODUCTOS
        </Button>
      </Box>

      {/* Imagen destacada tipo banner scroll */}
      <Box sx={{ width: "100%", mt: 2 }}>
        <img
          src="https://images.unsplash.com/photo-1611078489935-0cb96412ce3a"
          alt="Banner destacado"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Box>

      {/* Footer promo */}
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
        ENVÍO GRATIS EN COMPRAS SUPERIORES A $100.000
      </Box>
    </Box>
  );
};

export default Home;
