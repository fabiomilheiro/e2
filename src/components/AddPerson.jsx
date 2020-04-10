import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Segment,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import groupService from "../services/groupService";

class AddPerson extends Component {
  state = { groups: [], isLoading: true };

  async componentDidMount() {
    const groups = await groupService.getGroups();
    const groupOptions = groups.map((g) => ({
      key: g.id,
      value: g.id,
      text: g.name,
    }));
    this.setState({ groups: groupOptions, isLoading: false });
  }
  render() {
    return (
      <Segment>
        {this.state.isLoading && (
          <Dimmer active inverted>
            <Loader inverted />
          </Dimmer>
        )}
        <Form>
          <Form.Group widths="equal">
            <Form.Field control={Input} label="Name" placeholder="Name" />
            <Form.Field
              control={Select}
              label="Group"
              placeholder="Group"
              options={this.state.groups}
            />
          </Form.Group>
        </Form>
        <p>
          <Link to="/persons">Cancel</Link>
        </p>
      </Segment>
    );
  }
}

export default AddPerson;
