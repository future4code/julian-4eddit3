import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "../Paginas/Login/Login";
import Feed from "../Paginas/Feed/Feed";
import Cadastro from "../Paginas/Cadastro";
import Post from '../Paginas/Post'
import HomePage from '../Paginas/HomePage'

function Rotas() {

  const token = localStorage.getItem('token')
  const tokenSessao = sessionStorage.getItem('token')

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/cadastro">
          <Cadastro />
        </Route>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <Route exact path="/post/:postId">
          <Post />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/">Bugou o bagulho, volta aí parça</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
