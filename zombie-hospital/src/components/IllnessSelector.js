import React, { Component } from "react";
import Select, { components } from "react-select";
import { getIllnesses } from "../api";

export default class IllnessSelector extends Component {
  state = {
    options: [],
    selectedOption: 0
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => {});
  };

  UNSAFE_componentWillMount() {
    getIllnesses().then(options => {
      this.setState({ options }, () => {});
    });
  }
  render() {
    const { selectedOption } = this.state;

    const ControlComponent = props => (
      <div>
        {<label>Illness</label>}
        <components.Control {...props} />
      </div>
    );

    return (
      <Select
        className="select-illness"
        value={selectedOption}
        components={{ Control: ControlComponent }}
        onChange={this.handleChange}
        options={this.state.options}
        placeholder="Select an illness"
      />
    );
  }
}
