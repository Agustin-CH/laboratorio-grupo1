import React from "react";
import { Box, Typography, Stack, Link, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const FooterFull = () => (
  <Box
    sx={{
      backgroundColor: "black",
      color: "white",
      textAlign: "center",
      py: 3,
      mt: 4,
      fontSize: "0.95rem",
    }}
  >
    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
      ¿Necesitás ayuda? Contactanos
    </Typography>
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1 }}>
      <IconButton
        component="a"
        href="https://wa.me"
        target="_blank"
        rel="noopener"
        sx={{ color: "white" }}
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </IconButton>
      <IconButton
        component="a"
        href="https://instagram.com"
        target="_blank"
        rel="noopener"
        sx={{ color: "white" }}
        aria-label="Instagram"
      >
        <InstagramIcon />
      </IconButton>
      <IconButton
        component="a"
        href="https://x.com"
        target="_blank"
        rel="noopener"
        sx={{ color: "white" }}
        aria-label="X"
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        component={Link}
        href="/preguntas-frecuentes"
        sx={{ color: "white" }}
        aria-label="Preguntas Frecuentes"
      >
        <HelpOutlineIcon />
      </IconButton>
    </Stack>
    <Typography variant="body2" sx={{ opacity: 0.8 }}>
      ENVÍO GRATIS EN COMPRAS SUPERIORES A $100.000
    </Typography>
    <Typography variant="caption" sx={{ display: "block", mt: 1, opacity: 0.7 }}>
      © {new Date().getFullYear()} E-COMMERCE. Todos los derechos reservados.
    </Typography>
  </Box>
);

export default FooterFull;