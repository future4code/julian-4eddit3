import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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

const Post = () => {
  PaginaProtegida();
  const [post, setPost] = useState([]);
  const [comentarios, setComentarios] = useState([]);

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
        setPost(posts.post);
        setComentarios(posts.post.comments);
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
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {post.username}
            </Typography>
          </CardContent>

          <CardContent>
            <Typography>{post.text}</Typography>
          </CardContent>

          <CardActions>
            <IconButton>
              <ThumbUpAltIcon />
            </IconButton>
            <Typography>{post.votesCount}</Typography>
            <IconButton>
              <ThumbDownIcon />
            </IconButton>
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
            <CardComment
              key={coments.id}
              nomeUsuario={coments.username}
              comentario={coments.text}
              votosComentario={coments.votesCount}
            />
          );
        })}
      </Container>
    </div>
  );
};

export default Post;
