import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import CardComment from "../../components/CardComment";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import PaginaProtegida from "../../hooks/paginaProtegida/PaginaProtegida";
import { useForm } from "../../hooks/useForm/useForm";
import { useParams } from "react-router-dom";
import { getDetalhesPost } from "../../components/Request/getDetalhesPost";
import { postCriarComentario } from "../../components/Request/postCriarComentario";
import Header from '../../components/Header'
import CardHeader from '@material-ui/core/CardHeader'
import { putVotar } from "../../components/Request/putVotar";
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress';
import {putVotarComentario} from '../../components/Request/putVotarComentario'
import axios from 'axios'

const ContainerWrapper = styled(Container)`
  &&{
    margin-top: 10px;
  }
`

const DivComentario = styled.div`
  margin-top: 30px;
`


const Post = () => {
  PaginaProtegida();
  const [post, setPost] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(true)

  const params = useParams();

  const history = useHistory();

  const { form, onChange, resetForm } = useForm({
    comentario: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(form);
  };

  const onClickFazerComentario = () => {
    const body = {
      text: form.comentario,
      id: `${params.postId}`,
    };

    postCriarComentario(body)
      .then((comentario) => {
        console.log("comenterio", comentario);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const carregaPosts = () => {
    getDetalhesPost(`${params.postId}`)
      .then((posts) => {
        console.log("Get", posts.post.comments);
        setOpenBackdrop(false)
        setPost(posts.post);
        setComentarios(posts.post.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickVotar = (id, voto) => {
    const body = {
      id: id,
      direction: voto,
    };
    putVotar(body)
      .then((voto) => {
        carregaPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickVotarComentario = (postId, commentId, voto) => {
   const body = {
     postId: postId,
     commentId: commentId,
     direction: voto,
   }
   putVotarComentario(body)
    .then(voto => {
      carregaPosts();
    })
    .catch(err => {
      console.log(err)
    })
  }

  const onClickRemoverVotoComentario = (postId, commentId, voto) => {
    const body = {
      postId: postId,
      commentId: commentId,
      direction: voto
    }
    putVotarComentario(body)
      .then(voto => {
        carregaPosts()
      }) 
      .catch(err => {
        console.log(err)
      })
  }

  const onClickRemoverVoto = (id, voto) => {
    const body = {
      id: id,
      direction: voto,
    };
    putVotar(body)
      .then((voto) => {
        carregaPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    carregaPosts();
  }, []);

  return (
    <div>
      <Header />
      <ContainerWrapper maxWidth="sm">
        <Backdrop open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Card>
          <CardHeader
            title={post.title}
            subheader={post.username} />

          <CardContent>
            <Typography>{post.text}</Typography>
          </CardContent>

          <CardActions>
            {post.userVoteDirection === 1 ? <IconButton color="primary" onClick={() => onClickRemoverVoto(post.id, 0)}>
              <ThumbUpAltIcon />
            </IconButton> :
              <IconButton onClick={() => onClickVotar(post.id, 1)}>
                <ThumbUpAltIcon />
              </IconButton>}

            <Typography> {post.votesCount} </Typography>

            {post.userVoteDirection === -1 ? <IconButton color="primary" onClick={() => onClickVotar(post.id, -1)}>
              <ThumbDownIcon />
            </IconButton> :
              <IconButton onClick={() => onClickVotar(post.id, -1)}>
                <ThumbDownIcon />
              </IconButton>}

            <Typography align="right">{post.commentsCount} comentários</Typography>
          </CardActions>
        </Card>

        <TextField
          label="Escreva seu comentário"
          fullWidth={true}
          multiline
          value={form.comentario}
          name="comentario"
          rows={4}
          placeholder="Escreva seu comentário"
          variant="outlined"
          onChange={handleInputChange}
          margin="dense"
        />
        <Button
          onClick={onClickFazerComentario}
          variant="contained"
          color="primary"
          fullWidth={true}
        >
          Comentar
        </Button>
        {comentarios.map((coments) => {
          return (
            <DivComentario>
              <CardComment
                key={coments.id}
                nomeUsuario={coments.username}
                comentario={coments.text}
                votosComentario={coments.votesCount}
                onClickLikeComentario={() => onClickVotarComentario(post.id, coments.id, 1)}
                onClickDislikeComentario={() => onClickVotarComentario(post.id, coments.id, -1)}
                likeComentario={coments.userVoteDirection}
                onClickRemoverVotoComentario={() => onClickRemoverVotoComentario(post.id, coments.id, 0)}
              />
            </DivComentario>
          );
        })}
      </ContainerWrapper>
      
    </div>
  );
};

export default Post;
