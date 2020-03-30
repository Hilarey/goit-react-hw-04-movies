import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MoviesDetailsPage from "./pages/MoviesDetailsPage/MoviesDetailsPage";
import routes from "../routes";

const App = () => (
  <>
    <Layout />
    <Switch>
      <Route path={routes.HOME} exact component={HomePage} />
      <Route path={routes.MOVIES} exact component={MoviesPage} />
      <Route path={routes.MOVIES_ID} component={MoviesDetailsPage} />
      <Redirect to={routes.HOME} />
    </Switch>
  </>
);

export default App;
