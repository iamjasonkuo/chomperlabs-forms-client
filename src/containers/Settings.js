import React, { Component } from "react";
// import { API } from "aws-amplify";
// import config from "../config";
import "./Settings.css";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  // Stripe API not connected
  // billUser(details) {
  //   return API.post("notes", "/billing", {
  //     body: details
  //   });
  // }

  render() {
    return (
      <div className="Settings">
        <h1>Settings...</h1>
      </div>
    );
  }
}
