import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

class NavBar extends Component {
  state = {};
  render() {
    const activeItem = "features";

    return (
      <Menu stackable>
        <Menu.Item>
          <img src="https://react.semantic-ui.com/logo.png" alt="Logo" />
        </Menu.Item>

        <Menu.Item
          name="features"
          active={activeItem === "features"}
          onClick={this.handleItemClick}
        >
          Features
        </Menu.Item>

        <Menu.Item
          name="testimonials"
          active={activeItem === "testimonials"}
          onClick={this.handleItemClick}
        >
          Testimonials
        </Menu.Item>

        <Menu.Item
          name="sign-in"
          active={activeItem === "sign-in"}
          onClick={this.handleItemClick}
        >
          Sign-in
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;
