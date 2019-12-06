import React, { Component } from "react";

export default class HospitalItem extends Component {
  render() {
    return (
      <li
        onClick={() => {
          this.props.handleClick(this.props.item);
        }}
      >
        <span>{this.props.item.name}</span>

        <span>
          <div className="tooltip">
            <span className="tooltiptext">Patients at waiting list</span>
            <span className="badge waiting-people">
              {this.props.item.waitingStatus.patientCount}
            </span>
            <span
              className="badge material-icons waiting-people"
              data-badge-caption="person"
            ></span>
          </div>

          <div className="waiting">
            waiting time
            <span className="mins">
              {this.props.item.waitingStatus.averageProcessTime} mins
            </span>
          </div>
        </span>
      </li>
    );
  }
}
