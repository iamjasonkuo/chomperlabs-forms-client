import React, { Component } from "react";
import "./KitRegistration.css";
import KitRegistrationStep1 from "../components/KitRegistrationStep1";
import KitRegistrationStep2 from "../components/KitRegistrationStep2";
import KitRegistrationStep3 from "../components/KitRegistrationStep3";
import KitRegistrationStep4 from "../components/KitRegistrationStep4";
import KitRegistrationStep5 from "../components/KitRegistrationStep5";
import { API, Auth } from "aws-amplify";
import config from "../config";

export default class KitRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      isProcessing: false,
      kitCode: "",
      kitCodeConfirm: "",
      firstName: "",
      lastName: "",
      email: "",
      shippingAddressStreet: "",
      shippingAddressCity: "",
      shippingAddressState: "",
      shippingAddressZip: "",
      impression: "",
      familyMember: false,
      retainerUpgrade: false,
      product: [],
      stateOptions: ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas","Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"],
      impressionOptions: ["Upper", "Lower"],
      productOptions: ["Soft", "Hybrid", "Hard", "Ultra Thin", "Retainer"],
      orderNum: "",
      data: "",
      orderVerficationAttempt: false,
    };
  }

  async componentDidMount() {
    let userInfo = await Auth.currentUserInfo();
    this.setState({ email: userInfo.attributes.email });
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // Include product type when selecting type of product
  handleProductChange = (id, value) => {
    const { product } = this.state;
    product.map( p => {
      if(p.orderItemId === id) {
        p.guardType = value;
      }
      return p;
    });
    this.setState({ product });
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  // Go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  }

  // GET Shipstation order record to confirm number of items placed
  fetchOrderData = async (details) => {
    // NOTE: Need to confirm if the Amazon customer has the ShipStation orderId

    let orderNum = details;
    let secret = btoa(config.shipStation.APIKEY);

    fetch(`https://ssapi.shipstation.com/orders?orderNumber=${orderNum}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": `Basic ${secret}`
      }})
      .then( response => response.json())
      .then( d => {
        let data = d.orders[0];
        this.setState({ data, product: data.items, orderVerficationAttept: true })
      })
      .catch( error => {
        this.setState({orderVerficationAttept: true});
        alert("Nope.");
      });
  }

  // POST to lambda function
  persistOrderData = async (storage) => {
    return API.post("notes", "/notes", {
      body: storage
    });
  }

  // Get customer order verfication from order number
  handleOrderVerficationSubmit = async (event) => {

    event.preventDefault();

    const { orderNum } = this.state;

    this.setState({ isLoading: true });

    await this.fetchOrderData(orderNum);

    this.setState({ isLoading: false });
  }

  // consolidate information prepared
  handleOrderFinalReviewSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    await this.persistOrderData({
      orderId: this.state.orderNum,
      kitCode: this.state.kitCode,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      shippingAddressStreet: this.state.shippingAddressStreet,
      shippingAddressCity: this.state.shippingAddressCity,
      shippingAddressState: this.state.shippingAddressState,
      shippingAddressZip: this.state.shippingAddressZip,
      impression: this.state.impression,
      product: this.state.product
    });

    this.setState({ isLoading: false });
  }

  render() {
    const loading = this.state.isProcessing || this.props.loading;
    const { step } = this.state;
    const { kitCode, kitCodeConfirm, firstName, lastName, email, shippingAddressStreet, shippingAddressCity, shippingAddressState, shippingAddressZip, product, impression, stateOptions, impressionOptions, productOptions, orderNum, data, orderVerficationAttempt } = this.state;
    const values = { kitCode, kitCodeConfirm, firstName, lastName, email, shippingAddressStreet, shippingAddressCity, shippingAddressState, shippingAddressZip, product, impression, stateOptions, impressionOptions, productOptions, orderNum, data, orderVerficationAttempt };

    switch(step) {
      case 1:
        return (
          <KitRegistrationStep1
            nextStep={this.nextStep}
            handleFieldChange={this.handleFieldChange}
            handleOrderVerficationSubmit={this.handleOrderVerficationSubmit}
            loading={loading}
            values={values}
          />
        )
      case 2:
        return (
          <KitRegistrationStep2
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleFieldChange={this.handleFieldChange}
            loading={loading}
            values={values}
          />
        )
      case 3:
        return (
          <KitRegistrationStep3
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleFieldChange={this.handleFieldChange}
            handleProductChange={this.handleProductChange}
            loading={loading}
            values={values}
          />
        )
      case 4:
      return (
        <KitRegistrationStep4
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          loading={loading}
          values={values}
        />
      )
      case 5:
      return (
        <KitRegistrationStep5 />
      )
    }

  }
}
