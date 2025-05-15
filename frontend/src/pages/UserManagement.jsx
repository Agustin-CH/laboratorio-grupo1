"use client"

import { useState, useContext } from "react"
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Link,
  useMediaQuery,
  Paper,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Header from "../components/Header"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const isMobile = useMediaQuery("(max-width:600px)")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  // Estados para el login
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Estados para controlar qué formulario mostrar
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false)

  // Estados para el formulario de registro
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerBirthDate, setRegisterBirthDate] = useState("")
  const [registerNationality, setRegisterNationality] = useState("")
  const [registerGender, setRegisterGender] = useState("")
  const [registerErrors, setRegisterErrors] = useState({
    name: "",
    email: "",
    birthDate: "",
    nationality: "",
    gender: "",
  })

  // Simulación de login (reemplaza por tu API real)
  const handleLogin = (e) => {
    e.preventDefault()
    // Ejemplo: usuario admin
    if (email === "admin@admin.com" && password === "admin") {
      login({ nombre: "Admin", email, rol: "admin" }, "fake-jwt-token-admin")
      navigate("/gestion-productos")
    } else if (email === "user@user.com" && password === "user") {
      login({ nombre: "Usuario", email, rol: "user" }, "fake-jwt-token-user")
      navigate("/catalogo")
    } else {
      setError("Credenciales incorrectas")
    }
  }

  // Manejar el envío del formulario de olvido de contraseña
  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (forgotPasswordEmail) {
      setForgotPasswordSent(true)
      setTimeout(() => {
        setForgotPasswordSent(false)
        setShowForgotPassword(false)
        setForgotPasswordEmail("")
      }, 3000)
    }
  }

  // Validar fecha de nacimiento (mayor de 18 años)
  const validateBirthDate = (date) => {
    if (!date) return "La fecha de nacimiento es requerida"

    const birthDate = new Date(date)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    if (age < 18) {
      return "Debes ser mayor de 18 años"
    }

    return ""
  }

  // Manejar el envío del formulario de registro
  const handleRegister = (e) => {
    e.preventDefault()

    // Validar campos
    const birthDateError = validateBirthDate(registerBirthDate)
    const newErrors = {
      name: registerName ? "" : "El nombre es requerido",
      email: registerEmail ? "" : "El correo electrónico es requerido",
      birthDate: birthDateError,
      nationality: registerNationality ? "" : "La nacionalidad es requerida",
      gender: registerGender ? "" : "El género es requerido",
    }

    setRegisterErrors(newErrors)

    if (Object.values(newErrors).some((error) => error !== "")) {
      return
    }

    console.log("Registro exitoso", {
      nombre: registerName,
      email: registerEmail,
      fechaNacimiento: registerBirthDate,
      nacionalidad: registerNationality,
      genero: registerGender,
    })

    // Volver al formulario de login
    setShowRegister(false)
    // Limpiar campos
    setRegisterName("")
    setRegisterEmail("")
    setRegisterBirthDate("")
    setRegisterNationality("")
    setRegisterGender("")
  }

  // Renderizar el formulario de olvido de contraseña
  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Recuperar Contraseña
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Completar con correo electrónico para enviar código de restablecimiento de contraseña
          </Typography>
        </Box>

        <TextField
          label="Correo electrónico"
          variant="outlined"
          fullWidth
          type="email"
          required
          value={forgotPasswordEmail}
          onChange={(e) => setForgotPasswordEmail(e.target.value)}
        />

        {forgotPasswordSent && (
          <Typography color="success.main" sx={{ textAlign: "center" }}>
            Te hemos enviado un código
          </Typography>
        )}

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
          Enviar Código
        </Button>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => setShowForgotPassword(false)}
          sx={{ textTransform: "none" }}
        >
          Volver al inicio de sesión
        </Button>
      </Stack>
    </form>
  )

  // Renderizar el formulario de registro
  const renderRegisterForm = () => (
    <form onSubmit={handleRegister}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Registrarse
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Completa tus datos para crear una cuenta
          </Typography>
        </Box>

        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          required
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
          error={!!registerErrors.name}
          helperText={registerErrors.name}
        />

        <TextField
          label="Correo electrónico"
          variant="outlined"
          fullWidth
          type="email"
          required
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          error={!!registerErrors.email}
          helperText={registerErrors.email}
        />

        <TextField
          label="Fecha de nacimiento"
          variant="outlined"
          fullWidth
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          value={registerBirthDate}
          onChange={(e) => setRegisterBirthDate(e.target.value)}
          error={!!registerErrors.birthDate}
          helperText={registerErrors.birthDate || "Debes ser mayor de 18 años"}
        />

        <TextField
          label="Nacionalidad"
          variant="outlined"
          fullWidth
          required
          value={registerNationality}
          onChange={(e) => setRegisterNationality(e.target.value)}
          error={!!registerErrors.nationality}
          helperText={registerErrors.nationality}
        />

        <FormControl fullWidth error={!!registerErrors.gender}>
          <InputLabel id="gender-label">Género</InputLabel>
          <Select
            labelId="gender-label"
            value={registerGender}
            label="Género"
            onChange={(e) => setRegisterGender(e.target.value)}
          >
            <MenuItem value="masculino">Masculino</MenuItem>
            <MenuItem value="femenino">Femenino</MenuItem>
            <MenuItem value="otro">Otro</MenuItem>
            <MenuItem value="prefiero-no-decir">Prefiero no decir</MenuItem>
          </Select>
          {registerErrors.gender && <FormHelperText>{registerErrors.gender}</FormHelperText>}
        </FormControl>

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
          Crear Cuenta
        </Button>

        <Button startIcon={<ArrowBackIcon />} onClick={() => setShowRegister(false)} sx={{ textTransform: "none" }}>
          Volver al inicio de sesión
        </Button>
      </Stack>
    </form>
  )

  // Renderizar el formulario de login
  const renderLoginForm = () => (
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          fullWidth
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" sx={{ textAlign: "center" }}>
            {error}
          </Typography>
        )}

        <Link
          href="#"
          underline="hover"
          onClick={(e) => {
            e.preventDefault()
            setShowForgotPassword(true)
          }}
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
          onClick={() => setShowRegister(true)}
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
  )

  // Determinar qué formulario mostrar
  const renderForm = () => {
    if (showForgotPassword) {
      return renderForgotPasswordForm()
    } else if (showRegister) {
      return renderRegisterForm()
    } else {
      return renderLoginForm()
    }
  }

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
          {renderForm()}
        </Paper>
      </Box>
    </Box>
  )
}

export default Login
