import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  useMediaQuery, 
  TextField,
  Paper,
  Divider,
  Stack
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

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

      <Box sx={{ maxWidth: 400, mx: "auto", p: isMobile ? 2 : 4 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 4, 
            fontWeight: 500, 
            letterSpacing: "2px",
            textAlign: "center"
          }}
        >
          MI PERFIL
        </Typography>

        <Paper 
          elevation={0} 
          sx={{ 
            p: isMobile ? 2 : 4, 
            border: "1px solid #e0e0e0",
            borderRadius: 2
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Nombre"
                name="nombre"
                variant="outlined"
                value={formData.nombre}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                label="Apellido"
                name="apellido"
                variant="outlined"
                value={formData.apellido}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                label="Fecha de nacimiento"
                name="fechaNacimiento"
                type="date"
                variant="outlined"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                label="Nacionalidad"
                name="nacionalidad"
                variant="outlined"
                value={formData.nacionalidad}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                label="Número de DNI"
                name="dni"
                variant="outlined"
                value={formData.dni}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                label="Dirección de domicilio"
                name="direccion"
                variant="outlined"
                value={formData.direccion}
                onChange={handleChange}
                multiline
                rows={2}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <Divider sx={{ my: 2 }} />
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: 2,
                  fontWeight: 600
                }}
              >
                GUARDAR CAMBIOS
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>

      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          py: 1,
          fontSize: "0.75rem",
          position: "relative",
          mt: 4
        }}
      >
        ENVÍO GRATIS EN COMPRAS SUPERIORES A $100.000
      </Box>
    </Box>
  );
};

export default Profile;
