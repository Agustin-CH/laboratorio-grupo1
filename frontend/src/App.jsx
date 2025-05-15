import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Home from "./pages/Home";
import UserManagement from "./pages/UserManagement";
import ProductCatalog from "./pages/ProductCatalog";
import Cart from "./pages/Cart";
import ProductManagement from "./pages/ProductManagement";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer"; // si lo usás

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/catalogo" replace />} />
          <Route path="/catalogo" element={<ProductCatalog />} />
          <Route path="/usuarios" element={<UserManagement />} />
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
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

      <Footer />
    </Router>
  );
}

export default App;
