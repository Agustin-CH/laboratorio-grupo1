// src/pages/Profile.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
  Alert,
  Stack,
  Paper,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const genders = [
  { value: "MALE", label: "Masculino" },
  { value: "FEMALE", label: "Femenino" },
  { value: "OTHER", label: "Otro" },
];

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [user, setUser]           = useState(null);
  const [form, setForm]           = useState({
    fullName: "",
    email: "",
    nationality: "",
    address: "",
    birthDate: "",
    gender: ""
  });
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [alert, setAlert]         = useState(null);
  const [editMode, setEditMode]   = useState(false);

  useEffect(() => {
    api.get("/users/me")
      .then(({ data }) => {
        setUser(data);
        setForm({
          fullName:   data.fullName   || "",
          email:      data.email      || "",
          nationality:data.nationality|| "",
          address:    data.address    || "",
          birthDate:  data.birthDate ? data.birthDate.slice(0,10) : "",
          gender:     data.gender     || ""
        });
      })
      .catch(err => {
        if (err.response?.status === 401) logout();
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/users/me", form);
      setUser(data);
      setForm({
        fullName:   data.fullName   || "",
        email:      data.email      || "",
        nationality:data.nationality|| "",
        address:    data.address    || "",
        birthDate:  data.birthDate ? data.birthDate.slice(0,10) : "",
        gender:     data.gender     || ""
      });
      setAlert({ type: "success", msg: "Perfil guardado correctamente" });
      setEditMode(false);
    } catch {
      setAlert({ type: "error", msg: "Error al guardar los cambios" });
    } finally {
      setSaving(false);
    }
  };

  const allEmpty = !form.nationality && !form.address && !form.birthDate && !form.gender;

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Mi Perfil
      </Typography>

      {alert && (
        <Alert severity={alert.type} onClose={() => setAlert(null)} sx={{ mb: 2 }}>
          {alert.msg}
        </Alert>
      )}

      {/* Si no hay datos (todos vacíos) o estamos en modo edición, mostrar el formulario */}
      {(allEmpty || editMode) ? (
        <Box component="form" onSubmit={handleSave}>
          <Stack spacing={2}>
            <TextField
              label="Nombre completo"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Nacionalidad"
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Dirección"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Fecha de nacimiento"
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              select
              label="Género"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              fullWidth
            >
              {genders.map(g => (
                <MenuItem key={g.value} value={g.value}>
                  {g.label}
                </MenuItem>
              ))}
            </TextField>

            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  setForm({
                    fullName:   user.fullName   || "",
                    email:      user.email      || "",
                    nationality:user.nationality|| "",
                    address:    user.address    || "",
                    birthDate:  user.birthDate ? user.birthDate.slice(0,10) : "",
                    gender:     user.gender     || ""
                  });
                  setEditMode(false);
                }}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" disabled={saving}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </Button>
            </Box>
          </Stack>
        </Box>
      ) : (
        /* Si ya hay datos y no estamos editando, mostrar card con info */
        <Card>
          <CardContent>
            <Typography><strong>Nombre:</strong> {form.fullName}</Typography>
            <Typography><strong>Email:</strong> {form.email}</Typography>
            <Typography><strong>Nacionalidad:</strong> {form.nationality}</Typography>
            <Typography><strong>Dirección:</strong> {form.address}</Typography>
            <Typography><strong>Fecha de nacimiento:</strong> {form.birthDate}</Typography>
            <Typography><strong>Género:</strong> {genders.find(g => g.value === form.gender)?.label}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => setEditMode(true)}>
              Editar datos
            </Button>
          </CardActions>
        </Card>
      )}
    </Paper>
  );
};

export default Profile;
