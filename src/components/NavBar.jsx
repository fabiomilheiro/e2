import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink, Switch, Route } from "react-router-dom";
import NavBarSearchForm from "./NavBarSearchForm";

class NavBar extends Component {
  render() {
    return (
      <Menu stackable>
        <Menu.Item>
          <img src="https://react.semantic-ui.com/logo.png" alt="Logo" />
        </Menu.Item>

        <Menu.Item as={NavLink} to="/persons">
          Persons
        </Menu.Item>

        <Menu.Item as={NavLink} to="/groups">
          Groups
        </Menu.Item>
        <Menu.Menu position="right">
          <div className="ui right item">
            <Switch>
              <Route path="/" component={NavBarSearchForm} />
            </Switch>
          </div>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;
