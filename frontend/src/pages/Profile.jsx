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
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      {/* Header reutilizable */}
      <Header />

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

      {/* Footer reutilizable */}
      <Footer />
    </Box>
  );
};

export default Profile;