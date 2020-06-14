import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm/useForm";
import styled from "styled-components";
import Header from "../../components/Header";
import PaginaProtegida from "../../hooks/paginaProtegida/PaginaProtegida";
import { getPosts } from "../../components/Request/getPosts";
import { postCriarPost } from "../../components/Request/postCriarPost";
import { putVotar } from "../../components/Request/putVotar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress';


const DivInput = styled.div`
  margin-bottom: 10px;
`

const DivPost = styled.div`
  margin-top: 30px;
`

const ContainerWrapper = styled(Container)`
  &&{
    margin-top: 10px;
  }
`

function Feed() {
  PaginaProtegida();
  const [listaPosts, setListaPosts] = useState([]);
  const [listaDetalhesPost, setListaDetalhesPost] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(true)
  const history = useHistory();

  const { form, onChange, resetForm } = useForm({
    textoPost: "",
    titulo: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const onClickFazerPost = () => {
    const body = {
      text: form.textoPost,
      title: form.tituloPost,
    };

    postCriarPost(body)
      .then((post) => {
        carregaPosts();
        resetForm();
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

  const carregaPosts = () => {
    getPosts()
      .then((posts) => {
        setOpenBackdrop(false)
        console.log("Get", posts);
        setListaPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postDetails = (postId, username, text) => {
    history.push(`/post/${postId}`);
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
          <CardContent>
            <DivInput>
              <TextField
                type="text"
                label="Digite o título"
                onChange={handleInputChange}
                value={form.tituloPost}
                name="tituloPost"
                fullWidth
                variant="outlined"
              />
              <TextField
                type="text"
                label="Conteúdo do post"
                onChange={handleInputChange}
                value={form.textoPost}
                name="textoPost"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </DivInput>
            <Button variant="contained" color="primary" onClick={onClickFazerPost}>
              Postar
            </Button>
          </CardContent>
        </Card>
        {listaPosts.map((posts) => (
          <DivPost>
            <Card key={posts.id}>
              <CardHeader
                title={posts.title}
                subheader={posts.username}
                onClick={() => postDetails(posts.id, posts.username, posts.text)} />
              <CardContent onClick={() => postDetails(posts.id, posts.username, posts.text)}>
                <div>
                  <Typography>{posts.text}</Typography>
                </div>
              </CardContent>

              <CardActions>
                {posts.userVoteDirection === 1 ? <IconButton color="primary" onClick={() => onClickRemoverVoto(posts.id, 0)}>
                  <ThumbUpAltIcon />
                </IconButton> :
                  <IconButton onClick={() => onClickVotar(posts.id, 1)}>
                    <ThumbUpAltIcon />
                  </IconButton>}

                <Typography> {posts.votesCount} </Typography>

                {posts.userVoteDirection === -1 ? <IconButton color="primary" onClick={() => onClickRemoverVoto(posts.id, 0)}>
                  <ThumbDownIcon />
                </IconButton> :
                  <IconButton onClick={() => onClickVotar(posts.id, -1)}>
                    <ThumbDownIcon />
                  </IconButton>}

                <Typography align="right">{posts.commentsCount} comentários</Typography>
              </CardActions>
            </Card>
          </DivPost>
        ))}
      </ContainerWrapper>
    </div>
  );
}

export default Feed;
