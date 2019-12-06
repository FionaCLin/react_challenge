import React, { Component } from "react";
import Select, { components } from "react-select";
import { getIllnesses } from "../api";

export default class IllnessSelector extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedOption: 0
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => {});
  };

  componentDidMount() {
    this._isMounted = true;
    getIllnesses().then(options => {
      if (this._isMounted) {
        this.setState({ options }, () => {});
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
