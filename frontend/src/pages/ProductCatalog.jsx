import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
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
  Stack,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const defaultImage =
  "https://via.placeholder.com/800?text=Imagen+no+disponible";
const categories = ["Tecnología", "Hogar", "Ropa", "Libros", "Juguetes"];

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  //funciones para obtener el carrito
  const obtenerCarrito = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      return JSON.parse(carritoGuardado);
    } else {
      return [];
    }
  };

  const guardarCarrito = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const agregarAlCarrito = (producto) => {
    const carritoActual = obtenerCarrito();
    const productoExistente = carritoActual.find(
      (item) => item.id === producto.id
    );

    if (productoExistente) {
      productoExistente.quantity = (productoExistente.quantity || 0) + 1;
      console.log(`Cantidad de "${producto.name}" incrementada.`);
    } else {
      carritoActual.push({ ...producto, quantity: 1, price: producto.price });
      console.log(`"${producto.name}" agregado al carrito.`);
    }

    guardarCarrito(carritoActual);
    // Opcional: Mostrar un mensaje o actualizar un contador visual del carrito
  };

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
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Header reutilizable */}
      <Header />

      {/* DRAWER */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          width={250}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            Categorías
          </Typography>
          <List>
            {categories.map((cat, index) => (
              <ListItem button key={index}>
                <ListItemText primary={cat} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* CATÁLOGO */}
      <Box px={isMobile ? 2 : 4} py={4}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            letterSpacing: "1px",
            textAlign: "center",
            mb: 4,
          }}
        >
          CATÁLOGO DE PRODUCTOS
        </Typography>
        <Grid container spacing={3}>
          {products
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  onClick={() => setSelectedProduct(product)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 0,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    onError={(e) => (e.target.src = defaultImage)}
                    alt={product.name}
                    sx={{
                      height: 230,
                      width: "100%",
                      objectFit: "cover",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ fontWeight: 500 }}
                    >
                      {product.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* MODAL */}
      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.name}</DialogTitle>
            <DialogContent>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                onError={(e) => (e.target.src = defaultImage)}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  marginBottom: "1rem",
                }}
              />
              <Typography>{selectedProduct.description}</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "1rem" }}
                disabled={!selectedProduct.stock}
                onClick={() => agregarAlCarrito(selectedProduct)}
              >
                {selectedProduct.stock ? "Agregar al Carrito" : "Sin Stock"}
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Footer reutilizable */}
      <Footer />
    </Box>
  );
}

export default ProductCatalog;
