import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  TextField,
  Paper,
  Divider,
  Stack,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    nacionalidad: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!/^[a-zA-Z\s]{2,}$/.test(formData.nombre)) {
      errors.nombre = "Nombre inválido. Solo letras y mínimo 2 caracteres.";
      isValid = false;
    }

    if (!/^[a-zA-Z\s]{2,}$/.test(formData.apellido)) {
      errors.apellido = "Apellido inválido. Solo letras y mínimo 2 caracteres.";
      isValid = false;
    }

    const birthDate = new Date(formData.fechaNacimiento);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    const isOver18 =
      age > 18 ||
      (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

    if (!formData.fechaNacimiento || !isOver18) {
      errors.fechaNacimiento = "Debes ser mayor de 18 años.";
      isValid = false;
    }

    if (!formData.nacionalidad) {
      errors.nacionalidad = "Selecciona una nacionalidad.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Email inválido.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/gestion-productos");
      }, 1000);
    }
  };

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      <Header />

      <Box sx={{ maxWidth: 400, mx: "auto", p: isMobile ? 2 : 4 }}>
        <Typography
          variant="h5"
          sx={{ mb: 4, fontWeight: 500, letterSpacing: "2px", textAlign: "center" }}
        >
          MI PERFIL
        </Typography>

        <Paper elevation={0} sx={{ p: isMobile ? 2 : 4, border: "1px solid #e0e0e0", borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Nombre"
                name="nombre"
                variant="outlined"
                value={formData.nombre}
                onChange={handleChange}
                error={!!formErrors.nombre}
                helperText={formErrors.nombre}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                label="Apellido"
                name="apellido"
                variant="outlined"
                value={formData.apellido}
                onChange={handleChange}
                error={!!formErrors.apellido}
                helperText={formErrors.apellido}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                label="Fecha de nacimiento"
                name="fechaNacimiento"
                type="date"
                variant="outlined"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                error={!!formErrors.fechaNacimiento}
                helperText={formErrors.fechaNacimiento}
                InputLabelProps={{ shrink: true }}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                label="Nacionalidad"
                name="nacionalidad"
                variant="outlined"
                select
                value={formData.nacionalidad}
                onChange={handleChange}
                error={!!formErrors.nacionalidad}
                helperText={formErrors.nacionalidad}
                InputProps={{ sx: { borderRadius: 2 } }}
              >
                <MenuItem value="Argentina">Argentina</MenuItem>
                <MenuItem value="Uruguay">Uruguay</MenuItem>
                <MenuItem value="Brasil">Brasil</MenuItem>
                <MenuItem value="Chile">Chile</MenuItem>
                <MenuItem value="Paraguay">Paraguay</MenuItem>
              </TextField>
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <Divider sx={{ my: 2 }} />
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{ backgroundColor: "black", color: "white", borderRadius: 2, fontWeight: 600 }}
              >
                GUARDAR CAMBIOS
              </Button>
              {showSuccess && (
                <Box sx={{ bgcolor: "#d4edda", color: "#155724", p: 2, borderRadius: 2, textAlign: "center" }}>
                  ¡Datos guardados correctamente!
                </Box>
              )}
            </Stack>
          </form>
        </Paper>
      </Box>

      <Footer />
    </Box>
  );
};

export default Profile;