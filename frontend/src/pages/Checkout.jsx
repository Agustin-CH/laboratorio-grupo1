// src/pages/Checkout.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Box, Typography, TextField, Button, Stepper, Step, StepLabel,
  Paper, Grid, Divider, FormControl, InputLabel, Select, MenuItem,
  RadioGroup, FormControlLabel, Radio, FormHelperText, Dialog,
  DialogTitle, DialogContent, DialogActions, Snackbar, Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const steps = ["Información de Envío", "Información de Pago", "Revisar Pedido"];

export default function Checkout() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const headers = { Authorization: `Bearer ${token}` };

  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [shippingErrors, setShippingErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [paymentData, setPaymentData] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});
  const [paypalInProgress, setPaypalInProgress] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get(`/api/cart/${user.id}`, { headers })
      .then(({ data }) => {
        setCartItems(data.items.map(i => ({
          id: i.productId,
          name: i.productName,
          price: i.unitPrice,
          quantity: i.quantity
        })));
      })
      .catch(err => {
        console.error("Error cargando carrito:", err);
        setCartItems([]);
      });
  }, [user.id, headers]);

  const calcularSubtotal = items => items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const calcularEnvio = subtotal => subtotal > 1000 ? 0 : 100;
  const calcularTotal = (subtotal, envio) => subtotal + envio;

  const subtotal = calcularSubtotal(cartItems);
  const shippingCost = calcularEnvio(subtotal);
  const total = calcularTotal(subtotal, shippingCost);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (activeStep === 0) {
      setShippingData({ ...shippingData, [name]: value });
      setShippingErrors({ ...shippingErrors, [name]: "" });
    } else {
      setPaymentData({
        ...paymentData,
        [name]: type === "checkbox" ? checked : value
      });
      setPaymentErrors({ ...paymentErrors, [name]: "" });
    }
  };

  const validateShipping = () => {
    const errs = {};
    let ok = true;
    if (!shippingData.nombre?.trim())        { errs.nombre = "Requerido"; ok = false; }
    if (!shippingData.apellido?.trim())      { errs.apellido = "Requerido"; ok = false; }
    if (!shippingData.direccion?.trim())     { errs.direccion = "Requerido"; ok = false; }
    if (!shippingData.ciudad?.trim())        { errs.ciudad = "Requerido"; ok = false; }
    if (!/^\d{4,}$/.test(shippingData.codigoPostal)) { errs.codigoPostal = "Inválido"; ok = false; }
    if (!shippingData.pais)                  { errs.pais = "Requerido"; ok = false; }
    if (!/^\d{7,}$/.test(shippingData.telefono))      { errs.telefono = "Inválido"; ok = false; }
    setShippingErrors(errs);
    return ok;
  };

  const validatePayment = () => {
    const errs = {};
    let ok = true;
    if (paymentMethod === "credit-card") {
      if (!/^\d{16}$/.test(paymentData.cardNumber)) {
        errs.cardNumber = "Debe tener 16 dígitos"; ok = false;
      }
      if (!/^(0[1-9]|1[0-2])\/([2-9][0-9])$/.test(paymentData.expiryDate)) {
        errs.expiryDate = "Formato MM/AA inválido"; ok = false;
      } else {
        const [m, y] = paymentData.expiryDate.split("/");
        const month  = +m, year = 2000 + +y;
        const now    = new Date();
        if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth()+1)) {
          errs.expiryDate = "Tarjeta expirada"; ok = false;
        }
      }
      if (!/^\d{3,4}$/.test(paymentData.cvv)) {
        errs.cvv = "3 o 4 dígitos"; ok = false;
      }
    }
    setPaymentErrors(errs);
    return ok;
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!validateShipping()) return;
      setActiveStep(1);

    } else if (activeStep === 1) {
      if (paymentMethod === "credit-card") {
        if (!validatePayment()) return;
        setActiveStep(2);
      } else {
        setPaypalInProgress(true);
        setTimeout(() => {
          setPaypalInProgress(false);
          setActiveStep(2);
        }, 2000);
      }

    } else {
      // ✅ Validación agregada: evitar confirmar si carrito está vacío
      if (!cartItems.length) {
        setSnackbar({ open: true, message: "Tu carrito está vacío", severity: "error" });
        return;
      }

      try {
        await axios.post(`/api/orders/create/${user.id}`, null, { headers });
        await axios.delete(`/api/cart/${user.id}/clear`,       { headers });

        setCartItems([]);
        setShowThankYou(true);
      } catch (e) {
        setSnackbar({ open: true, message: "Error al crear la orden", severity: "error" });
      }
    }
  };

  const handleBack = () => setActiveStep(s => s - 1);
  const handleCloseSnackbar = () => setSnackbar(s => ({ ...s, open: false }));
  const handleCloseThankYou = () => {
    setShowThankYou(false);
    navigate("/orders");
  };

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif", py: 4, px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>Finalizar Compra</Typography>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map(label => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Paper sx={{ p:3, mb:3, border:"1px solid #eee" }}>
          <Grid container spacing={2}>
            {[
              { label: "Nombre", name:"nombre", xs:6 },
              { label: "Apellido", name:"apellido", xs:6 },
              { label: "Dirección", name:"direccion", xs:12 },
              { label: "Ciudad", name:"ciudad", xs:6 },
              { label: "Código Postal", name:"codigoPostal", xs:6 },
            ].map(({ label, name, xs }) => (
              <Grid item xs={12} sm={xs} key={name}>
                <TextField
                  fullWidth label={label} name={name}
                  value={shippingData[name]||""}
                  onChange={handleChange}
                  error={!!shippingErrors[name]}
                  helperText={shippingErrors[name]}
                />
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!shippingErrors.pais}>
                <InputLabel>País</InputLabel>
                <Select
                  name="pais"
                  value={shippingData.pais||""}
                  onChange={handleChange}
                  label="País"
                >
                  <MenuItem value="">Seleccionar</MenuItem>
                  <MenuItem value="AR">Argentina</MenuItem>
                </Select>
                <FormHelperText>{shippingErrors.pais}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Teléfono" name="telefono"
                value={shippingData.telefono||""}
                onChange={handleChange}
                error={!!shippingErrors.telefono}
                helperText={shippingErrors.telefono}
              />
            </Grid>
          </Grid>
          <Box sx={{ display:"flex", justifyContent:"flex-end", mt:3 }}>
            <Button variant="contained" onClick={handleNext}>
              Continuar a Pago
            </Button>
          </Box>
        </Paper>
      )}

      {activeStep === 1 && (
        <Paper sx={{ p:3, mb:3, border:"1px solid #eee" }}>
          <RadioGroup row value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)}>
            <FormControlLabel value="credit-card" control={<Radio/>} label="Tarjeta"/>
            <FormControlLabel value="paypal" control={<Radio/>} label="PayPal"/>
          </RadioGroup>

          {paymentMethod === "credit-card" && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Número de Tarjeta"
                  name="cardNumber" value={paymentData.cardNumber||""}
                  onChange={handleChange}
                  error={!!paymentErrors.cardNumber}
                  helperText={paymentErrors.cardNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="MM/AA"
                  name="expiryDate" value={paymentData.expiryDate||""}
                  onChange={handleChange}
                  error={!!paymentErrors.expiryDate}
                  helperText={paymentErrors.expiryDate}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="CVV"
                  name="cvv" value={paymentData.cvv||""}
                  onChange={handleChange}
                  error={!!paymentErrors.cvv}
                  helperText={paymentErrors.cvv}
                />
              </Grid>
            </Grid>
          )}

          {paymentMethod === "paypal" && (
            <Box textAlign="center" mt={2}>
              <Button
                variant="contained" color="warning"
                disabled={paypalInProgress}
                onClick={() => {
                  setPaypalInProgress(true);
                  setTimeout(()=>{
                    setPaypalInProgress(false);
                    setActiveStep(2);
                  },2000);
                }}
              >
                {paypalInProgress ? "Procesando..." : "Pagar con PayPal"}
              </Button>
            </Box>
          )}

          <Box sx={{ display:"flex", justifyContent:"space-between", mt:3 }}>
            <Button onClick={handleBack}>Atrás</Button>
            <Button variant="contained" onClick={handleNext}>Revisar Pedido</Button>
          </Box>
        </Paper>
      )}

      {activeStep === 2 && (
        <Paper sx={{ p:3, mb:3, border:"1px solid #eee" }}>
          <Typography variant="h6">Envío</Typography>
          <Typography>{shippingData.nombre} {shippingData.apellido}</Typography>
          <Typography>{shippingData.direccion}, {shippingData.ciudad}</Typography>
          <Typography>CP {shippingData.codigoPostal}, {shippingData.pais}</Typography>
          <Typography>Tel: {shippingData.telefono}</Typography>

          <Divider sx={{ my:2 }}/>

          <Typography variant="h6">Pago</Typography>
          <Typography>
            {paymentMethod==="credit-card"
              ? "Tarjeta ****"+paymentData.cardNumber?.slice(-4)
              : "PayPal"}
          </Typography>

          <Divider sx={{ my:2 }}/>

          <Typography variant="h6">Productos</Typography>
          {cartItems.map(i=>(
            <Box key={i.id} sx={{ display:"flex", justifyContent:"space-between", py:1 }}>
              <Typography>{i.name} x{i.quantity}</Typography>
              <Typography>${(i.price * i.quantity).toFixed(2)}</Typography>
            </Box>
          ))}

          <Divider sx={{ my:2 }}/>

          <Box sx={{ display:"flex", justifyContent:"space-between" }}>
            <Typography>Subtotal:</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display:"flex", justifyContent:"space-between" }}>
            <Typography>Envío:</Typography>
            <Typography>${shippingCost.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ my:1 }}/>
          <Box sx={{ display:"flex", justifyContent:"space-between" }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display:"flex", justifyContent:"space-between", mt:3 }}>
            <Button onClick={handleBack}>Atrás</Button>
            <Button variant="contained" onClick={handleNext}>Confirmar Pedido</Button>
          </Box>
        </Paper>
      )}

      <Dialog open={showThankYou} onClose={handleCloseThankYou}>
        <DialogTitle>¡Gracias por tu compra!</DialogTitle>
        <DialogContent>
          <Typography>Tu orden se creó correctamente.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseThankYou}>Aceptar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
