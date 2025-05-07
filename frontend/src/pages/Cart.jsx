import React, {useEffect} from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  useMediaQuery,
  Card,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const Cart = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [cartItems, setCartItems] = React.useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/cartItems")
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Error al cargar elementos del carrito:", err));
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCost = subtotal > 100 ? 0 : 10;
  const total = subtotal + shippingCost;

  const handleIncrement = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if(item && item.quantity < item.stock) {
     const updatedItem = { ...item, quantity: item.quantity + 1};

     axios.put(`http://localhost:3001/cartItems/${id}`, updatedItem)
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.map((i) => (i.id === id ? updatedItem : i))
        );
      })
      .catch((err) => console.error("Error al actualizar el carrito:", err));
   }
  };

  const handleDecrement = (id) => {
   const item = cartItems.find((i) => i.id === id);
   if(item && item.quantity > 1) {
    const updatedItem = { ...item, quantity: item.quantity - 1};

    axios.put(`http://localhost:3001/cartItems/${id}`, updatedItem)
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.map((i) => (i.id === id ? updatedItem : i))
        );
      })
      .catch((err) => console.error("Error al actualizar el carrito:", err));
   }
  };

  const handleRemove = (id) => {
    axios.delete(`http://localhost:3001/cartItems/${id}`)
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Error al eliminar el producto:", err));
  };

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Header reutilizable */}
      <Header />

      {/* Contenido principal */}
      <Box
        sx={{
          px: isMobile ? 2 : 4,
          py: 3,
          minHeight: "70vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Lista de productos */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              letterSpacing: "1px",
              mb: 2,
              fontSize: "0.9rem",
            }}
          >
            {cartItems.length} PRODUCTOS
          </Typography>

          <Stack spacing={2}>
            {cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  p: 2,
                  borderRadius: 0,
                  boxShadow: "none",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    mr: 2,
                  }}
                />

                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, letterSpacing: "0.5px" }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#666", fontSize: "0.8rem", mt: 0.5 }}
                  >
                    ${item.price.toFixed(2)}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1.5,
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 0,
                        p: 0.5,
                      }}
                      onClick={() => handleDecrement(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="body1"
                      sx={{ minWidth: "24px", textAlign: "center" }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: 0,
                        p: 0.5,
                      }}
                      onClick={() => handleIncrement(item.id)}
                      disabled={item.quantity >= item.stock}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>
                    ${(item.quantity * item.price).toFixed(2)}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(item.id)}
                    sx={{ color: "#999" }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Resumen del pedido */}
        <Box sx={{ width: { xs: "100%", md: 300 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              letterSpacing: "1px",
              mb: 2,
              fontSize: "0.9rem",
            }}
          >
            RESUMEN DEL PEDIDO
          </Typography>

          <Paper
            sx={{
              p: 2,
              borderRadius: 0,
              boxShadow: "none",
              border: "1px solid #f0f0f0",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body2">Subtotal:</Typography>
                <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="body2">Envío:</Typography>
                <Typography variant="body2">${shippingCost.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Total:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRadius: 0,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              FINALIZAR COMPRA
            </Button>
          </Paper>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 2,
              borderColor: "black",
              color: "black",
              borderRadius: 0,
              py: 1.5,
            }}
          >
            CONTINUAR COMPRANDO
          </Button>
        </Box>
      </Box>

      {/* Footer reutilizable */}
      <Footer />
    </Box>
  );
};

export default Cart;