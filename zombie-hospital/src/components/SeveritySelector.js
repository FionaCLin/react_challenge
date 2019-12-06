import React, { Component } from "react";
import Select, { components } from "react-select";

export default class IllnessSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [0, 1, 2, 3, 4].map(x => {
        return {
          label: x,
          value: x
        };
      }),
      selectedOption: 0
    };
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => {
      this.props.updateSeverity({ level: selectedOption.value });
    });
  };

  render() {
    const { selectedOption } = this.state;
    const ControlComponent = props => (
      <div>
        {<label>Severity level</label>}
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
        placeholder="Select severity level"
      />
    );
  }
}
