import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  TextField,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  // Simulación de productos en el carrito
  const cartItems = [
    {
      id: 1,
      name: 'Auriculares Bluetooth',
      quantity: 2,
      price: 50,
    },
    {
      id: 2,
      name: 'Remera Estampada',
      quantity: 1,
      price: 25,
    },
    {
      id: 3,
      name: 'Libro de React',
      quantity: 3,
      price: 30,
    },
  ];

  const shippingCost = 10;
  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const total = subtotal + shippingCost;

  return (
    <Box sx={{ padding: 4 }}>
      {/* Título principal */}
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>

      {/* Listado de productos */}
      <Grid container spacing={2}>
        {cartItems.map((item) => (
          <Grid item xs={12} md={8} key={item.id}>
            <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
              {/* Simulación de imagen */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 2,
                }}
              >
                <Typography variant="caption">Imagen</Typography>
              </Box>

              {/* Detalles del producto */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">Precio unitario: ${item.price}</Typography>
                <Typography variant="body2">Cantidad: {item.quantity}</Typography>
                <Typography variant="body2">
                  Total: ${item.quantity * item.price}
                </Typography>
              </Box>

              {/* Botón para eliminar */}
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}

        {/* Resumen del carrito */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen del Pedido
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Subtotal:</Typography>
              <Typography>${subtotal}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Envío:</Typography>
              <Typography>${shippingCost}</Typography>
            </Box>
            <Divider sx={{ marginY: 1 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight="bold">
                Total:
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ${total}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Botones de acción */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button variant="outlined" color="primary">
          Continuar Comprando
        </Button>
        <Button variant="contained" color="primary">
          Finalizar Compra
        </Button>
      </Box>

      {/* Comentario para carrito vacío */}
      {/* 
      Si el carrito estuviera vacío, podrías mostrar algo como esto:
      <Box mt={4}>
        <Typography variant="h6">Tu carrito está vacío.</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Ir a la Tienda
        </Button>
      </Box>
      */}
    </Box>
  );
};

export default Cart;
