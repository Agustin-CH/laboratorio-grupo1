import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Box, Typography, Stack, Card, IconButton,
  Button, Paper, Divider, Snackbar, Alert, useMediaQuery
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Cart() {
  const { user, token } = useContext(AuthContext);
  const headers = { Authorization: `Bearer ${token}` };
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [snack, setSnack] = useState({ open:false, message:"", severity:"info" });

  const fetchCart = () => {
    axios.get(`/api/cart/${user.id}`, { headers })
      .then(r => {
        setItems(r.data.items.map(i => ({
          id: i.productId,
          name: i.productName,
          price: parseFloat(i.unitPrice),
          quantity: i.quantity,
          stock: i.stock,           
          imageUrl: i.imageUrl      
        })));
      })
      .catch(() => setSnack({ open:true, message:"No se pudo cargar el carrito", severity:"error" }));
  };

  useEffect(fetchCart, [user.id]);

  const updateQty = (pid, delta) => {
    axios.post(`/api/cart/${user.id}/add/${pid}?quantity=${delta}`, null, { headers })
      .then(fetchCart)
      .catch(() => setSnack({ open:true, message:"Error actualizando cantidad", severity:"error" }));
  };

  const removeItem = pid => {
    axios.delete(`/api/cart/${user.id}/remove/${pid}`, { headers })
      .then(fetchCart)
      .catch(() => setSnack({ open:true, message:"Error eliminando producto", severity:"error" }));
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <Box sx={{ px: isMobile ? 2 : 4, py: 3, display:"flex", gap:4, minHeight:"70vh" }}>
      {/* Lista */}
      <Box flex={1}>
        <Typography variant="h6" mb={2}>
          {items.length} productos
        </Typography>
        <Stack spacing={2}>
          {items.map(i => (
            <Card key={i.id} sx={{ display:"flex", p:2, borderBottom:"1px solid #eee" }}>
              <Box
                sx={{
                  width:80, height:80,
                  background: `url(${i.imageUrl}) center/cover no-repeat`,
                  mr:2
                }}
              />
              <Box flexGrow={1}>
                <Typography fontWeight={500}>{i.name}</Typography>
                <Typography color="#666">${i.price.toFixed(2)}</Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <IconButton size="small" onClick={() => updateQty(i.id, -1)} disabled={i.quantity <= 1}>
                    <RemoveIcon fontSize="small"/>
                  </IconButton>
                  <Typography mx={1}>{i.quantity}</Typography>
                  <IconButton size="small" onClick={() => updateQty(i.id, +1)} disabled={i.quantity >= i.stock}>
                    <AddIcon fontSize="small"/>
                  </IconButton>
                </Box>
              </Box>
              <Box textAlign="right">
                <Typography fontWeight={500}>
                  ${(i.price * i.quantity).toFixed(2)}
                </Typography>
                <IconButton onClick={() => removeItem(i.id)} sx={{ color:"#999" }}>
                  <DeleteIcon fontSize="small"/>
                </IconButton>
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* Resumen */}
      <Box sx={{ width: { xs:"100%", md:300 } }}>
        <Paper sx={{ p:2, mb:2, border:"1px solid #eee" }}>
          <Box display="flex" justifyContent="space-between">
            <Typography>Subtotal:</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Envío:</Typography>
            <Typography>${shipping.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ my:1 }}/>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={600}>Total:</Typography>
            <Typography fontWeight={600}>${total.toFixed(2)}</Typography>
          </Box>
        </Paper>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/checkout")}
          disabled={!items.length}
        >
          Finalizar compra
        </Button>
        <Button
          component={Link}
          to="/catalogo"
          variant="outlined"
          fullWidth
          sx={{ mt:2 }}
        >
          Seguir comprando
        </Button>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack(s => ({ ...s, open:false }))}
        anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
}
