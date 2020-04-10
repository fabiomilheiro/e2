import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import "semantic-ui-css/semantic.min.css";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Switch>
          <Route path="/persons" />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" to="/persons" exact />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
