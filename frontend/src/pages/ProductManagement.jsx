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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

  const handleOpenDialog = (product = null) => {
    setEditingProduct(product);
    setForm(
      product
        ? { ...product }
        : { name: "", price: "", stock: "", category: "" }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...form, id: p.id } : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }
    handleCloseDialog();
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Header reutilizable */}
      <Header />

      {/* Main area */}
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
            <TextField
              label="Nombre"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Precio"
              name="price"
              type="number"
              value={form.price}
              onChange={handleFormChange}
              fullWidth
              size="small"
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleFormChange}
              fullWidth
              size="small"
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Categoría"
              name="category"
              value={form.category}
              onChange={handleFormChange}
              fullWidth
              size="small"
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

      {/* Footer reutilizable */}
      <Footer />
    </Box>
  );
};

export default ProductManagement;