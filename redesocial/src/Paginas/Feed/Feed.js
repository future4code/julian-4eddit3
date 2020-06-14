import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm/useForm";
import styled from "styled-components";
import Header from '../../components/Header'
import PaginaProtegida from "../../hooks/paginaProtegida/PaginaProtegida";
import { getPosts } from "../../components/Request/getPosts";
import { postCriarPost } from "../../components/Request/postCriarPost";
import { putVotar } from "../../components/Request/putVotar";
import { getDetalhesPost } from "../../components/Request/getDetalhesPost";
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

const DivInput = styled.div`
  margin-bottom: 10px;
`

const DivPost = styled.div`
  margin-top: 30px;
`

const ContainerPost = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  width: 400px;
  height: 210px;
  border: solid 1px black;
  align-items: center;
`;

const ContainerRodapePost = styled.div`
  display: flex;
  width: 95%;
  height: 10%;
`;

const ContainerRodapePostDiretita = styled.div`
  margin: 0 auto;
  width: 200px;
`;

const ContainerRodapePostEsquerda = styled.div`
  margin: 0 auto;
`;

const PostFormatado = styled.p`
  margin: 10px auto;
  height: 60%;
  width: 95%;
  border: solid 1px black;
`;

function Feed() {
  PaginaProtegida();
  const [listaPosts, setListaPosts] = useState([]);
  const [listaDetalhesPost, setListaDetalhesPost] = useState([]);
  const history = useHistory();

  const { form, onChange, resetForm } = useForm({
    textoPost: "",
    titulo: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(form);
  };

  const onClickFazerPost = () => {
    const body = {
      text: form.textoPost,
      title: "Não precisa",
    };

    postCriarPost(body)
      .then((post) => {
        console.log("Post Feito");
        carregaPosts();
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
        console.log("Get", posts);
        setListaPosts(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const carregaDetalhesDoPost = () => {
    getDetalhesPost()
      .then((detalhesPosts) => {
        console.log("Detahes Post", detalhesPosts);
        setListaDetalhesPost(detalhesPosts);
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
      <Container maxWidth="sm" >
        <Card >
          <CardContent>
            <DivInput>
              <TextField
              type="text"
              label="Digite post que deseja"
              onChange={handleInputChange}
              value={form.textoPost}
              name="textoPost"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
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
                />
              <CardContent>
                <div onClick={() => postDetails(posts.id, posts.username, posts.text)}>
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

                {posts.userVoteDirection === -1 ? <IconButton color="primary" onClick={() => onClickVotar(posts.id, -1)}>
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
      </Container>
    </div>
  );
}

export default Feed;
