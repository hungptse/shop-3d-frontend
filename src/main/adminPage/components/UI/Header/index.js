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
import Login from "../../../../publicPage/components/Login";

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
        <Container fluid style={{ backgroudColor: "white" }} style={{paddingRight: '2em'}}>
          <Menu.Menu position="right">
            <Menu.Item>
              <Login
                match={this.props.match}
                history={this.props.history}
                location={this.props.location}
              />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default HeaderAdmin;
