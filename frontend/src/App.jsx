import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";

import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import ProductCatalog from "./pages/ProductCatalog";
import UserManagement from "./pages/UserManagement";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes";
import Cart from "./pages/Cart";
import ProductManagement from "./pages/ProductManagement";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CssBaseline />
        <Header />

        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            {/* ruta de login/registro */}
            <Route path="/login" element={<Login />} />

            {/* ruta raíz redirige al catálogo */}
            <Route path="/" element={<Navigate to="/catalogo" replace />} />

            {/* catálogo público */}
            <Route path="/catalogo" element={<ProductCatalog />} />

            {/* preguntas frecuentes, home, checkout públicos */}
            <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
            <Route path="/home" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* gestión de usuarios (solo ADMIN) */}
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <UserManagement />
                </ProtectedRoute>
              }
            />

            {/* carrito (usuario autenticado) */}
            <Route
              path="/carrito"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            {/* gestión de productos (solo ADMIN) */}
            <Route
              path="/gestion-productos"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <ProductManagement />
                </ProtectedRoute>
              }
            />

            {/* perfil de usuario (usuario autenticado) */}
            <Route
              path="/mi-perfil"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* cualquier otra ruta desconocida redirige al catálogo */}
            <Route path="*" element={<Navigate to="/catalogo" replace />} />
          </Routes>
        </Container>

        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
