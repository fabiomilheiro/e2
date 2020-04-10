import React, { Component } from "react";
import { Input, Button, Checkbox, Select } from "semantic-ui-react";
import groupService from "../services/groupService";
import queryStringService from "../services/queryStringService";

class NavBarSearchForm extends Component {
  state = {
    groups: [],
    exactSearch: false,
    terms: "",
    groupId: "",
  };

  async componentDidMount() {
    const parsed = queryStringService.parse(this.props.location.search);

    if (parsed.groupId) {
      await this.loadGroups();
    }

    this.setState({
      exactSearch: parsed.exactSearch,
      terms: parsed.terms,
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
          value={this.state.terms}
          onChange={(e, data) => this.setState({ terms: data.value })}
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
    const { exactSearch, terms, groupId } = this.state;
    this.props.history.push(
      `/persons?exactSearch=${exactSearch}&terms=${terms}&groupId=${groupId}`
    );
  };
}

export default NavBarSearchForm;
