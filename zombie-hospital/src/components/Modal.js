import React, { Component } from "react";

export default class Modal extends Component {
  render() {
    return (
      <div
        className={
          this.props.show ? "modal display-block" : "modal display-none"
        }
      >
        <section className="modal-main">
          <div className="row">
            <p>Please enter your detail</p>
            {this.props.children}
          </div>
        </section>
      </div>
    );
  }
}
