import React from "react";
import { Fab, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppButton = () => {

const phone = "5493513185531";

const message = encodeURIComponent(
"Hola, vi su web y necesito presupuesto para pintura de piscina en Córdoba"
);

const whatsappUrl = https://wa.me/${phone}?text=${message};

// NUEVO
const handleClick = (e) => {

e.preventDefault();

if (window.gtag) {
  window.gtag('event', 'whatsapp_click', {
    event_category: 'contact',
    event_label: 'WhatsApp Button',
  });
}

// Pequeño delay para asegurar envío
setTimeout(() => {
  window.open(whatsappUrl, "_blank");
}, 300);

};

return (

<Fab
aria-label="whatsapp"

    // ELIMINAR href
    onClick={handleClick}

    rel="noopener noreferrer"

    sx={{
      position: "fixed",
      bottom: 20,
      right: 20,
      backgroundColor: "#25D366",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#1ebe5d",
      },
      boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
      animation: "pulse 2s infinite",
    }}
  >
    <WhatsAppIcon />
  </Fab>
</Tooltip>

);
};

export default WhatsAppButton;
