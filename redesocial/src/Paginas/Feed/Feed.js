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

const ContainerFeed = styled.div`
  margin: 0 auto;
`;

const ContainerFormPost = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  width: 400px;
  height: 200px;
  border: solid 1px black;
  align-items: center;
`;

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

const InputFormatado = styled.textarea`
  margin: 10px auto;
  height: 60%;
  width: 95%;
`;

const PostFormatado = styled.p`
  margin: 10px auto;
  height: 60%;
  width: 95%;
  border: solid 1px black;
`;

const BotaoPostar = styled(Button)`
  margin: 5px auto;
  width: 80px;
  height: 30px;
`;

function Feed() {
  PaginaProtegida();
  const [listaPosts, setListaPosts] = useState([]);
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
      title: "Não precisa",
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

  const postDetails = (postId, username, text) => {
    history.push(`/post/${postId}`);
  };

  useEffect(() => {
    carregaPosts();
  }, []);

  return (
    <div>
      <Header />
      <ContainerFeed>
        <ContainerFormPost>
          <InputFormatado
            type="text"
            placeholder="Digite post que deseja"
            onChange={handleInputChange}
            value={form.textoPost}
            name="textoPost"
          ></InputFormatado>
          <BotaoPostar
            variant="contained"
            color="primary"
            onClick={onClickFazerPost}
          >
            Postar
          </BotaoPostar>
        </ContainerFormPost>
        {listaPosts.map((posts) => (
          <ContainerPost key={posts.id}>
            <span>{posts.username}</span>
            <PostFormatado
              onClick={() => postDetails(posts.id, posts.username, posts.text)}
            >
              {posts.text}
            </PostFormatado>
            <ContainerRodapePost>
              <ContainerRodapePostDiretita>
                <IconButton onClick={() => onClickVotar(posts.id, 1)}>
                  <ThumbUpAltIcon />
                </IconButton>
                <span> {posts.votesCount} </span>
                <IconButton onClick={() => onClickVotar(posts.id, 0)}>
                  <ThumbDownIcon />
                </IconButton>
              </ContainerRodapePostDiretita>
              <ContainerRodapePostEsquerda>
                <span>{posts.commentsCount} </span>
                <span>Comentários</span>
              </ContainerRodapePostEsquerda>
            </ContainerRodapePost>
          </ContainerPost>
        ))}
      </ContainerFeed>
    </div>
  );
}

export default Feed;
