import { Box, Typography, Stack, Button, TextField, Link, useMediaQuery, Paper } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"

const Login = () => {
  const isMobile = useMediaQuery("(max-width:600px)")

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
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          E - COMMERCE
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <PersonIcon />
        </Box>
      </Box>

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

            <TextField label="Correo electrónico" variant="outlined" fullWidth type="email" required />
            <TextField label="Contraseña" variant="outlined" fullWidth type="password" required />

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
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

export default Login
