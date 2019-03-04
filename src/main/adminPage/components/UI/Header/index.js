import React, { Component } from "react";
import logo from "../../../../../assets/images/azgundam-logo.png";
import {
  Image,
  Menu,
  Container,
  Button,
  Input,
  Divider
} from "semantic-ui-react";

class HeaderAdmin extends Component {
  backToHome = () => {
    this.props.history.push("/admin");
  };

  render() {
    return (
      <Menu
        fixed="top"
        borderless
        secondary
        pointing
        style={{ paddingBottom: "1em", background: "#ffffff" }}
        className="boderBot"
      >
        {/* <Container style={{ backgroudColor: "white" }} >
          <Menu position="right">
            <Menu.Item>
              ABC
              <SearchBar
                match={this.props.match}
                history={this.props.history}
                location={this.props.location}
              />
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item>
              CDF
              <Login
                match={this.props.match}
                history={this.props.history}
                location={this.props.location}
              />
            </Menu.Item>
          </Menu>
        </Container> */}
      </Menu>
    );
  }
}

export default HeaderAdmin;
