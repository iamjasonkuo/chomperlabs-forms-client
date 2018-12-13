import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";

export default class KitRegistrationStep2 extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values, handleFieldChange } = this.props;

    return(
      <React.Fragment>
      <h1>Tell us about you</h1>
        <FormGroup bsSize="large" controlId="firstName">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            value={values.firstName}
            onChange={handleFieldChange}
            placeholder="Your given name"
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="lastName">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            value={values.firstName}
            onChange={handleFieldChange}
            placeholder="Who is your daddy"
          />
        </FormGroup>
        <hr />
        <FormGroup bsSize="large" controlId="shippingAddressStreet">
          <ControlLabel>Street</ControlLabel>
          <FormControl
            type="text"
            value={values.shippingAddressStreet}
            onChange={handleFieldChange}
            placeholder="Street Address"
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="shippingAddressCity">
          <ControlLabel>City</ControlLabel>
          <FormControl
            type="text"
            value={values.shippingAddressCity}
            onChange={handleFieldChange}
            placeholder="Your hood"
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="shippingAddressState">
          <ControlLabel>State</ControlLabel>
          <FormControl componentClass="select"
            placeholder="select"
            onChange={handleFieldChange}
          >
          { values.stateOptions.map( state => (
            <option
              key={state}
              value={state}>
                {state}
            </option>
          )) }
          </FormControl>
        </FormGroup>
        <FormGroup bsSize="large" controlId="shippingAddressZip">
          <ControlLabel>Zip</ControlLabel>
          <FormControl
            type="text"
            value={values.shippingAddressZip}
            onChange={handleFieldChange}
            placeholder="Zip code"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          text="Back"
          isLoading={this.props.loading}
          loadingText="Processing…"
          onClick={this.back}
        />
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          text="Continue"
          isLoading={this.props.loading}
          loadingText="Processing…"
          onClick={this.continue}
        />
      </React.Fragment>
    )
  }
}
