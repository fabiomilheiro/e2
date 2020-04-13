import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Persons from "./pages/Persons";
import Groups from "./pages/Groups";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles/themes/default/_index.scss";

// const theme = "default";
// require(`./styles/themes/${theme}/_index.scss`);

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Switch>
          <Route
            path="/persons/search:name?/:exactSearch?/:groupId?"
            component={Persons}
          />
          <Route path="/persons" component={Persons} />
          <Route path="/groups" component={Groups} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" to="/persons" exact />
          <Redirect to="/not-found" />
        </Switch>
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
