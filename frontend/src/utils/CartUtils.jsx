export const obtenerCarrito = () => {
  try {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
  } catch (error) {
    console.error(
      "Error al obtener o parsear el carrito de localStorage:",
      error
    );
    return []; // siempre devuelve un array vacío en caso de error
  }
};

export const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

export const agregarAlCarrito = (producto, quantity) => {
  const carritoActual = obtenerCarrito();
  const idx = carritoActual.findIndex((item) => item.id === producto.id);
  const inCartQty = idx >= 0 ? carritoActual[idx].quantity : 0;
  const available = producto.stock - inCartQty;
  const toAdd = Math.min(quantity, available);
  let newQuantity;
  let message;

  if (idx >= 0) {
    carritoActual[idx].quantity += toAdd;
    newQuantity = carritoActual[idx].quantity;
  } else {
    carritoActual.push({ ...producto, quantity: toAdd, price: producto.price });
    newQuantity = toAdd;
  }

  guardarCarrito(carritoActual); // Guarda el carrito después de la modificación

  if (toAdd <= 0) {
    message = `No puedes añadir más de ${producto.name} debido al stock (${producto.stock}).`;
  } else {
    const remaining = producto.stock - newQuantity;
    message = `Agregado ${toAdd} unidad(es) de "${producto.name}". Total: ${newQuantity}. Disponibles para añadir: ${remaining}.`;
  }

  return { carritoActualizado: carritoActual, message };
};

export const handleIncrement = (id) => {
  const carritoActual = obtenerCarrito();
  const newCart = carritoActual.map((item) =>
    item.id === id && item.quantity < item.stock
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
  guardarCarrito(newCart);
  return newCart;
};

export const handleDecrement = (id) => {
  const carritoActual = obtenerCarrito();
  const newCart = carritoActual.map((item) =>
    item.id === id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
  guardarCarrito(newCart);
  return newCart;
};

export const handleRemove = (id) => {
  const carritoActual = obtenerCarrito();
  const newCart = carritoActual.filter((item) => item.id !== id);
  guardarCarrito(newCart);
  return newCart;
};

export const calcularSubtotal = (items) => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

export const calcularEnvio = (subtotal) => {
  return subtotal > 100 ? 0 : 10;
};

export const calcularTotal = (subtotal, envio) => {
  return subtotal + envio;
};

export const vaciarCarrito = () => {
  localStorage.removeItem("carrito");
};
