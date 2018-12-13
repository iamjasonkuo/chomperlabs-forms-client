import React, { Component } from "react";
import LoaderButton from "./LoaderButton";
import Product from "./Product";

export default class KitRegistrationStep3 extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }


  render() {
    const { values, handleFieldChange, handleProductChange } = this.props;

    return(
      <React.Fragment>
      <h1>Customize your order</h1>
      {
        values.data.items.map( item => (
          <Product
            key={item.orderItemId}
            id={item.orderItemId}
            values={values}
            handleFieldChange={handleFieldChange}
            handleProductChange={handleProductChange}
          />
        ))
      }
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
