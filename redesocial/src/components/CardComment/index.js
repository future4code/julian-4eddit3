import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const CardComment = (props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">{props.nomeUsuario}</Typography>
            </CardContent>
            <CardContent>
                <Typography>{props.comentario}</Typography>
            </CardContent>

            <CardActions>
                <IconButton>
                    <ThumbUpAltIcon />
                </IconButton>
                    <Typography>{props.votosComentario}</Typography>
                <IconButton>
                    <ThumbDownIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default CardComment