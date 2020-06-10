import React, { useState } from "react";
import axios from "axios";

import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { useForm } from "../../hooks/useForm/useForm";
import { postLogin } from "../../components/Request/postLogin";

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

  const { form, onChange, resetForm } = useForm({
    email: "",
    senha: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(form);
  };

  const onClickEntrar = async () => {
    const body = {
      email: form.email,
      password: form.senha,
    };

    postLogin(body)
      .then((response) => {
        console.log("Logado", response);
        localStorage.setItem("token", response.token);
        history.push("/Feed");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickCadastrar = () => {
    history.push("/Cadastro");
  };
  return (
    <form onSubmit={handleSubmit}>
      <ContainerLogin>
        <InputFormatado
          type="email"
          placeholder="e-mail"
          onChange={handleInputChange}
          value={form.email}
          name="email"
          required
          pattern="[A-Za-z ]{3,}"
          title="O campo e-mail deve conter pelo menos 3 letras"
        ></InputFormatado>
        <InputFormatado
          type="password"
          placeholder="Senha"
          onChange={handleInputChange}
          value={form.senha}
          name="senha"
          required
          pattern="[ ]{6,}"
          title="A senha deve conter pelo menos 6 caracteres"
        ></InputFormatado>
        <Botao onClick={onClickEntrar}>Entrar</Botao>
        <Botao onClick={onClickCadastrar}>Cadastrar</Botao>
      </ContainerLogin>
    </form>
  );
}

export default Login;
