import React, { Component } from "react";
import { Menu, Container, Icon, Image } from "semantic-ui-react";
import Login from "../../../../publicPage/components/Login";
import { connect } from "react-redux";
import { setProfileToReducer } from "../../../../publicPage/components/Login/Auth.action";
import { createSelector } from "reselect";
import { notification, Card } from "antd";
import logo from "../../../../../assets/images/azgundam-logo.png";

const AUTH_STORE = "AUTH_STORE";
const profileFromReducer = state => state[AUTH_STORE].profile;
const startSelector = createSelector(
  profileFromReducer,
  profile => ({ profile: profile })
);
class HeaderAdmin extends Component {
  backToHome = () => {
    this.props.history.push("/admin");
  };

  componentDidMount() {
    this.props.setProfileToReducer && this.props.setProfileToReducer();
    setTimeout(() => {
      notification.success({
        message: "Welcome back, " + this.props.profile.name,
        placement: "topLeft",
        icon: <Icon name="react" />
      });
    }, 500);
  }

  render() {
    return (
      <Menu
        borderless
        secondary
        pointing
        style={{ paddingBottom: "1em", background: "#ffffff" }}
        className="boderBot"
      >
        <Container
          fluid
          style={{ backgroudColor: "white", paddingRight: "2em" }}
        >
          <Menu.Menu>
            <Menu.Item>
              <Image src={logo} as="a" size="small" />
            </Menu.Item>
          </Menu.Menu>
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

export default connect(
  startSelector,
  { setProfileToReducer }
)(HeaderAdmin);
