// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { Box, Stack, TextField, Button, Typography, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate         = useNavigate();
  const { login }        = useContext(AuthContext);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Registro
  const [regName, setRegName]         = useState("");
  const [regEmail, setRegEmail]       = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regErrors, setRegErrors]     = useState({});
  const [regLoading, setRegLoading]   = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data.user, data.token);
      if (data.user.roles.includes("ADMIN")) navigate("/gestion-productos");
      else navigate("/catalogo");
    } catch (err) {
      setError(err.response?.data?.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    const errs = {};
    if (!regName) errs.name = "Nombre requerido";
    if (!regEmail.match(/^[^@]+@[^@]+\.[^@]+$/)) errs.email = "Email inválido";
    if (regPassword.length < 6) errs.password = "Mínimo 6 caracteres";
    setRegErrors(errs);
    if (Object.keys(errs).length) return;

    setRegLoading(true);
    try {
      await api.post("/auth/register", {
        fullName: regName,
        email:    regEmail,
        password: regPassword,
      });
      alert("Te registraste correctamente. Inicia sesión.");
      setShowRegister(false);
    } catch (err) {
      setRegErrors({ email: "No se pudo registrar ese correo" });
    } finally {
      setRegLoading(false);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <PersonIcon sx={{ fontSize: 40, mb:1 }} color="primary" />
          <Typography variant="h5">Iniciar Sesión</Typography>
        </Box>
        <TextField label="Email" type="email" fullWidth required
                   value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Contraseña" type="password" fullWidth required
                   value={password} onChange={e => setPassword(e.target.value)} />
        {error && <Typography color="error">{error}</Typography>}
        <Divider>o</Divider>
        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? "Cargando…" : "Entrar"}
        </Button>
        <Button startIcon={<ArrowBackIcon />} onClick={() => setShowRegister(true)}>
          Registrarse
        </Button>
      </Stack>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleRegister}>
      <Stack spacing={3}>
        <Typography variant="h5" textAlign="center">Registrarse</Typography>
        <TextField label="Nombre completo" fullWidth
                   value={regName} onChange={e => setRegName(e.target.value)}
                   error={!!regErrors.name} helperText={regErrors.name} />
        <TextField label="Email" type="email" fullWidth
                   value={regEmail} onChange={e => setRegEmail(e.target.value)}
                   error={!!regErrors.email} helperText={regErrors.email} />
        <TextField label="Contraseña" type="password" fullWidth
                   value={regPassword} onChange={e => setRegPassword(e.target.value)}
                   error={!!regErrors.password} helperText={regErrors.password} />
        <Button type="submit" variant="contained" fullWidth disabled={regLoading}>
          {regLoading ? "Cargando…" : "Crear Cuenta"}
        </Button>
        <Button onClick={() => setShowRegister(false)} startIcon={<ArrowBackIcon />}>
          Volver al login
        </Button>
      </Stack>
    </form>
  );

  return <Box sx={{ maxWidth: 400, mx: "auto", py: 5 }}>
    {showRegister ? renderRegisterForm() : renderLoginForm()}
  </Box>;
};

export default Login;
