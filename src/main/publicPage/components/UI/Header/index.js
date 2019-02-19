import React, { Component } from "react";
import logo from "../../../../../assets/images/logo2.png";

import {
  Grid,
  Icon,
  Image,
  Segment,
  Search,
  Menu,
  Container,
  Button,
  Input
} from "semantic-ui-react";
class HeaderPage extends Component {
  render() {
    return (
      <Menu borderless pointing fixed="top">
        <Container>
          <Image centered size="" src={logo} />
          <Menu.Item as="a">HOME</Menu.Item>
          <Menu.Item as="a" active>
            PRODUCT
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item>
              <Button animated="vertical">
                <Button.Content hidden>Shop</Button.Content>
                <Button.Content visible>
                  <Icon name="shop" />
                </Button.Content>
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button primary>Login</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default HeaderPage;
