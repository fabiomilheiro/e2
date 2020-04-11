import React, { Component } from "react";
import { Input, Button, Checkbox, Select } from "semantic-ui-react";
import groupService from "../services/groupService";
import routeParser from "../services/routeParser";

class NavBarSearchForm extends Component {
  state = {
    groups: [],
    exactSearch: false,
    name: "",
    groupId: "",
  };

  async componentDidMount() {
    const parsed = routeParser.parsePersonSearchRouteParameters(
      this.props.match.params
    );

    if (parsed.groupId) {
      await this.loadGroups();
    }

    this.setState({
      exactSearch: parsed.exactSearch,
      name: parsed.name,
      groupId: parsed.groupId,
    });
  }

  render() {
    return (
      <div className="ui input">
        <Checkbox
          className="prompt"
          label="Exact?"
          toggle
          checked={this.state.exactSearch}
          onChange={(e, data) => this.setState({ exactSearch: data.checked })}
        />
        <Input
          className="prompt"
          placeholder="Search persons..."
          value={this.state.name}
          onChange={(e, data) => this.setState({ name: data.value })}
        />
        <Select
          className="prompt"
          placeholder="Group"
          options={this.state.groups}
          value={this.state.groupId}
          onChange={(e, data) => this.setState({ groupId: data.value })}
          onClick={() => this.loadGroups()}
        />
        <Button primary onClick={() => this.goToSearch()}>
          Search
        </Button>
      </div>
    );
  }

  loadGroups = async () => {
    if (this.state.groups.length > 0) {
      return;
    }

    this.setState({ groups: await groupService.getGroupOptions() });
  };

  goToSearch = () => {
    const { exactSearch, name, groupId } = this.state;
    this.props.history.push(`/persons/${name}/${exactSearch}/${groupId}`);
  };
}

export default NavBarSearchForm;
