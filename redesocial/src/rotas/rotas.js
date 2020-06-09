import React from "react";

import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "../Paginas/Login/Login";
import Feed from "../Paginas/Feed/Feed";

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/Login">
          <Login />
        </Route>
        <Route exact path="/Cadastro">
          Cadastro
        </Route>
        <Route exact path="/Feed">
          <Feed />
        </Route>
        <Route exact path="/Post">
          Post
        </Route>
        <Route exact path="/">
          <div>Login</div>
        </Route>
        <Route path="/">Bugou o bagulho, volta aí parça</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
