import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainButton from "../components/MainButton";
import Carousel from "react-material-ui-carousel";

const carouselImages = [
  "https://plus.unsplash.com/premium_photo-1676225680209-19a398a9b38a?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
];

const Home = () => {
  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Header */}
      <Header />

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
        {/* Carrusel de imágenes arriba del texto */}
        <Box sx={{ width: "100%", maxWidth: 600, mb: 4 }}>
          <Carousel
            indicators={true}
            navButtonsAlwaysVisible={true}
            animation="slide"
            interval={4000}
          >
            {carouselImages.map((img, idx) => (
              <Box key={idx} sx={{ width: "100%", height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img
                  src={img}
                  alt={`Destacado ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                />
              </Box>
            ))}
          </Carousel>
        </Box>

        {/* Texto principal y botón */}
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
        <MainButton>
          VER PRODUCTOS
        </MainButton>
      </Box>

      {/* Footer promo */}
      <Footer />
    </Box>
  );
};

export default Home;