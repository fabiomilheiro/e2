import React, { Component } from "react";
import personService from "../services/personService";
import {
  Table,
  Segment,
  Grid,
  Placeholder,
  Message,
  Icon,
} from "semantic-ui-react";

class Persons extends Component {
  state = { isLoading: true };

  async componentDidMount() {
    try {
      var persons = await personService.getPersons();
      this.setState({ persons, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingState();
    }

    if (this.state.persons) {
      return this.renderTable();
    }

    return this.renderFailure();
  }

  renderTable = () => {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Group</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.persons.map((person) => (
            <Table.Row key={person.id}>
              <Table.Cell>{person.name}</Table.Cell>
              <Table.Cell>{person.groupName}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  renderLoadingState = () => {
    return (
      <Segment raised>
        {Array.from(Array(3)).map((item, id) => {
          return (
            <Grid key={id} columns={2}>
              <Grid.Column>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line length="long" />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </Grid.Column>
              <Grid.Column>
                <Placeholder>
                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Grid.Column>
            </Grid>
          );
        })}
      </Segment>
    );
  };

  renderFailure = () => {
    return (
      <Message negative icon>
        <Icon name="frown outline notched" />
        <Message.Content>
          <Message.Header>Could not load the persons table.</Message.Header>
        </Message.Content>
      </Message>
    );
  };
}

export default Persons;
