import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, ready } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg]   = React.useState("");

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      setMsg("Debes iniciar sesión");
      setOpen(true);
      setTimeout(() => setOpen(false), 1500);
    } else if (
      requiredRole &&
      !user.roles.map(r => r.toUpperCase()).includes(requiredRole.toUpperCase())
    ) {
      setMsg("No tienes permisos");
      setOpen(true);
      setTimeout(() => setOpen(false), 1500);
    }
  }, [user, ready, requiredRole]);

  if (!ready) return <div>Cargando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (
    requiredRole &&
    !user.roles.map(r => r.toUpperCase()).includes(requiredRole.toUpperCase())
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {children}
      <Snackbar open={open} autoHideDuration={1400} onClose={() => setOpen(false)}>
        <MuiAlert severity="warning">{msg}</MuiAlert>
      </Snackbar>
    </>
  );
};

export default ProtectedRoute;
