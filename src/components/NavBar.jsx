import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <Menu stackable>
        <Menu.Item>
          <img src="https://react.semantic-ui.com/logo.png" alt="Logo" />
        </Menu.Item>

        <Menu.Item as={NavLink} to="/persons" exact>
          Persons
        </Menu.Item>

        <Menu.Item as={NavLink} to="/groups" exact>
          Groups
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;
