import React from "react";
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

const Cart = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      name: "Auriculares Bluetooth",
      quantity: 2,
      price: 50,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 2,
      name: "Remera Estampada",
      quantity: 1,
      price: 25,
      image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9",
    },
    {
      id: 3,
      name: "Libro de React",
      quantity: 3,
      price: 30,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    },
  ]);

  const shippingCost = 10;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const total = subtotal + shippingCost;

  const handleIncrement = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: isMobile ? 2 : 4,
          py: 2,
          borderBottom: "1px solid #e0e0e0",
          position: "sticky",
          top: 0,
          bgcolor: "white",
          zIndex: 1000,
        }}
      >
        <ArrowBackIcon />
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ letterSpacing: "4px", fontWeight: 400 }}
        >
          CARRITO
        </Typography>
        <ShoppingBagIcon />
      </Box>

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

      {/* Footer promo */}
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          py: 1,
          fontSize: "0.75rem",
          position: "relative",
        }}
      >
        ENVÍO GRATIS EN COMPRAS SUPERIORES A $100.000
      </Box>
    </Box>
  );
};

export default Cart;