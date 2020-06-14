import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Feed from "../Paginas/Feed/Feed";
import Post from '../Paginas/Post'
import HomePage from '../Paginas/HomePage'
import Cadastro from '../Paginas/Cadastro'

function Rotas() {

  const token = localStorage.getItem('token')
  const tokenSessao = sessionStorage.getItem('token')

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/post/:postId">
          <Post />
        </Route>
        <Route exact path="/cadastro">
          <Cadastro />
        </Route>
        <Route exact path="/">
          {token !== null || tokenSessao !== null ? <Feed /> : <HomePage />}
        </Route>
        <Route path="/">Bugou o bagulho, volta aí parça</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
