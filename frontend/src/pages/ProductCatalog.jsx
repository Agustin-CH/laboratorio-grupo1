// src/pages/ProductCatalog.jsx
import React, { useState, useEffect, useContext } from "react";
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
  CircularProgress,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const defaultImage = "/placeholder.png";
const theme = createTheme({
  typography: { fontFamily: "'Poppins', 'Helvetica Neue', sans-serif" },
});

export default function ProductCatalog() {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  useEffect(() => {
    api.get("/categories")
      .then(res => setCategories(res.data))
      .catch(() => setSnackbar({ open: true, message: "No pude cargar categorías", severity: "error" }));
  }, []);

  useEffect(() => {
    setLoading(true);
    const endpoint = selectedCategoryId == null ? "/products" : `/categories/${selectedCategoryId}/products`;

    api.get(endpoint)
      .then(res => setProducts(res.data))
      .catch(() => setSnackbar({ open: true, message: "Error al cargar productos", severity: "error" }))
      .finally(() => setLoading(false));
  }, [selectedCategoryId]);

  useEffect(() => {
    if (!user?.id) return setCartItems([]);
    api.get(`/cart/${user.id}`)
      .then(res => setCartItems(res.data.items))
      .catch(() => setSnackbar({ open: true, message: "No pude cargar el carrito", severity: "error" }));
  }, [user]);

  const handleAgregarAlCarrito = (productId, qty) => {
    if (!user?.id) {
      navigate("/login");
      return;
    }
    api.post(`/cart/${user.id}/add/${productId}`, null, { params: { quantity: qty } })
      .then(() => api.get(`/cart/${user.id}`))
      .then(res => {
        setCartItems(res.data.items);
        setSnackbar({ open: true, message: "Producto agregado al carrito", severity: "success" });
      })
      .catch(() => setSnackbar({ open: true, message: "Error al agregar al carrito", severity: "error" }))
      .finally(() => setSelectedProduct(null));
  };

  const handleSnackbarClose = () => setSnackbar(s => ({ ...s, open: false }));
  const toggleDrawer = open => () => setDrawerOpen(open);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1 }}>
        <IconButton onClick={toggleDrawer(true)}><FilterListIcon/></IconButton>
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box width={250} role="presentation" onKeyDown={toggleDrawer(false)}>
          <Typography variant="h6" sx={{ p: 2 }}>Categorías</Typography>
          <List>
            <ListItem button selected={selectedCategoryId == null} onClick={() => { setSelectedCategoryId(null); setDrawerOpen(false); }}>
              <ListItemText primary="Todos" />
            </ListItem>
            {categories.map(cat => (
              <ListItem button key={cat.id} selected={selectedCategoryId === cat.id} onClick={() => { setSelectedCategoryId(cat.id); setDrawerOpen(false); }}>
                <ListItemText primary={cat.name}/>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box px={isMobile ? 2 : 4} py={2}>
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 2 }}>
          {selectedCategoryId == null
            ? "Catálogo de Productos"
            : `Categoría: ${categories.find(c => c.id === selectedCategoryId)?.name || ""}`}
        </Typography>

        {loading
          ? <Box sx={{ textAlign: "center", py: 6 }}><CircularProgress/></Box>
          : <Grid container spacing={3}>
              {products.length > 0
                ? products.sort((a, b) => a.name.localeCompare(b.name)).map(prod => {
                    const inCart = cartItems.find(i => i.productId === prod.id)?.quantity || 0;
                    const available = Math.max(0, prod.stock - inCart);
                    return (
                      <Grid item xs={12} sm={6} md={4} key={prod.id}>
                        <Card sx={{ cursor: "pointer", borderRadius: 1, boxShadow: 2 }} onClick={() => { setSelectedProduct(prod); setQuantityToAdd(1); }}>
                          <CardMedia
                            component="img"
                            image={prod.imageUrl || defaultImage}
                            onError={e => e.target.src = defaultImage}
                            alt={prod.name}
                            sx={{ height: 230, objectFit: "cover", backgroundColor: "#f5f5f5" }}
                          />
                          {available <= 0 && (
                            <Typography variant="subtitle2" color="error" sx={{ textAlign:"center", mt:1, fontWeight:"bold" }}>
                              Sin stock
                            </Typography>
                          )}
                          <CardContent sx={{ textAlign: "center" }}>
                            <Typography variant="h6">{prod.name}</Typography>
                            <Typography variant="subtitle1">${prod.price.toFixed(2)}</Typography>
                            <Typography variant="subtitle2" color={available>0?"textSecondary":"error"}>
                              Disponibles: {available}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })
                : <Box sx={{ width:"100%", textAlign:"center", mt:4 }}>
                    <Typography>No hay productos.</Typography>
                  </Box>
              }
            </Grid>
        }
      </Box>

      <Dialog open={!!selectedProduct} onClose={() => setSelectedProduct(null)} fullWidth>
        {selectedProduct && (() => {
          const inCart = cartItems.find(i => i.productId === selectedProduct.id)?.quantity || 0;

          // ✅ Validación extra: asegurarse que el stock no sea negativo ni inválido
          const stockSeguro = Math.max(0, selectedProduct.stock || 0);
          const available = stockSeguro - inCart;

          return (
            <>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogContent>
                <CardMedia
                  component="img"
                  image={selectedProduct.imageUrl || defaultImage}
                  onError={e => e.target.src = defaultImage}
                  alt={selectedProduct.name}
                  sx={{ width:"100%", height:250, objectFit:"cover", mb:2 }}
                />
                {available <= 0 && (
                  <Typography variant="subtitle2" color="error" sx={{ mb:2, fontWeight:"bold" }}>
                    Sin stock
                  </Typography>
                )}
                <Typography>{selectedProduct.description}</Typography>
                <Typography sx={{ mt:1 }}>Precio: ${selectedProduct.price.toFixed(2)}</Typography>
                <Typography sx={{ mb:2 }} color={available>0?"textSecondary":"error"}>
                  Stock disponible: {available}
                </Typography>
                <TextField
                  label="Cantidad"
                  type="number"
                  value={quantityToAdd}
                  onChange={e => {
                    let v = parseInt(e.target.value, 10) || 1;
                    if (v < 1) v = 1;
                    if (v > available) v = available;
                    setQuantityToAdd(v);
                  }}
                  inputProps={{ min: 1, max: available }}
                  fullWidth
                  sx={{ mb:2 }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  disabled={available <= 0}
                  onClick={() => handleAgregarAlCarrito(selectedProduct.id, quantityToAdd)}
                >
                  {available > 0 ? `Agregar ${quantityToAdd}` : "Sin Stock"}
                </Button>
              </DialogContent>
            </>
          );
        })()}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
