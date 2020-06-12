import React from 'react'
import Card from '@material-ui/core/Card'
import Toolbar from '@material-ui/core/Toolbar'
import Login from '../../components/Login'

const HomePage = () => {
    return(
        <div>
            <Card>
                <Toolbar>
                    <Login />
                </Toolbar>
            </Card>
        </div>
    )
}

export default HomePage