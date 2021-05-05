import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.js";
import DetailsPage from "../pages/DetailsPage.js";
import PokedexPage from "../pages/PokedexPage.js";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"}>
          <HomePage />
        </Route>

        <Route exact path={"/detalhes/:id"}>
          <DetailsPage />
        </Route>

        <Route exact path={"/pokedex"}>
          <PokedexPage />
        </Route>

        <Route>
          <div>Página não encontrada</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
