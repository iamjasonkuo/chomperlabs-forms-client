import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Chomper Labs</h1>
        <p>A company for all your chomping needs</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
          <div className="well" style={wellStyles}>
            <LinkContainer to={`/register`}>
              <Button bsStyle="primary" bsSize="large" block>
                Register Your Kit
              </Button>
            </LinkContainer>
            <Button bsSize="large" block>
              My Orders
            </Button>
          </div>
      </div>
    )
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }
}

    const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
