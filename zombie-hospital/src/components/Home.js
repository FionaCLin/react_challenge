import React, { Component } from "react";
import IllnessSelector from "./IllnessSelector";
import SeveritySelector from "./SeveritySelector";
import HospitalsList from "./HospitalsList";

export default class Home extends Component {
  state = {
    hospitals: [],
    level: 0
  };

  handleChange = event => {
    this.setState(event, () => {});
  };

  render() {
    return (
      <div>
        <div className="selector">
          <IllnessSelector
            className="select-illness"
            updateIllness={this.handleChange}
          />
          <SeveritySelector
            className="select-illness"
            updateSeverity={this.handleChange}
          />
        </div>

        <HospitalsList level={this.state.level} />
      </div>
    );
  }
}
