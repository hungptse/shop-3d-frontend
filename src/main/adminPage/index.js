// import { renderRoutes } from '../../components/route';
// import ThemeRoutes from './adminRouter/routing.jsx';
import React, { Component } from "react";
import {
  Sidebar,
  Menu,
  Icon,
  Image,
  Divider
} from "semantic-ui-react";
import HeaderAdmin from "../adminPage/components/UI/Header";
import FooterAdmin from "../publicPage/components/UI/Footer";
import MenuRoutes from "./routingMenu";
import { Link } from "react-router-dom";
import { renderRoutes } from "../../components/route";
import logo from "../../assets/images/azgundam-logo.png";

class FullLayoutAdmin extends Component {
  state = { activeItem: this.props.location.pathname };

  backToHome = () => {
    this.props.history.push("/admin");
  };
  componentDidMount() {
    console.log(this.state.activeItem);
    
    if (this.state.activeItem === "/admin") {
      this.setState({ activeItem: "/admin/products" });
    } else {
      this.setState({ activeItem: this.props.location.pathname });
    }
  }
  handldeActiveItem = path => {
    this.setState({ activeItem: this.props.match.path  + path });
  };
  render() {
    return (
      <div>
        <HeaderAdmin
          match={this.props.match}
          history={this.props.history}
          location={this.props.location}
        />
        <div style={{  marginTop: "8em" }}>
          <Sidebar animation="overlay" visible>
            <Menu
              vertical
              fluid
              fixed="left"
              borderless
              style={{ paddingTop: "1em" }}
            >
              <Menu.Item>
                <Image
                  src={logo}
                  as="a"
                  size="medium"
                  style={{
                    cursor: "pointer"
                  }}
                  onClick={this.backToHome}
                />
              </Menu.Item>
              <Divider />
              {MenuRoutes.map((route, key) => {
                if (!route.redirect) {
                  return (
                    <Menu.Item
                      active={
                        this.state.activeItem ===
                        this.props.match.path + route.path
                          ? true
                          : false
                      }
                      style={{ paddingLeft: "3.5em" }}
                      key={key}
                    >
                      <Link
                        to={this.props.match.path + route.path}
                        style={{ color: "black" }}
                        onClick={() => this.handldeActiveItem(route.path)}
                      >
                        <Icon name={route.icon} size="large" style={{marginRight : '0.5em'}} />
                        {route.name}
                      </Link>
                    </Menu.Item>
                  );
                }
              })}
            </Menu>
          </Sidebar>
          <Sidebar.Pusher style={{ paddingLeft: "3em" }}>
            {renderRoutes(MenuRoutes, this.props.match.path)}
          </Sidebar.Pusher>
        </div>
        <FooterAdmin />
      </div>
    );
  }
}

export default FullLayoutAdmin;
