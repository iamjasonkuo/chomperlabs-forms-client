import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";

export default class KitRegistrationStep1 extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  renderButtonResponses = (confirmed) => {
    //BUG: function is not being called in ternary statement
    //
    if (confirmed){
      return (
        <LoaderButton
        block
        bsSize="large"
        bsStyle="success"
        type="submit"
        text="You're good to go!"
        isLoading={this.props.loading}
        loadingText="Validating…"
        />
      );
    } else {
      return(
        <LoaderButton
        block
        bsSize="large"
        bsStyle="danger"
        type="submit"
        text="Order number doesn't match up. Try Again."
        isLoading={this.props.loading}
        loadingText="Validating…"
        />
      );
    }
  }

  render() {
    const { values, handleFieldChange, handleOrderVerficationSubmit } = this.props;
    const filled = values.orderNum.length > 0;
    // const confirmed = values.data && values.data.orderStatus !== "shipped"; NOTE: This is the correct confirmed variable; use this once renderButtonResponses works.
    const confirmed = values.data
    // TODO: verify that kitcode matches
    // const kitCodeMatch = this.props.kitCode === this.props.kitCodeConfirm;

    return(
      <React.Fragment>
        <h1>Show me the moneyyyyyy</h1>
        <form className="BillingForm" onSubmit={handleOrderVerficationSubmit}>
          <FormGroup bsSize="large" controlId="orderNum">
            <ControlLabel>Amazon Order ID</ControlLabel>
            <FormControl
              type="text"
              value={values.orderNum}
              onChange={handleFieldChange}
              placeholder="Order ID"
            />
          </FormGroup>
          { values.orderVerficationAttempt > 1 ?
            this.renderButtonResponses(confirmed) :
            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Check Order Number"
              isLoading={this.props.loading}
              disabled={!filled}
              loadingText="Validating…"
            />
           }
        </form>
        <br />
        <hr />
        <br />
        <FormGroup bsSize="large" controlId="kitCode">
          <ControlLabel>Your Kit Code</ControlLabel>
          <FormControl
            type="text"
            value={values.kitCode}
            onChange={handleFieldChange}
            placeholder="KIT CODE"
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="kitCodeConfirm">
          <ControlLabel>Confirm Your Kit Code</ControlLabel>
          <FormControl
            type="text"
            value={values.kitCodeConfirm}
            onChange={handleFieldChange}
            placeholder="CONFIRM KIT CODE"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          text="Continue"
          isLoading={this.props.loading}
          loadingText="Processing…"
          disabled={!confirmed}
          onClick={this.continue}
        />
      </React.Fragment>
    )
  }
}
