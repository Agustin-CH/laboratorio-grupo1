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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


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

          {/* Listado de productos - AHORA EN COLUMNA */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
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

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">Precio unitario: ${item.price}</Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => handleDecrement(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body1" sx={{ minWidth: '20px', textAlign: 'center' }}>
                    {item.quantity}
                  </Typography>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Total: ${item.quantity * item.price}
                </Typography>
              </Box>

              <IconButton color="error" onClick={() => handleRemove(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Card>
        ))}
      </Box>

          {/* Resumen del carrito - AHORA FUERA DEL GRID ANTERIOR */}
          <Grid container spacing={2}>
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
