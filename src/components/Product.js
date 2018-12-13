import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class Product extends Component {

  render() {
    const { values, handleProductChange, id } = this.props;

// (event) => this.props.handleProductChange(id, event.target.value)

    return(
      <React.Fragment>
        <FormGroup bsSize="large" controlId="product">
          <ControlLabel>Product Order ID: {id}</ControlLabel>
            <FormControl componentClass="select"
            onChange={(event) => handleProductChange(id, event.target.value)}
            >
              { values.productOptions.map( item => (
                <option
                  key={item}
                  value={item}>
                    {item}
                </option>
              )) }
          </FormControl>
        </FormGroup>
      </React.Fragment>
    )
  }
}
