import React, { useState } from "react";
import { Box, Typography, Stack, Button, useMediaQuery, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";

const Profile = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    nacionalidad: "",
    dni: "",
    email: "",
    direccion: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del perfil:", formData);
  };

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: isMobile ? 2 : 4, py: 2, borderBottom: "1px solid #e0e0e0" }}>
        <ArrowBackIcon />
        <Typography variant={isMobile ? "h5" : "h4"} sx={{ letterSpacing: "4px", fontWeight: 400 }}>E-COMMERCE</Typography>
        <PersonIcon fontSize="small" />
      </Box>

      <Box sx={{ maxWidth: 800, mx: "auto", p: isMobile ? 2 : 4 }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 500, textAlign: "center" }}>
          MI PERFIL
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
