import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const preguntas = [
  {
    pregunta: "¿Cómo realizo una compra?",
    respuesta: "Seleccioná los productos que deseas, agrégalos al carrito y seguí los pasos para completar tu compra desde el carrito."
  },
  {
    pregunta: "¿Cuáles son los medios de pago?",
    respuesta: "Aceptamos tarjetas de crédito, débito, transferencias bancarias y pagos por MercadoPago."
  },
  {
    pregunta: "¿Hacen envíos a todo el país?",
    respuesta: "Sí, realizamos envíos a todo el país. El costo y tiempo de entrega varían según la ubicación."
  },
  {
    pregunta: "¿Cómo puedo contactar al soporte?",
    respuesta: "Podés escribirnos por WhatsApp, Instagram o desde el formulario de contacto en la web."
  }
];

const PreguntasFrecuentes = () => (
  <Box sx={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: "center" }}>
        Preguntas Frecuentes
      </Typography>
      {preguntas.map((item, idx) => (
        <Accordion key={idx} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>{item.pregunta}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.respuesta}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  </Box>
);

export default PreguntasFrecuentes;


// Veo todo correcto, no tocaria nada.
