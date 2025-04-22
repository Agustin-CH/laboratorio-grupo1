import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  useMediaQuery,
} from "@mui/material";
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
    direccion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Header e-commerce */}
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
        <ArrowBackIcon />
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ letterSpacing: "4px", fontWeight: 400 }}
        >
          E-COMMERCE
        </Typography>
        <PersonIcon fontSize="small" />
      </Box>

      {/* Contenido principal */}
      <Box sx={{ maxWidth: 800, mx: "auto", p: isMobile ? 2 : 4 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontWeight: 500,
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          MI PERFIL
        </Typography>

        {/* Formulario */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Nacionalidad"
            name="nacionalidad"
            value={formData.nacionalidad}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="DNI"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
