import React, { useState } from "react";
import { Box, Typography, Stack, Button, useMediaQuery, TextField } from "@mui/material";

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
