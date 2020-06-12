import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

const Header = () => {

    const token = localStorage.getItem('token')
    const tokenSessao = sessionStorage.getItem('token')
    const history = useHistory()

    const onClickLogout = () => {
        localStorage.clear()
        sessionStorage.clear()
        history.push('/login')
    }

    const onClickLogin = () => {
        history.push('/login')
    }
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    {token !== null || tokenSessao !== null ? 
                    <Button color="inherit" onClick={onClickLogout}>Logout</Button> :
                    <Button color="inherit" onClick={onClickLogin}>Login</Button>}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header