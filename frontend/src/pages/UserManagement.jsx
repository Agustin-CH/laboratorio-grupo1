import { useState, useContext } from "react";
import { Box, Typography, Stack, Button, TextField, Link, useMediaQuery, Paper, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simulación de login (reemplaza por tu API real)
  const handleLogin = (e) => {
    e.preventDefault();
    // Ejemplo: usuario admin
    if (email === "admin@admin.com" && password === "admin") {
      login({ nombre: "Admin", email, rol: "admin" }, "fake-jwt-token-admin");
      navigate("/gestion-productos");
    } else if (email === "user@user.com" && password === "user") {
      login({ nombre: "Usuario", email, rol: "user" }, "fake-jwt-token-user");
      navigate("/catalogo");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          px: isMobile ? 2 : 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 450,
            p: 4,
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <Box textAlign="center">
                <PersonIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                  Iniciar Sesión
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ingresa tus credenciales para acceder
                </Typography>
              </Box>

              <TextField
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              {error && (
                <Typography color="error" sx={{ textAlign: "center" }}>
                  {error}
                </Typography>
              )}

              <Link
                href="#"
                underline="hover"
                sx={{
                  alignSelf: "flex-end",
                  color: "primary.main",
                  fontSize: "0.875rem",
                }}
              >
                ¿Has olvidado tu contraseña?
              </Link>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Iniciar Sesión
              </Button>

              <Divider>o</Divider>

              <Button
                variant="outlined"
                fullWidth
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Registrarse
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;