import React from 'react'
import {useHistory} from 'react-router-dom'
import CardComment from '../../components/CardComment'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';


const Post = () => {
    return(
        <div>
            <Container>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">Nome do usuário</Typography>
                    </CardContent>

                    <CardContent>
                        <Typography>Texto do post</Typography>
                    </CardContent>
                    
                    <CardActions>
                        <IconButton>
                            <ThumbUpAltIcon />
                        </IconButton>
                        <Typography>0</Typography>
                        <IconButton>
                            <ThumbDownIcon />
                        </IconButton>
                    </CardActions>
                </Card>

                <TextField 
                    label="Escreva seu comentário" 
                    fullWidth={true}
                    multiline
                    rows={4}
                    placeholder="Escreva seu comentário"
                    variant="outlined"
                />
                <Button variant="contained" color="primary" fullWidth={true}>Comentar</Button>

                <CardComment 
                    nomeUsuario="Nome do usuário"
                    comentario="Comentário do post"
                    votosComentario={0}/>
            </Container>
        </div>
    )
}

export default Post