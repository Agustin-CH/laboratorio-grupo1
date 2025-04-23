import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
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
          {/* Redirige la raíz al catálogo */}
          <Route path="/" element={<Navigate to="/catalogo" replace />} />

          {/* Vistas */}
          <Route path="/catalogo" element={<ProductCatalog />} />
          <Route path="/usuarios" element={<UserManagement />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/gestion-productos" element={<ProductManagement />} />
          <Route path="/mi-perfil" element={<Profile />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
