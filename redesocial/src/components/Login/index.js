import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';


const Login = (props) => {
    return(
        <FormControl>
            <TextField 
                label="Insira o login"
                value={props.loginValue}
                type="email"
                ></TextField>
            <TextField 
                label="insira a senha"
                value={props.senhaValue}
                type="password"></TextField>
            <Button 
                variant="contained" 
                color="primary"
                onClick={props.onClickLogin}>ENTRAR</Button>
        </FormControl>
    )
}

export default Login