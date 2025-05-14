import { useState, useEffect, useRef } from "react"
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
  Avatar,
  Grid,
} from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"
import EditIcon from "@mui/icons-material/Edit"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const isMobile = useMediaQuery("(max-width:600px)")
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [lastLogin, setLastLogin] = useState("Hace 27 minutos")
  const originalDataRef = useRef(null)
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("profileData")
    return savedData
      ? JSON.parse(savedData)
      : {
          nombre: "dx",
          apellido: "Caprie",
          fechaNacimiento: "1990-06-29",
          nacionalidad: "Argentina",
          email: "john.smith@example.com",
          idioma: "Español (Español)",
          genero: "Masculino",
          creado: "29-Jun-2019",
        }
  })
  const [editFormData, setEditFormData] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    if (isEditing) {
      setEditFormData({ ...formData })
    }
  }, [isEditing, formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const errors = {}
    let isValid = true

    if (!/^[a-zA-Z\s]{2,}$/.test(editFormData.nombre)) {
      errors.nombre = "Nombre inválido. Solo letras y mínimo 2 caracteres."
      isValid = false
    }

    if (!/^[a-zA-Z\s]{2,}$/.test(editFormData.apellido)) {
      errors.apellido = "Apellido inválido. Solo letras y mínimo 2 caracteres."
      isValid = false
    }

    const birthDate = new Date(editFormData.fechaNacimiento)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()
    const isOver18 = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))

    if (!editFormData.fechaNacimiento || !isOver18) {
      errors.fechaNacimiento = "Debes ser mayor de 18 años."
      isValid = false
    }

    if (!editFormData.nacionalidad) {
      errors.nacionalidad = "Selecciona una nacionalidad."
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setFormData(editFormData)

      localStorage.setItem("profileData", JSON.stringify(editFormData))
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setIsEditing(false)
      }, 1000)
    }
  }

  const handleEditClick = () => {
    originalDataRef.current = { ...formData }
    setIsEditing(true)
  }
  const handleCancel = () => {
    setIsEditing(false)
  }
  const formatDate = (dateString) => {
    if (!dateString) return ""
    if (dateString.includes("/")) {
      return dateString
    }
    try {
      const date = new Date(dateString)
      return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
    } catch (e) {
      return dateString
    }
  }
  const ProfileView = () => (
    <Box sx={{ maxWidth: 600, mx: "auto", p: isMobile ? 2 : 4, textAlign: "center" }}>
      <Avatar
        sx={{
          width: 120,
          height: 120,
          mx: "auto",
          bgcolor: "#6AC259",
          mb: 2,
        }}
      >
        <Typography variant="h3" sx={{ color: "white" }}>
          {formData.nombre.charAt(0)}
          {formData.apellido.charAt(0)}
        </Typography>
      </Avatar>

      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 400,
          color: "#4BBFB4",
          letterSpacing: "1px",
        }}
      >
        {formData.nombre} {formData.apellido}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ maxWidth: 500, mx: "auto" }}>
        <Grid container spacing={1} sx={{ textAlign: "left", mb: 1 }}>
          <Grid item xs={5} sx={{ textAlign: "right", color: "#999" }}>
            <Typography>Nombre:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>
              {formData.nombre} {formData.apellido}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ textAlign: "left", mb: 1 }}>
          <Grid item xs={5} sx={{ textAlign: "right", color: "#999" }}>
            <Typography>Correo electrónico:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>{formData.email}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ textAlign: "left", mb: 1 }}>
          <Grid item xs={5} sx={{ textAlign: "right", color: "#999" }}>
            <Typography>Fecha de nacimiento:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>{formatDate(formData.fechaNacimiento)}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ textAlign: "left", mb: 1 }}>
          <Grid item xs={5} sx={{ textAlign: "right", color: "#999" }}>
            <Typography>Nacionalidad:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>{formData.nacionalidad}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ textAlign: "left", mb: 1 }}>
          <Grid item xs={5} sx={{ textAlign: "right", color: "#999" }}>
            <Typography>Género:</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>{formData.genero}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={handleEditClick}
        sx={{
          mt: 4,
          bgcolor: "#4BBFB4",
          color: "white",
          borderRadius: 1,
          px: 4,
          "&:hover": {
            bgcolor: "#3da89e",
          },
        }}
      >
        EDITAR PERFIL
      </Button>
    </Box>
  )
  const EditForm = () => (
    <Box sx={{ maxWidth: 600, mx: "auto", p: isMobile ? 2 : 4 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 500,
          textAlign: "center",
          color: "black",
        }}
      >
        EDITAR MI PERFIL
      </Typography>

      <Paper elevation={0} sx={{ p: isMobile ? 2 : 4, border: "1px solid #e0e0e0", borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Nombre
              </Typography>
              <TextField
                fullWidth
                name="nombre"
                variant="outlined"
                value={editFormData.nombre || ""}
                onChange={handleChange}
                error={!!formErrors.nombre}
                helperText={formErrors.nombre}
                InputProps={{
                  sx: { borderRadius: 1 },
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Apellido
              </Typography>
              <TextField
                fullWidth
                name="apellido"
                variant="outlined"
                value={editFormData.apellido || ""}
                onChange={handleChange}
                error={!!formErrors.apellido}
                helperText={formErrors.apellido}
                InputProps={{
                  sx: { borderRadius: 1 },
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Fecha de nacimiento
              </Typography>
              <TextField
                fullWidth
                name="fechaNacimiento"
                type="date"
                variant="outlined"
                value={editFormData.fechaNacimiento || ""}
                onChange={handleChange}
                error={!!formErrors.fechaNacimiento}
                helperText={formErrors.fechaNacimiento}
                InputProps={{
                  sx: { borderRadius: 1 },
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Nacionalidad
              </Typography>
              <TextField
                fullWidth
                name="nacionalidad"
                variant="outlined"
                select
                value={editFormData.nacionalidad || ""}
                onChange={handleChange}
                error={!!formErrors.nacionalidad}
                helperText={formErrors.nacionalidad}
                InputProps={{
                  sx: { borderRadius: 1 },
                }}
              >
                <MenuItem value="Argentina">Argentina</MenuItem>
                <MenuItem value="Uruguay">Uruguay</MenuItem>
                <MenuItem value="Brasil">Brasil</MenuItem>
                <MenuItem value="Chile">Chile</MenuItem>
                <MenuItem value="Paraguay">Paraguay</MenuItem>
              </TextField>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                variant="outlined"
                value={editFormData.email || ""}
                InputProps={{
                  readOnly: true,
                  sx: {
                    borderRadius: 1,
                    bgcolor: "#f5f5f5",
                  },
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Género
              </Typography>
              <TextField
                fullWidth
                name="genero"
                variant="outlined"
                select
                value={editFormData.genero || ""}
                onChange={handleChange}
                InputProps={{
                  sx: { borderRadius: 1 },
                }}
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
                <MenuItem value="Prefiero no decir">Prefiero no decir</MenuItem>
              </TextField>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  borderRadius: 1,
                  flex: 1,
                  py: 1.5,
                  textTransform: "uppercase",
                }}
              >
                CANCELAR
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: 1,
                  fontWeight: 600,
                  flex: 1,
                  py: 1.5,
                }}
              >
                GUARDAR
              </Button>
            </Box>
            {showSuccess && (
              <Box sx={{ bgcolor: "#d4edda", color: "#155724", p: 2, borderRadius: 2, textAlign: "center" }}>
                ¡Datos guardados correctamente!
              </Box>
            )}
          </Stack>
        </form>
      </Paper>
    </Box>
  )
  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      <Header />
      {isEditing ? <EditForm /> : <ProfileView />}
      <Footer />
    </Box>
  )
}

export default Profile