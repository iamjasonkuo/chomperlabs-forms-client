import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import LoaderButton from "./LoaderButton";

export default class KitRegistrationStep4 extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }


  render() {
    const { values } = this.props;

    return(
      <React.Fragment>
      <h1>Review your order</h1>
      <ListGroup>
        <ListGroupItem header="Kit Code">{values.kitCode}</ListGroupItem>
        <ListGroupItem header="First Name">{values.firstName}</ListGroupItem>
        <ListGroupItem header="Last Name">{values.lastName}</ListGroupItem>
        <ListGroupItem header="Shipping Address Street">{values.shippingAddressStreet}</ListGroupItem>
        <ListGroupItem header="Shipping Address City">{values.shippingAddressCity}</ListGroupItem>
        <ListGroupItem header="Shipping Address State">{values.shippingAddressState}</ListGroupItem>
        <ListGroupItem header="Shipping Address Zip">{values.shippingAddressZip}</ListGroupItem>
        {
          values.product.map( p => (
            <ListGroupItem header={p.orderItemId}>{p.guardType}</ListGroupItem>
          ))
        }
      </ListGroup>
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
        text="Confirm & Continue"
        isLoading={this.props.loading}
        loadingText="Processing…"
        onClick={this.continue}
      />
      </React.Fragment>
    )
  }
}
