import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(null);
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    if (!user) {
      setAlertMsg("Debes iniciar sesión para acceder a esta página.");
      setOpen(true);
      setTimeout(() => setRedirect("/usuarios"), 1500);
    } else if (requiredRole && user.rol !== requiredRole) {
      setAlertMsg("No tienes permisos para acceder a esta sección.");
      setOpen(true);
      setTimeout(() => setRedirect("/home"), 1500);
    }
  }, [user, requiredRole]);

  // Si está redirigiendo, navega
  if (redirect) return <Navigate to={redirect} replace />;

  // Si no está autorizado, NO renderiza children
  if (!user || (requiredRole && user.rol !== requiredRole)) {
    return (
      <Snackbar open={open} autoHideDuration={1400} onClose={() => setOpen(false)}>
        <MuiAlert severity="warning" elevation={6} variant="filled" onClose={() => setOpen(false)}>
          {alertMsg}
        </MuiAlert>
      </Snackbar>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;