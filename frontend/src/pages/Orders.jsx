// src/pages/Orders.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const headers = { Authorization: `Bearer ${token}` };
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios
      .get(`/api/orders/user/${user.id}`, { headers })
      .then(({ data }) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, token]);

  if (loading) return <Typography>Cargando pedidos…</Typography>;
  if (!orders.length) return <Typography>No tenés pedidos aún.</Typography>;

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Pedidos
      </Typography>
      <List disablePadding>
        {orders.map((o) => (
          <Paper key={o.id} sx={{ mb: 2, p: 2 }}>
            <Typography>
              <strong>Pedido #{o.id}</strong> —{" "}
              {new Date(o.createdAt).toLocaleString()}
            </Typography>
            <Typography>Estado: {o.status}</Typography>
            <Divider sx={{ my: 1 }} />
            {o.items.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 0.5,
                }}
              >
                <Typography>
                  {item.productName} x{item.quantity}
                </Typography>
                <Typography>${item.subtotal.toFixed(2)}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Total:</Typography>
              <Typography>${o.totalAmount.toFixed(2)}</Typography>
            </Box>
          </Paper>
        ))}
      </List>
    </Box>
  );
}
