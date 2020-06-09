import React, { useState } from "react";

import styled from "styled-components";

import { useHistory } from "react-router-dom";

const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const InputFormatado = styled.input`
  width: 200px;
  margin: 10px auto;
`;

const Botao = styled.button`
  width: 100px;
  margin: 10px auto;
`;

function Login() {
  const history = useHistory();

  const onClickEntrar = () => {
    history.push("/Feed");
  };

  const onClickCadastrar = () => {
    history.push("/Cadastro");
  };
  return (
    <ContainerLogin>
      <InputFormatado
        type="email"
        placeholder="e-mail"
        onChange="oi"
        value="oi"
        name="email"
        required
        pattern="[A-Za-z ]{3,}"
        title="O campo e-mail deve conter pelo menos 3 letras"
      ></InputFormatado>
      <InputFormatado
        type="password"
        placeholder="Senha"
        onChange="oi"
        value="oi"
        name="senha"
        required
        pattern="[ ]{6,}"
        title="A senha deve conter pelo menos 6 caracteres"
      ></InputFormatado>
      <Botao onClick={onClickEntrar}>Entrar</Botao>
      <Botao onClick={onClickCadastrar}>Cadastrar</Botao>
    </ContainerLogin>
  );
}

export default Login;
