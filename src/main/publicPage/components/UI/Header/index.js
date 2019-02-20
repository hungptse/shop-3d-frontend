import React, { Component } from "react";
import logo from "../../../../../assets/images/azgundam-logo.png";
import { Link } from "react-router-dom";
import { Icon, Image, Menu, Container, Button, Input } from "semantic-ui-react";
class HeaderPage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: this.props.location.pathname };
  }

  componentDidMount(){
    if (this.state.activeItem === '/') {
      this.setState({ activeItem: "/home"});
    } else{
      this.setState({ activeItem: this.props.location.pathname });
    }
  }

  handldeActiveItem = path => {
    this.setState({ activeItem: "/" + path });
  };


  render() {
    return (
      <Menu fixed='top' borderless secondary pointing style={{ paddingBottom: "1em", background : '#f9f9f9' }}>
        <Container style={{ backgroudColor: "white" }}>
          <Image
            floated="left"
            src={logo}
            style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
          />
          {this.props.listRouters.map((route, key) => {
            if (!route.redirect) {
              return (
                <Menu.Item
                  active={
                    this.state.activeItem == "/" + route.path ? true : false
                  }
                  key={key}
                >
                  <Link
                    to={this.props.match.path + route.path}
                    style={{ color: "black" }}
                    onClick={() => this.handldeActiveItem(route.path)}
                  >
                    {route.name.toUpperCase()}
                  </Link>
                </Menu.Item>
              );
            }
          })}
          {/* <Menu.Item as="a">
            PRODUCT
          </Menu.Item> */}

          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item>
              <Button animated="fade">
                <Button.Content hidden>Cart</Button.Content>
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
