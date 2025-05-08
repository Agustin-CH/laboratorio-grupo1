import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Header from "../components/Header"; // Asegúrate de la ruta correcta
import Footer from "../components/Footer"; // Asegúrate de la ruta correcta

const steps = ["Información de Envío", "Información de Pago", "Revisar Pedido"];

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      <Header />

      <Box sx={{ py: 4, px: { xs: 2, md: 4 }, maxWidth: 960, mx: "auto" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
          Finalizar Compra
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Paper sx={{ p: 3, mb: 3, border: "1px solid #f0f0f0" }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
              Información de Envío
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Nombre" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Apellido" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Dirección" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Ciudad" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Código Postal" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="country-label">País</InputLabel>
                  <Select labelId="country-label" id="country" value="" label="País">
                    <MenuItem value="ar">Argentina</MenuItem>
                    {/* Agrega más países */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Número de Teléfono" variant="outlined" />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Continuar a Pago
              </Button>
            </Box>
          </Paper>
        )}

        {activeStep === 1 && (
          <Paper sx={{ p: 3, mb: 3, border: "1px solid #f0f0f0" }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
              Información de Pago
            </Typography>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Método de Pago
              </Typography>
              <RadioGroup aria-label="payment-method" name="paymentMethod" defaultValue="credit-card">
                <FormControlLabel value="credit-card" control={<Radio />} label="Tarjeta de Crédito" />
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                {/* Agrega más métodos de pago */}
              </RadioGroup>
            </FormControl>

            {/* Detalles de la tarjeta de crédito (mostrar si se selecciona) */}
            {/* Podrías usar componentes como <TextField> para número de tarjeta, fecha de expiración, CVV */}
            {/* Considera usar librerías seguras para la integración de pagos reales */}
            {activeStep === 1 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Detalles de la Tarjeta de Crédito
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Número de Tarjeta" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Fecha de Expiración (MM/AA)" variant="outlined" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="CVV" variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label="Guardar esta tarjeta para futuras compras"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button onClick={handleBack}>Atrás</Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Revisar Pedido
              </Button>
            </Box>
          </Paper>
        )}

        {activeStep === 2 && (
          <Paper sx={{ p: 3, mb: 3, border: "1px solid #f0f0f0" }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
              Revisar Pedido
            </Typography>

            {/* Aquí mostrarías un resumen del pedido: */}
            {/* - Productos en el carrito con cantidades y precios */}
            {/* - Información de envío */}
            {/* - Método de pago seleccionado */}
            {/* - Subtotal, envío, total */}

            {/* Ejemplo de resumen de productos */}
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Productos:
            </Typography>
            {/* Mapea tus `cartItems` aquí para mostrar cada producto */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Nombre del Producto x Cantidad</Typography>
              <Typography>$Precio Total del Producto</Typography>
            </Box> */}
            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Información de Envío:
            </Typography>
            {/* Muestra la información de envío aquí */}
            <Typography variant="body2">Nombre: [Nombre]</Typography>
            <Typography variant="body2">Dirección: [Dirección]</Typography>
            {/* ... más detalles de envío ... */}
            <Divider sx={{ mb: 2, mt: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
              Método de Pago:
            </Typography>
            {/* Muestra el método de pago seleccionado */}
            <Typography variant="body2">[Método de Pago]</Typography>
            <Divider sx={{ mb: 2, mt: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 500, mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>$[Subtotal]</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 500, mb: 1 }}>
              <Typography>Envío:</Typography>
              <Typography>$[Envío]</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.2rem" }}>
              <Typography>Total:</Typography>
              <Typography>$[Total]</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button onClick={handleBack}>Atrás</Button>
              <Button variant="contained" color="primary">
                Pagar Ahora
              </Button>
            </Box>
          </Paper>
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default Checkout;