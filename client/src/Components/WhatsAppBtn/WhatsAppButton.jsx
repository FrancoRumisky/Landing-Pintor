import React from "react";
import { Fab } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppButton = () => {
  return (
    <Fab
      color="primary"
      aria-label="whatsapp"
      href="https://wa.me/5493513185531"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "#25D366",
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
};

export default WhatsAppButton;