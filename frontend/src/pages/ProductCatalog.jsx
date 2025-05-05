import React, { useState } from "react";
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

const defaultImage = "https://via.placeholder.com/800?text=Imagen+no+disponible";
const categories = ["Tecnología", "Hogar", "Ropa", "Libros", "Juguetes"];

const products = [
  {
    name: "Auriculares",
    image: "https://images.unsplash.com/photo-1583360173899-b3124bc238d9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Auriculares con cancelación de ruido",
    stock: true,
  },
  {
    name: "Lámpara",
    image: "https://images.unsplash.com/photo-1652161854022-91f94b974d73?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Lámpara de escritorio LED",
    stock: false,
  },
  {
    name: "Zapatillas",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Zapatillas deportivas",
    stock: true,
  },
  {
    name: "Libro",
    image: "https://images.unsplash.com/photo-1689289850637-65e74bf075f5?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Libro de ciencia ficción",
    stock: true,
  },
  {
    name: "Monitor",
    image: "https://plus.unsplash.com/premium_photo-1680721575441-18d5a0567269?q=80&w=1404&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: 'Monitor 27" Full HD',
    stock: true,
  },
  {
    name: "Silla Gamer",
    image: "https://images.unsplash.com/photo-1594501252356-79ebbbb10dd9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Silla ergonómica para gaming",
    stock: true,
  },
];

function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Header reutilizable */}
      <Header />

      {/* DRAWER */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box width={250} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
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
            .map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                    <Typography variant="h6" align="center" sx={{ fontWeight: 500 }}>
                      {product.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* MODAL */}
      <Dialog open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)} fullWidth>
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.name}</DialogTitle>
            <DialogContent>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                onError={(e) => (e.target.src = defaultImage)}
                style={{ width: "100%", height: "250px", objectFit: "cover", marginBottom: "1rem" }}
              />
              <Typography>{selectedProduct.description}</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "1rem" }}
                disabled={!selectedProduct.stock}
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