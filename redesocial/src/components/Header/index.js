import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

const Header = () => {

    const history = useHistory()

    const onClickLogout = () => {
        localStorage.clear()
        sessionStorage.clear()
        history.go()
    }
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={onClickLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header