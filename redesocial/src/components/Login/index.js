import React, {useState} from 'react'
import axios from "axios";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm/useForm";
import { postLogin } from "../../components/Request/postLogin";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Login = (props) => {
    const history = useHistory();

    const { form, onChange, resetForm } = useForm({
        email: "",
        senha: "",

    });

    const [manterLogin, setManterLogin] = useState(false)
    const [open, setOpen] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        onChange(name, value);
    };

    const handleCheckChange = (event) => {
        setManterLogin(event.target.checked)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(form);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const onClickEntrar = async () => {
        const body = {
            email: form.email,
            password: form.senha,
        };

        if (manterLogin === true) {
            postLogin(body)
                .then((response) => {
                    console.log("Logado", response);
                    localStorage.setItem("token", response.token);
                    history.go();
                })
                .catch((error) => {
                    console.log(error)
                    setOpen(true)
                });
        } else {
            postLogin(body)
                .then((response) => {
                    console.log("Logado", response);
                    sessionStorage.setItem("token", response.token);
                    history.go();
                })
                .catch((error) => {
                    console.log(error)
                    setOpen(true)
                });
        }
    };

    const teste = () => {
        setOpen(true)
    }

    const apertaEnter = (event) => {
        if (event.keyCode === 13) {
            onClickEntrar()
        }
    };


    return(
        <FormControl>
            <TextField 
                label="Insira o login"
                onChange={handleInputChange}
                value={form.email}
                type="email"
                name="email"
                margin="dense"
                required />
            <TextField 
                label="insira a senha"
                onChange={handleInputChange}
                value={form.senha}
                name="senha"
                type="password"
                margin="dense" 
                onKeyUp={apertaEnter}
                required />

            <FormControlLabel
                control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                        value={manterLogin}
                        onChange={handleCheckChange}
                    />
                }
                label="Manter Login?"
            />
            <Button 
                variant="contained" 
                color="primary"
                onClick={onClickEntrar}
                margin="dense">
                ENTRAR
            </Button>

            <Snackbar 
                open={open} 
                autoHideDuration={6000} 
                onClose={handleClose}
                anchorOrigin={{ 
                    vertical: 'bottom', 
                    horizontal: 'left' }}
                message={"Login ou senha errados"}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }>
            </Snackbar>
        </FormControl>
    )
}

export default Login