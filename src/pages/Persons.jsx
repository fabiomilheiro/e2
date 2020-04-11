import React, { Component } from "react";
import personService from "../services/personService";
import { Table } from "semantic-ui-react";
import ErrorMessage from "../components/ErrorMessage";
import LoadingTable from "./../components/LoadingTable";
import { Link, Switch, Route } from "react-router-dom";
import AddPersonForm from "../components/AddPersonForm";
import routeParser from "../services/routeParser";

class Persons extends Component {
  state = { isLoading: true };

  async componentDidMount() {
    await this.loadPersons();
  }

  async componentDidUpdate(previousProps) {
    const {
      exactSearch: previousExactSearch,
      name: previousName,
      groupId: previousGroupId,
    } = previousProps.match.params;
    const params = this.props.match.params;

    if (
      previousExactSearch === params.exactSearch &&
      previousName === params.name &&
      previousGroupId === params.groupId
    ) {
      return;
    }

    await this.loadPersons();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <>
          <h1>Persons</h1>
          <LoadingTable />
        </>
      );
    }

    if (!this.state.persons) {
      return (
        <>
          <h1>Persons</h1>
          <ErrorMessage text="Could not load the persons." />
        </>
      );
    }

    return this.renderPersons();
  }

  renderPersons = () => {
    return (
      <>
        <h1>Persons</h1>
        <Switch>
          <Route
            path="/persons/add"
            render={(props) => (
              <AddPersonForm
                {...props}
                onPersonAdd={(person) => this.handleNewPerson(person)}
              />
            )}
            exact
          />
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

  handleNewPerson = (person) => {
    const persons = [...this.state.persons, person];
    this.setState({ persons });
  };

  loadPersons = async () => {
    try {
      const criteria = routeParser.parsePersonSearchRouteParameters(
        this.props.match.params
      );

      const persons = await personService.getPersons(criteria);
      this.setState({ persons, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };
}

export default Persons;
