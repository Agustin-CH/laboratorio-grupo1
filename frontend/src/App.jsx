import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";

import Home from "./pages/Home";
import ProductCatalog from "./pages/ProductCatalog";
import Cart from "./pages/Cart";
import ProductManagement from "./pages/ProductManagement";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/catalogo" replace />} />

          <Route path="/catalogo" element={<ProductCatalog />} />
          <Route path="/home" element={<Home />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/login" element={<Login />} />

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
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
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

          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
