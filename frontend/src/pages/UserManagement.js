import { Box, Typography, useMediaQuery } from "@mui/material"

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
      </Box>
    </Box>
  )
}

export default Login
