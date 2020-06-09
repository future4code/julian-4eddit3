import React from "react";

import styled from "styled-components";

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
  width: 70px;
  align-items: flex-start;
`;

const ContainerRodapePostEsquerda = styled.div`
  margin: 0 auto;
`;

const InputFormatado = styled.input`
  margin: 10px auto;
  height: 60%;
  width: 95%;
`;

const BotaoPostar = styled.button`
  margin: 5px auto;
  width: 80px;
  height: 30px;
`;

const BotaoCurtir = styled.button`
  width: 25px;
`;

function Feed() {
  return (
    <ContainerFeed>
      <ContainerFormPost>
        <InputFormatado></InputFormatado>
        <BotaoPostar>Postar</BotaoPostar>
      </ContainerFormPost>
      <ContainerPost>
        <span>Usuário</span>

        <InputFormatado></InputFormatado>
        <ContainerRodapePost>
          <ContainerRodapePostDiretita>
            <BotaoCurtir>:)</BotaoCurtir>
            <span> 0 </span>
            <BotaoCurtir>:(</BotaoCurtir>
          </ContainerRodapePostDiretita>
          <ContainerRodapePostEsquerda>
            <span>0 </span>
            <span>Comentários</span>
          </ContainerRodapePostEsquerda>
        </ContainerRodapePost>
      </ContainerPost>
    </ContainerFeed>
  );
}

export default Feed;
