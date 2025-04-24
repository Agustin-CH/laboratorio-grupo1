import { Box, Typography, useMediaQuery, Paper } from "@mui/material"
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
        </Paper>
      </Box>
    </Box>
  )
}

export default Login
