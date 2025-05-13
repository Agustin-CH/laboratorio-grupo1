import React, {useState} from "react";
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
  FormHelperText,
} from "@mui/material";
import Header from "../components/Header"; // Asegúrate de la ruta correcta
import Footer from "../components/Footer"; // Asegúrate de la ruta correcta

const steps = ["Información de Envío", "Información de Pago", "Revisar Pedido"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({ /* ... */ });
    const [shippingErrors, setShippingErrors] = useState({ /* ... */ });
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [paymentData, setPaymentData] = useState({ /* ... */ });
    const [paymentErrors, setPaymentErrors] = useState({ /* ... */ });
    const [paypalPaymentInProgress, setPaypalPaymentInProgress] = useState(false);


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (activeStep === 0) {
      setShippingData({ ...shippingData, [name]: value });
      setShippingErrors({ ...shippingErrors, [name]: "" });
    } else if (activeStep === 1) {
      if (type === 'checkbox') {
        setPaymentData({ ...paymentData, [name]: checked });
      } else {
        setPaymentData({ ...paymentData, [name]: value });
      }
      setPaymentErrors({ ...paymentErrors, [name]: "" });
    }
  };

  const validateShipping = () => {
    let isValid = true;
    const newErrors = { ...shippingErrors };
    const nameRegex = /^[a-zA-Z\s]*$/;

    if (!shippingData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
      isValid = false;
    } else if (!nameRegex.test(shippingData.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras y espacios";
      isValid = false;
    }

    if (!shippingData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
      isValid = false;
    } else if (!nameRegex.test(shippingData.apellido)) {
      newErrors.apellido = "El apellido solo puede contener letras y espacios";
      isValid = false;
    }

    if (!shippingData.direccion.trim()) {
      newErrors.direccion = "La dirección es requerida";
      isValid = false;
    }
    if (!shippingData.ciudad.trim()) {
      newErrors.ciudad = "La ciudad es requerida";
      isValid = false;
    }
    if (!/^\d{4,}$/.test(shippingData.codigoPostal)) {
      newErrors.codigoPostal = "El código postal no es válido";
      isValid = false;
    }
    if (!shippingData.pais) {
      newErrors.pais = "El país es requerido";
      isValid = false;
    }
    if (!/^\d{7,}$/.test(shippingData.telefono)) {
      newErrors.telefono = "El número de teléfono no es válido";
      isValid = false;
    }

    setShippingErrors(newErrors);
    return isValid;
  };

  const validatePayment = () => {
    let isValid = true;
    const newErrors = { ...paymentErrors };

    if (paymentMethod === "credit-card") {
      // Validar número de tarjeta (formato básico, podría necesitar una validación Luhn más robusta)
      if (!/^\d{16}$/.test(paymentData.cardNumber)) {
        newErrors.cardNumber = "El número de tarjeta debe tener 16 dígitos";
        isValid = false;
      }

      // Validar fecha de expiración (formato MM/AA y que no esté expirada)
      if (!/^(0[1-9]|1[0-2])\/([2-9][0-9])$/.test(paymentData.expiryDate)) {
        newErrors.expiryDate = "Formato de fecha inválido (MM/AA)";
        isValid = false;
      } else {
        const [monthStr, yearShortStr] = paymentData.expiryDate.split('/');
        const month = parseInt(monthStr, 10);
        const year = 2000 + parseInt(yearShortStr, 10); // Asumiendo que las tarjetas no expiran antes del 2000
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiryDate = "La tarjeta ha expirado";
          isValid = false;
        }
      }

      // Validar CVV (3 o 4 dígitos)
      if (!/^\d{3,4}$/.test(paymentData.cvv)) {
        newErrors.cvv = "El CVV debe tener 3 o 4 dígitos";
        isValid = false;
      }
    }
    // Puedes agregar validaciones para otros métodos de pago aquí

    setPaymentErrors(newErrors);
    return isValid;
  };

    const handleNext = () => {
        if (activeStep === 0) {
            if (validateShipping()) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } else if (activeStep === 1) {
            if (paymentMethod === "credit-card") {
                if (validatePayment()) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
            } else if (paymentMethod === "paypal") {
                // Simulación del inicio del pago con PayPal
                setPaypalPaymentInProgress(true);
                console.log("Simulando redirección a PayPal...");
                setTimeout(() => {
                    // Simulación de que PayPal devuelve la autorización
                    alert("Simulación: Pago con PayPal autorizado.");
                    setPaypalPaymentInProgress(false);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }, 3000);
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } else {
            console.log("Pedido finalizado", shippingData, paymentData, obtenerCarrito());
            alert("Gracias por su compra!");
        }
    };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const obtenerCarrito = () => {
  const carritoGuardado = localStorage.getItem('carrito');
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
};

const calcularSubtotal = () => {
  return obtenerCarrito().reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const calcularEnvio = () => {
  const subtotal = calcularSubtotal();
  return subtotal > 100 ? 0 : 10; // Ejemplo: envío gratis si el subtotal es mayor a $100
};

const calcularTotal = () => {
  return calcularSubtotal() + calcularEnvio();
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
                <TextField
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                  name="nombre"
                  value={shippingData.nombre}
                  onChange={handleChange}
                  error={!!shippingErrors.nombre}
                  helperText={shippingErrors.nombre}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellido"
                  variant="outlined"
                  name="apellido"
                  value={shippingData.apellido}
                  onChange={handleChange}
                  error={!!shippingErrors.apellido}
                  helperText={shippingErrors.apellido}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  variant="outlined"
                  name="direccion"
                  value={shippingData.direccion}
                  onChange={handleChange}
                  error={!!shippingErrors.direccion}
                  helperText={shippingErrors.direccion}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  variant="outlined"
                  name="ciudad"
                  value={shippingData.ciudad}
                  onChange={handleChange}
                  error={!!shippingErrors.ciudad}
                  helperText={shippingErrors.ciudad}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Código Postal"
                  variant="outlined"
                  name="codigoPostal"
                  value={shippingData.codigoPostal}
                  onChange={handleChange}
                  error={!!shippingErrors.codigoPostal}
                  helperText={shippingErrors.codigoPostal}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!shippingErrors.pais}>
                  <InputLabel id="country-label">País</InputLabel>
                  <Select
                    labelId="country-label"
                    id="pais"
                    name="pais"
                    value={shippingData.pais}
                    label="País"
                    onChange={handleChange}
                  >
                    <MenuItem value="">Seleccionar país</MenuItem>
                    <MenuItem value="ar">Argentina</MenuItem>
                    {/* Agrega más países */}
                  </Select>
                  {shippingErrors.pais && (
                    <FormHelperText>{shippingErrors.pais}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Número de Teléfono"
                  variant="outlined"
                  name="telefono"
                  value={shippingData.telefono}
                  onChange={handleChange}
                  error={!!shippingErrors.telefono}
                  helperText={shippingErrors.telefono}
                />
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
              <RadioGroup
                aria-label="payment-method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel value="credit-card" control={<Radio />} label="Tarjeta de Crédito" />
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                {/* Agrega más métodos de pago */}
              </RadioGroup>
            </FormControl>

            {paymentMethod === "credit-card" && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Detalles de la Tarjeta de Crédito
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Número de Tarjeta"
                      variant="outlined"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleChange}
                      error={!!paymentErrors.cardNumber} // Conecta el error
                      helperText={paymentErrors.cardNumber} // Muestra el mensaje de error
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Fecha de Expiración (MM/AA)"
                      variant="outlined"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleChange}
                      error={!!paymentErrors.expiryDate} // Conecta el error
                      helperText={paymentErrors.expiryDate} // Muestra el mensaje de error
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      variant="outlined"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handleChange}
                      error={!!paymentErrors.cvv} // Conecta el error
                      helperText={paymentErrors.cvv} // Muestra el mensaje de error
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Radio
                          color="primary"
                          name="saveCard"
                          checked={paymentData.saveCard}
                          onChange={handleChange}
                        />
                      }
                      label="Guardar esta tarjeta para futuras compras"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

                                    {paymentMethod === "paypal" && (
                            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Pagar con PayPal
                                </Typography>
                                {/* Botón de PayPal simulado */}
                                <Button
                                    variant="contained"
                                    color="warning" // Puedes usar un color distintivo para PayPal
                                    onClick={() => {
                                        setPaypalPaymentInProgress(true);
                                        console.log("Botón de PayPal simulado clickeado");
                                        setTimeout(() => {
                                            alert("Simulación: Redirigiendo a PayPal...");
                                            setTimeout(() => {
                                                alert("Simulación: Pago con PayPal autorizado.");
                                                setPaypalPaymentInProgress(false);
                                                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                                            }, 2000); // Simula el tiempo de procesamiento de PayPal
                                        }, 1500); // Simula la redirección
                                    }}
                                    disabled={paypalPaymentInProgress}
                                    sx={{ backgroundColor: '#ffc439', color: '#000', '&:hover': { backgroundColor: '#e0b330' } }}
                                >
                                    {paypalPaymentInProgress ? "Procesando PayPal..." : "Pagar con PayPal"}
                                </Button>
                                {paypalPaymentInProgress && (
                                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                                        Simulando conexión segura con PayPal...
                                    </Typography>
                                )}
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

    <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
      Información de Envío:
    </Typography>
    <Typography>Nombre: {shippingData.nombre} {shippingData.apellido}</Typography>
    <Typography>Dirección: {shippingData.direccion}</Typography>
    <Typography>Ciudad: {shippingData.ciudad}, Código Postal: {shippingData.codigoPostal}</Typography>
    <Typography>País: {shippingData.pais}</Typography>
    <Typography>Teléfono: {shippingData.telefono}</Typography>

    <Divider sx={{ my: 2 }} />

    <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
      Información de Pago:
    </Typography>
    <Typography>Método de Pago: {paymentMethod === 'credit-card' ? 'Tarjeta de Crédito' : paymentMethod === 'paypal' ? 'PayPal' : paymentMethod}</Typography>
    {paymentMethod === 'credit-card' && (
      <>
        <Typography>Número de Tarjeta: ****-****-****-{paymentData.cardNumber.slice(-4)}</Typography>
        <Typography>Fecha de Expiración: {paymentData.expiryDate}</Typography>
      </>
    )}
    {paymentData.saveCard && <Typography>Guardar tarjeta: Sí</Typography>}

    <Divider sx={{ my: 2 }} />

    <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
      Resumen del Pedido:
    </Typography>
    {/* Aquí vamos a mostrar los productos del carrito */}
    {obtenerCarrito().length > 0 ? (
      obtenerCarrito().map((item) => (
        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
          <Typography>{item.name} ({item.quantity})</Typography>
          <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
        </Box>
      ))
    ) : (
      <Typography>No hay productos en el carrito.</Typography>
    )}

    <Divider sx={{ my: 2 }} />

    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Subtotal:</Typography>
      <Typography variant="subtitle1">${calcularSubtotal().toFixed(2)}</Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Envío:</Typography>
      <Typography variant="subtitle1">${calcularEnvio().toFixed(2)}</Typography>
    </Box>
    <Divider sx={{ my: 1 }} />
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>Total:</Typography>
      <Typography variant="h6">${calcularTotal().toFixed(2)}</Typography>
    </Box>

    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
      <Button onClick={handleBack}>Atrás</Button>
      <Button variant="contained" color="primary" onClick={() => console.log("Pedido Confirmado", shippingData, paymentData, obtenerCarrito())}>
        Confirmar Pedido
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