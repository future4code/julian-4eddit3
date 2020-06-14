import React from 'react'
import Card from '@material-ui/core/Card'
import Toolbar from '@material-ui/core/Toolbar'
import Login from '../../components/Login'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Cadastro from '../Cadastro'

const HomePage = () => {
    return(
        <div>
            <Card>
                <Toolbar>
                    <Login />
                </Toolbar>
            </Card>

            <Container>
                <Typography variant="h3">Não tem Cadastro? Cadastre-se</Typography>
                <Cadastro />

            </Container>


        </div>
    )
}

export default HomePage