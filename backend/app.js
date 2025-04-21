const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('backend/uploads'));

// Ruta de prueba para verificar que el servidor está corriendo
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente ✅');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
