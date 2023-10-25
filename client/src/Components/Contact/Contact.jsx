import React,  { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import s from "../Contact/Contact.module.css";
import emailjs from "@emailjs/browser";



export default function Contact() {
  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onBlur",
  });

  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_spz6i0r",
        "template_dn6dhv6",
        form.current,
        "kTMNXePvgEFT7R6an"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
        },
        (error) => {
          console.log(error.text);
          setSuccess(false);
        }
      );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = (e) => {
    sendEmail(e);
    setOpen(true);
    reset({ name: "", email: "", phone: "", message: "" });
  };

  const ValidationTextField = styled(TextField)({
    "& input": {
      backgroundColor: "white",
      borderRadius: "5px",
    },
    "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": {
      backgroundColor: "white",
    },
    "& input:valid + fieldset": {
      borderColor: "#E0E3E7",
      borderWidth: 1,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 4,
      padding: "4px !important", // override inline-style
    },
  });

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#ffb032e8"),
    backgroundColor: "black",
    // eslint-disable-next-line
    color: "white",
    height: "50px",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  }));

  return (
    <>
      <div id="contact" className={s.title}>Contacto</div>
      <div className={s.formContent}>
        <p>Solicita tu presupuesto sin cargo</p>
        <div className={s.form}>
        <form
          ref={form}
          onSubmit={onSubmit}
          className={s.form}
          autoComplete="off"
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Campo requerido" }}
            render={({ field }) => (
              <>
                <ValidationTextField
                  {...field}
                  label="Nombre Completo"
                  required
                  className={s.input}
                />
                <p className={s.errors}>{errors.name?.message}</p>
              </>
            )}
          />

          <Controller
            render={({ field }) => (
              <>
                <ValidationTextField
                  {...field}
                  label="Email"
                  required
                  type={"email"}
                  className={s.input}
                />
                <p className={s.errors}>{errors.email?.message}</p>
              </>
            )}
            name="email"
            control={control}
            rules={{
              required: "Campo requerido",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "ingrese un email valido",
              },
            }}
          />
          <Controller
            render={({ field }) => (
              <>
                <ValidationTextField
                  {...field}
                  label="Telefono"
                  required
                  className={s.input}
                />
                <p className={s.errors}>{errors.phone?.message}</p>
              </>
            )}
            name="phone"
            control={control}
            rules={{ required: "Campo requerido" }}
          />
          <Controller
            render={({ field }) => (
              <>
                <ValidationTextField
                  {...field}
                  label="Mensaje"
                  multiline
                  rows={4}
                  className={s.input}
                />
              </>
            )}
            name="message"
            control={control}
          />
          <span>Los campos con * son obligatorios</span>
          <ColorButton
            type="submit "
            variant="contained"
            endIcon={<SendIcon />}
            sx={{width:"100%"}}
          >
            Enviar
          </ColorButton>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            {success === false ? (
              <Alert
                onClose={handleClose}
                variant="filled"
                severity="error"
                sx={{ width: "100%" }}
              >
                Error al enviar su mensaje
              </Alert>
            ) : (
              <Alert
                onClose={handleClose}
                variant="filled"
                severity="success"
                sx={{ width: "100%" }}
              >
                Mensaje enviado con exito!
              </Alert>
            )}
          </Snackbar>
        </form>
        </div>
      </div>
    </>
  );
}
