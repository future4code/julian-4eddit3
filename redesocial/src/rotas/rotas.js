import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "../Paginas/Login/Login";
import Feed from "../Paginas/Feed/Feed";
import Cadastro from "../Paginas/Cadastro";
import Post from '../Paginas/Post'

function Rotas() {
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
          <Login />
        </Route>
        <Route path="/">Bugou o bagulho, volta aí parça</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
