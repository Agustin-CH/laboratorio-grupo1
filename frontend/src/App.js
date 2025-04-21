import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Home from "./pages/Home";
import UserManagement from "./pages/UserManagement";
import ProductCatalog from "./pages/ProductCatalog";
import Cart from "./pages/Cart";
import ProductManagement from "./pages/ProductManagement";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<UserManagement />} />
          <Route path="/catalogo" element={<ProductCatalog />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/gestion-productos" element={<ProductManagement />} />
          <Route path="/mi-perfil" element={<Profile />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;