import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import LoadingTable from "./../components/LoadingTable";
import ErrorMessage from "./../components/ErrorMessage";
import groupService from "../services/groupService";

class Groups extends Component {
  state = { isLoading: true };

  async componentDidMount() {
    try {
      const groups = await groupService.getGroups();
      this.setState({ groups, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingTable />;
    }

    if (!this.state.groups) {
      return <ErrorMessage text="Could not load the groups." />;
    }

    return this.renderGroups();
  }

  renderGroups = () => {
    return (
      <>
        <h1>Groups</h1>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.groups.map((group) => (
              <Table.Row key={group.id}>
                <Table.Cell>{group.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  };
}

export default Groups;
