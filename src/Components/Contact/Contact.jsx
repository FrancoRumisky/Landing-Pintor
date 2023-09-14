import React from "react";
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import s from "../Contact/Contact.module.css"

const ValidationTextField = styled(TextField)({
  '& input':{
    backgroundColor:'white',
    borderRadius:'5px'
  },
  '& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root':{
    backgroundColor:'white'
  },
  '& input:valid + fieldset': {
    borderColor: '#E0E3E7',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important', // override inline-style
  },
});

export default function Contact() {
  return (
    <>
      <div className={s.title}>Contacto</div>
      <div className={s.formContent}>
      <div className={s.form}>
      <ValidationTextField
        label="CSS validation style"
        required
        variant="outlined"
        defaultValue="Success"
        id="validation-outlined-input"
        margin="dense"
      />
        <ValidationTextField
        label="CSS validation style"
        required
        variant="outlined"
        defaultValue="Success"
        id="validation-outlined-input"
        margin="dense"
      />
      <ValidationTextField
        label="CSS validation style"
        required
        multiline
        rows={4}
        variant="outlined"
        defaultValue="Success"
        id="validation-outlined-input"
        margin="dense"
      />
      </div>
      </div>
    </>
  );
}
