import React, { Component } from "react";
import personService from "../services/personService";
import { Table } from "semantic-ui-react";
import ErrorMessage from "../components/ErrorMessage";
import LoadingTable from "./../components/LoadingTable";
import { Link, Switch, Route } from "react-router-dom";
import AddPerson from "../components/AddPerson";

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
      return <LoadingTable />;
    }

    if (!this.state.persons) {
      return <ErrorMessage text="Could not load the persons." />;
    }

    return this.renderPersons();
  }

  renderPersons = () => {
    return (
      <>
        <h1>Persons</h1>
        <Switch>
          <Route path="/persons/add" component={AddPerson} exact />
          <Route
            path="/"
            render={() => (
              <p>
                <Link to="/persons/add">New person</Link>
              </p>
            )}
          />
        </Switch>
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
  };
}

export default Persons;
