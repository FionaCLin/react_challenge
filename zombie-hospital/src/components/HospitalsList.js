import React, { Component } from "react";
import { getHospitals } from "../api";
import HospitalItem from "./HospitalItem";
import Modal from "./Modal";
import { addToWaitingList } from "../api";

export default class HospitalsList extends Component {
  state = {
    show: false,
    hospitals: [],
    selectedHospital: null,
    fullname: "",
    phone: ""
  };

  showModal = i => {
    this.setState({ error: null })
    this.setState({ selectedHospital: i });
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    if (
      this.state.phone === "" ||
      this.state.name === "" ||
      this.state.selectedHospital == null
    )
      return;
    event.preventDefault();
    let payload = {
      user_fullname: this.state.fullname,
      user_phone: this.state.phone,
      hospital_id: this.state.selectedHospital.id
    };
    this.setState({ phone: "", fullname: "", selectedHospital: null });
    addToWaitingList(payload)
      .then(res => {
        alert(`${res.data.user_fullname} is added to waiting list`);
        this.hideModal();
      })
      .catch(err => this.setState({ error: `Action failed, try it later` }));
  };

  UNSAFE_componentWillMount() {
    getHospitals().then(res => {
      let hospitals = res._embedded.hospitals;

      this.setState({ hospitals }, () => {});
    });
  }
  render() {
  
    let hospitals = this.state.hospitals.map(x => {
      x.waitingStatus = x.waitingList.filter(
        e => e.levelOfPain === this.props.level
      )[0];
      return x;
    });
    hospitals = hospitals.sort(
      (a, b) =>
        a.waitingStatus.averageProcessTime - b.waitingStatus.averageProcessTime
    );

    return (
      <div className="hospitals-list">
        <Modal show={this.state.show}>
          {this.state.error && (
            <span className="error">{this.state.error}</span>
          )}
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  name="fullname"
                  placeholder="Enter your full name"
                  value={this.state.fullname}
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="icon_prefix">Full Name</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">phone</i>
                <input
                  id="icon_telephone"
                  type="tel"
                  name="phone"
                  className="validate"
                  placeholder="Enter your phone number"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="icon_telephone">Telephone</label>
              </div>
            </div>
            <div className="form row">
              <button type="submit">Submit</button>
              <button type="cancel" onClick={this.hideModal}>
                close
              </button>
            </div>
          </form>
        </Modal>

        <h5>Our Suggested Hospitals</h5>
        <ul className="hospitals">
          {hospitals.map(x => (
            <HospitalItem item={x} key={x.id} handleClick={this.showModal} />
          ))}
        </ul>
      </div>
    );
  }
}
