import React, { Component } from "react";
import personService from "../services/personService";
import { Table, Segment, Grid, Placeholder } from "semantic-ui-react";

class Persons extends Component {
  state = { persons: [], hasLoaded: false };

  async componentDidMount() {
    var persons = await personService.getPersons();

    this.setState({ persons, hasLoaded: true });
  }

  render() {
    if (!this.state.hasLoaded) {
      return this.renderLoadingState();
    }

    return (
      <>
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
      </>
    );
  }

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
}

export default Persons;
