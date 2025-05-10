import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import UserManagement from "./pages/UserManagement";
import ProductCatalog from "./pages/ProductCatalog";
import Cart from "./pages/Cart";
import ProductManagement from "./pages/ProductManagement";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes";
import ProtectedRoute from "./components/ProtectedRoute"; // Importa el componente

function App() {
  return (
    <Router>
      <Container maxWidth="md">
        <Routes>
          {/* Redirige la raíz al catálogo */}
          <Route path="/" element={<Navigate to="/catalogo" replace />} />

          {/* Vistas públicas */}
          <Route path="/catalogo" element={<ProductCatalog />} />
          <Route path="/usuarios" element={<UserManagement />} />
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />

          {/* Vistas protegidas */}
          <Route
            path="/carrito"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion-productos"
            element={
              <ProtectedRoute requiredRole="admin">
                <ProductManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mi-perfil"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;