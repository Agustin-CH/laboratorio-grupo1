import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const initialProducts = [
  {
    id: 1,
    name: "Remera básica",
    price: 12000,
    stock: 15,
    category: "Indumentaria",
  },
  {
    id: 2,
    name: "Zapatillas urbanas",
    price: 35000,
    stock: 8,
    category: "Calzado",
  },
  {
    id: 3,
    name: "Campera de jean",
    price: 42000,
    stock: 5,
    category: "Indumentaria",
  },
];

const ProductManagement = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const handleOpenDialog = (product = null) => {
    setEditingProduct(product);
    setForm(
      product
        ? { ...product }
        : { name: "", price: "", stock: "", category: "" }
    );
    setErrors({});
    setAlert(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setErrors({});
    setAlert(null);
  };

  const validateForm = () => {
    const newErrors = {};

    // Nombre: requerido, mínimo 2 caracteres, solo letras, números y espacios
    if (!form.name || form.name.trim().length < 2) {
      newErrors.name = "El nombre es obligatorio y debe tener al menos 2 caracteres.";
    } else if (!/^[\w\sáéíóúÁÉÍÓÚüÜñÑ-]+$/.test(form.name.trim())) {
      newErrors.name = "El nombre solo puede contener letras, números, espacios y guiones.";
    }

    // Precio: requerido, numérico, mayor a 0, máximo 1 millón
    if (form.price === "" || form.price === null) {
      newErrors.price = "El precio es obligatorio.";
    } else if (isNaN(Number(form.price))) {
      newErrors.price = "El precio debe ser un número.";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "El precio debe ser mayor a 0.";
    } else if (Number(form.price) > 1000000) {
      newErrors.price = "El precio no puede superar $1.000.000.";
    }

    // Stock: requerido, numérico, entero, >= 0, máximo 9999
    if (form.stock === "" || form.stock === null) {
      newErrors.stock = "El stock es obligatorio.";
    } else if (!/^\d+$/.test(form.stock.toString())) {
      newErrors.stock = "El stock debe ser un número entero.";
    } else if (Number(form.stock) < 0) {
      newErrors.stock = "El stock no puede ser negativo.";
    } else if (Number(form.stock) > 9999) {
      newErrors.stock = "El stock no puede superar 9999 unidades.";
    }

    // Categoría: requerido, mínimo 2 caracteres, solo letras y espacios
    if (!form.category || form.category.trim().length < 2) {
      newErrors.category = "La categoría es obligatoria y debe tener al menos 2 caracteres.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(form.category.trim())) {
      newErrors.category = "La categoría solo puede contener letras y espacios.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // No permitir valores negativos en los campos numéricos
    if ((name === "price" || name === "stock") && value !== "" && Number(value) < 0) {
      return;
    }
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSaveProduct = () => {
    if (!validateForm()) {
      setAlert({ type: "error", message: "Por favor, corrige los errores antes de guardar." });
      return;
    }

    // Evitar duplicados por nombre (case insensitive)
    const nameExists = products.some(
      (p) =>
        p.name.trim().toLowerCase() === form.name.trim().toLowerCase() &&
        (!editingProduct || p.id !== editingProduct.id)
    );
    if (nameExists) {
      setErrors((prev) => ({
        ...prev,
        name: "Ya existe un producto con este nombre.",
      }));
      setAlert({ type: "error", message: "El nombre del producto ya existe." });
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...form, id: p.id, price: Number(form.price), stock: Number(form.stock) } : p
        )
      );
      setAlert({ type: "success", message: "Producto editado correctamente." });
    } else {
      setProducts((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          price: Number(form.price),
          stock: Number(form.stock),
        },
      ]);
      setAlert({ type: "success", message: "Producto agregado correctamente." });
    }
    setTimeout(() => {
      handleCloseDialog();
    }, 1000);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      <Box
        sx={{
          p: isMobile ? 1 : 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          sx={{ width: "100%", mb: 2, alignItems: "center" }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              flexGrow: 1,
              mb: isMobile ? 1 : 0,
            }}
          >
            Administra tus productos
          </Typography>
          <TextField
            size="small"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 200, bgcolor: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              color: "black",
              borderColor: "black",
              backgroundColor: "white",
              px: 3,
              borderRadius: 0,
              fontSize: "0.75rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
            onClick={() => handleOpenDialog()}
          >
            AGREGAR PRODUCTO
          </Button>
        </Stack>

        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            maxWidth: 900,
            boxShadow: 2,
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Categoría</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No se encontraron productos.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">
                      ${product.price.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">{product.stock}</TableCell>
                    <TableCell align="right">{product.category}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(product)}
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteProduct(product.id)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialogo para agregar/editar producto */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>
          {editingProduct ? "Editar producto" : "Agregar producto"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {alert && (
              <Alert severity={alert.type} sx={{ mb: 1 }}>
                {alert.message}
              </Alert>
            )}
            <TextField
              label="Nombre"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              fullWidth
              size="small"
              error={!!errors.name}
              helperText={errors.name}
              inputProps={{ maxLength: 50 }}
              required
            />
            <TextField
              label="Precio"
              name="price"
              type="number"
              value={form.price}
              onChange={handleFormChange}
              fullWidth
              size="small"
              inputProps={{ min: 0, max: 1000000, step: "any" }}
              error={!!errors.price}
              helperText={errors.price}
              required
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleFormChange}
              fullWidth
              size="small"
              inputProps={{ min: 0, max: 9999, step: 1 }}
              error={!!errors.stock}
              helperText={errors.stock}
              required
            />
            <TextField
              label="Categoría"
              name="category"
              value={form.category}
              onChange={handleFormChange}
              fullWidth
              size="small"
              error={!!errors.category}
              helperText={errors.category}
              inputProps={{ maxLength: 30 }}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={handleSaveProduct}
            variant="contained"
            sx={{ bgcolor: "black" }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default ProductManagement;