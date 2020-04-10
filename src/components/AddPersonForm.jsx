import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  Segment,
  Loader,
  Dimmer,
  Button,
} from "semantic-ui-react";
import groupService from "../services/groupService";
import personService from "../services/personService";
import { toast } from "react-toastify";

class AddPersonForm extends Component {
  state = {
    name: "",
    groupId: "",
    groups: [],
    isLoading: true,
  };

  static emptyOption = { key: "", value: "", text: "" };

  async componentDidMount() {
    const groups = await groupService.getGroups();
    const groupOptions = groups.map((g) => ({
      key: g.id,
      value: g.id,
      text: g.name,
    }));
    this.setState({
      groups: [AddPersonForm.emptyOption, ...groupOptions],
      isLoading: false,
    });
  }

  render() {
    return (
      <Segment>
        {this.state.isLoading && (
          <Dimmer active inverted>
            <Loader inverted />
          </Dimmer>
        )}
        <Form onSubmit={() => this.handleSubmit()}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Name"
              placeholder="Name"
              value={this.state.value}
              onChange={(e, data) => this.setState({ name: data.value })}
            />
            <Form.Field
              control={Select}
              label="Group"
              placeholder="Group"
              options={this.state.groups}
              value={this.state.groupId}
              onChange={(e, data) => {
                this.setState({ groupId: data.value });
              }}
            />
          </Form.Group>
          <Button primary size="large">
            Add person
          </Button>
          <Button as={Link} to="/persons" basic size="large">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }

  handleSubmit = async () => {
    const newPerson = await personService.addPerson({
      name: this.state.name,
      groupId: this.state.groupId,
    });

    toast.success("The person was added successfully.");
    this.props.onPersonAdd(newPerson);
    this.props.history.replace("/persons");
  };
}

export default AddPersonForm;
