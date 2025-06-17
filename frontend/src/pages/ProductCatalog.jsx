import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
  TextField,
  IconButton,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import api from "../services/api"; // usa el proxy a /api
import { obtenerCarrito, agregarAlCarrito } from "../utils/CartUtils";

const defaultImage = "https://via.placeholder.com/800?text=No+Image";
const categories = ["Todos", "Tecnología", "Hogar", "Ropa", "Libros", "Juguetes"];
const theme = createTheme({
  typography: { fontFamily: "'Poppins', 'Helvetica Neue', sans-serif" },
});

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setCartItems(obtenerCarrito());
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAgregarAlCarrito = (product, quantity) => {
    const { carritoActualizado, message } = agregarAlCarrito(product, quantity);
    setCartItems(carritoActualizado);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSelectedProduct(null);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDrawerOpen(false);
  };

  const displayedProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.categoryName === selectedCategory);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          bgcolor: "background.paper",
        }}
      >
        <IconButton onClick={toggleDrawer(true)}>
          <FilterListIcon />
        </IconButton>
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box width={250} role="presentation" onKeyDown={toggleDrawer(false)}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Categorías
          </Typography>
          <List>
            {categories.map((cat) => (
              <ListItem
                button
                key={cat}
                selected={cat === selectedCategory}
                onClick={() => handleCategorySelect(cat)}
              >
                <ListItemText primary={cat} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box px={isMobile ? 2 : 4} py={2}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, textAlign: "center", mb: 2 }}
        >
          {selectedCategory === "Todos"
            ? "Catálogo de Productos"
            : `Categoría: ${selectedCategory}`}
        </Typography>
        <Grid container spacing={3}>
          {displayedProducts.length ? (
            displayedProducts
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((product) => {
                const inCart =
                  cartItems.find((item) => item.id === product.id)
                    ?.quantity || 0;
                const available = Math.max(0, product.stock - inCart);
                return (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card
                      sx={{ cursor: "pointer", borderRadius: 1, boxShadow: 2 }}
                      onClick={() => {
                        setSelectedProduct(product);
                        setQuantityToAdd(1);
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={product.imageUrl || defaultImage}
                        onError={(e) => (e.target.src = defaultImage)}
                        alt={product.name}
                        sx={{
                          height: 230,
                          objectFit: "cover",
                          backgroundColor: "#f5f5f5",
                        }}
                      />
                      {available <= 0 && (
                        <Typography
                          variant="subtitle2"
                          color="error"
                          sx={{
                            textAlign: "center",
                            mt: 1,
                            fontWeight: "bold",
                          }}
                        >
                          Sin stock
                        </Typography>
                      )}
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h6" gutterBottom>
                          {product.name}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                          ${product.price.toFixed(2)}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color={available > 0 ? "textSecondary" : "error"}
                        >
                          Disponibles: {available}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
          ) : (
            <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
              <Typography>No hay productos en esta categoría.</Typography>
            </Box>
          )}
        </Grid>
      </Box>

      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        fullWidth
      >
        {selectedProduct && (() => {
          const inCart =
            cartItems.find((item) => item.id === selectedProduct.id)
              ?.quantity || 0;
          const available = selectedProduct.stock - inCart;
          return (
            <>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogContent>
                <CardMedia
                  component="img"
                  image={selectedProduct.imageUrl || defaultImage}
                  onError={(e) => (e.target.src = defaultImage)}
                  alt={selectedProduct.name}
                  sx={{
                    width: "100%",
                    height: 250,
                    objectFit: "cover",
                    mb: 2,
                  }}
                />
                {available <= 0 && (
                  <Typography
                    variant="subtitle2"
                    color="error"
                    sx={{
                      textAlign: "center",
                      mb: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Sin stock
                  </Typography>
                )}
                <Typography>{selectedProduct.description}</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Precio: ${selectedProduct.price.toFixed(2)}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 2 }}
                  color={available > 0 ? "textSecondary" : "error"}
                >
                  Stock disponible: {available}
                </Typography>
                <TextField
                  label="Cantidad"
                  type="number"
                  value={quantityToAdd}
                  onChange={(e) => {
                    let val = parseInt(e.target.value, 10) || 1;
                    if (val < 1) val = 1;
                    if (val > available) val = available;
                    setQuantityToAdd(val);
                  }}
                  inputProps={{ min: 1, max: available }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  disabled={available <= 0}
                  onClick={() =>
                    handleAgregarAlCarrito(selectedProduct, quantityToAdd)
                  }
                >
                  {available > 0 ? `Agregar ${quantityToAdd}` : "Sin Stock"}
                </Button>
              </DialogContent>
            </>
          );
        })()}
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default ProductCatalog;
