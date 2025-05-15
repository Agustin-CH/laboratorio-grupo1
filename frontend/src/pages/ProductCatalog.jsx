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
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const defaultImage = "https://via.placeholder.com/800?text=Imagen+no+disponible";
const categories = ["Todos", "Tecnología", "Hogar", "Ropa", "Libros", "Juguetes"];

// Tema global con tipografía
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', 'Helvetica Neue', sans-serif",
  },
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

  // Obtener carrito de localStorage
  const obtenerCarrito = () => {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
  };

  // Guardar carrito en localStorage
  const guardarCarrito = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  // Sincronizar estado de carrito al montar
  useEffect(() => {
    setCartItems(obtenerCarrito());
  }, []);

  // Añadir productos al carrito respetando stock
  const agregarAlCarrito = (producto, quantity) => {
    const carritoActual = obtenerCarrito();
    const idx = carritoActual.findIndex((item) => item.id === producto.id);
    const inCartQty = idx >= 0 ? carritoActual[idx].quantity : 0;
    const available = producto.stock - inCartQty;
    const toAdd = Math.min(quantity, available);
    let newQuantity;

    if (idx >= 0) {
      carritoActual[idx].quantity += toAdd;
      newQuantity = carritoActual[idx].quantity;
    } else {
      carritoActual.push({ ...producto, quantity: toAdd, price: producto.price });
      newQuantity = toAdd;
    }

    guardarCarrito(carritoActual);
    setCartItems(carritoActual);

    if (toAdd <= 0) {
      setSnackbarMessage(`No puedes añadir más de ${producto.stock} unidades de "${producto.name}".`);
    } else {
      const remaining = producto.stock - newQuantity;
      setSnackbarMessage(
        `Has agregado ${toAdd} unidad(es) de "${producto.name}". Total en carrito: ${newQuantity}. Puedes añadir ${remaining} más.`
      );
    }
    setSnackbarOpen(true);
  };

  // Cargar productos desde API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProducts();
  }, []);

  // Cerrar snackbar
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Controlar apertura/cierre de drawer
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  // Seleccionar categoría y cerrar drawer
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDrawerOpen(false);
  };

  // Filtrar productos según categoría seleccionada
  const displayedProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <ThemeProvider theme={theme}>
      {/* Contenedor de Header y filtro */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, bgcolor: 'background.paper' }}>
        {/* Botón de filtro a la izquierda */}
        <IconButton onClick={toggleDrawer(true)}>
          <FilterListIcon />
        </IconButton>
        {/* Header con íconos (incluye el ícono de casita) */}
        <Header />
      </Box>

      {/* Drawer de categorías */}
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

      {/* Catálogo de productos */}
      <Box px={isMobile ? 2 : 4} py={2}>
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 2 }}>
          {selectedCategory === 'Todos' ? 'Catálogo de Productos' : `Categoría: ${selectedCategory}`}
        </Typography>
        <Grid container spacing={3}>
          {displayedProducts.length ? (
            displayedProducts.sort((a, b) => a.name.localeCompare(b.name)).map((product) => {
              const inCart = cartItems.find(item => item.id === product.id)?.quantity || 0;
              const available = product.stock - inCart;
              return (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card sx={{ cursor: 'pointer', borderRadius: 1, boxShadow: 2 }} onClick={() => { setSelectedProduct(product); setQuantityToAdd(1); }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      onError={e => e.target.src = defaultImage}
                      alt={product.name}
                      sx={{ height: 230, objectFit: 'cover', backgroundColor: '#f5f5f5' }}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Typography variant="subtitle2" color={available > 0 ? 'textSecondary' : 'error'}>
                        Disponibles: {available}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
              <Typography>No hay productos en esta categoría.</Typography>
            </Box>
          )}
        </Grid>
      </Box>

      {/* Modal de detalle del producto */}
      <Dialog open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)} fullWidth>
        {selectedProduct && (() => {
          const inCart = cartItems.find(item => item.id === selectedProduct.id)?.quantity || 0;
          const available = selectedProduct.stock - inCart;
          return (
            <>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogContent>
                <CardMedia
                  component="img"
                  image={selectedProduct.image}
                  onError={e => e.target.src = defaultImage}
                  alt={selectedProduct.name}
                  sx={{ width: '100%', height: 250, objectFit: 'cover', mb: 2 }}
                />
                <Typography>{selectedProduct.description}</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Precio: ${selectedProduct.price.toFixed(2)}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }} color={available > 0 ? 'textSecondary' : 'error'}>
                  Stock disponible: {available}
                </Typography>
                <TextField
                  label="Cantidad"
                  type="number"
                  value={quantityToAdd}
                  onChange={e => {
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
                  onClick={() => agregarAlCarrito(selectedProduct, quantityToAdd)}
                >
                  {available > 0 ? `Agregar ${quantityToAdd}` : 'Sin Stock'}
                </Button>
              </DialogContent>
            </>
          );
        })()}
      </Dialog>

      {/* Snackbar de notificaciones */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </ThemeProvider>
  );
}

export default ProductCatalog;