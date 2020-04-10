import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import "semantic-ui-css/semantic.min.css";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Persons from "./pages/Persons";
import Groups from "./pages/Groups";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Switch>
          <Route path="/persons" component={Persons} />
          <Route path="/groups" component={Groups} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" to="/persons" exact />
          <Redirect to="/not-found" />
        </Switch>
      </Container>
    </>
  );
}

export default App;
