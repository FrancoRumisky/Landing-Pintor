import React from "react";
import { Fab, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppButton = () => {

const phone = "5493513185531";

const message = encodeURIComponent(
"Hola, vi su web y necesito presupuesto para pintura de piscina en Córdoba"
);

// NUEVO
const handleClick = () => {

if (window.gtag) {
  window.gtag('event', 'whatsapp_click', {
    event_category: 'contact',
    event_label: 'WhatsApp Button'
  });
}

};

return (

<Fab
aria-label="whatsapp"
href={https://wa.me/${phone}?text=${message}}
target="_blank"
rel="noopener noreferrer"

    // NUEVO
    onClick={handleClick}

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
