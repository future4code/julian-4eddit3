import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Cadastro = () => {
    const [inputEmail, setInputEmail] = useState('')
    const [inputSenha, setInputSenha] = useState('')
    const [inputUsuario, setInputUsuario] = useState('')
    const history = useHistory()

    useEffect(() => {
        
    }, [])

    const onClickCadastrar = () => {
        if (inputUsuario === ''){
            window.alert("Usuário Inválido")
        } else if (inputEmail === '' || inputEmail.indexOf('@') === -1 || inputEmail.indexOf('.') === -1){
            window.alert("E-mail Inválido")
        } else if (inputSenha === ''){
            window.alert("Senha Inválida")
        } else{
            history.push("/feed")
        }
    }

    const apertaEnter = event => {
        if(event.keyCode === 13){
            onClickCadastrar()
        }
    }

    

    return(
        <Container>
            <Typography variant="h2">Cadastro</Typography>
            <div>
                <TextField 
                    label="Nome de usuário"
                    value={inputUsuario}
                    onChange={event => setInputUsuario(event.target.value)}
                    type="text" />
            </div>
            <div>
                <TextField 
                    label="E-mail"
                    value={inputEmail}
                    onChange={event => setInputEmail(event.target.value)}
                    type="email"/>
            </div>
            <div>
                <TextField 
                    label="Senha" 
                    value={inputSenha}
                    onChange={event => setInputSenha(event.target.value)}
                    onKeyUp={apertaEnter}
                    type="password"/>
            </div>
            <div>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={onClickCadastrar}>
                        Cadastrar
                    </Button>
            </div>
        </Container>
    )
}

export default Cadastro