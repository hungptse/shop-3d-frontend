// import { renderRoutes } from '../../components/route';
// import ThemeRoutes from './adminRouter/routing.jsx';
import React, { Component } from "react";
import {
  Sidebar,
  Menu,
  Icon,
  Image,
  Header,
  Segment,
  Input,
  Container,
  Divider
} from "semantic-ui-react";
import HeaderAdmin from "../adminPage/components/UI/Header";
import FooterAdmin from "../publicPage/components/UI/Footer";
import MenuRoutes from "./routingMenu";
import { Link } from "react-router-dom";
import { renderRoutes } from "../../components/route";
import logo from "../../assets/images/azgundam-logo.png";

class FullLayoutAdmin extends Component {
  backToHome = () => {
    this.props.history.push("/admin");
  };

  render() {
    return (
      <div>
        <HeaderAdmin
          match={this.props.match}
          history={this.props.history}
          location={this.props.location}
        />
        <div style={{ height: "800px", marginTop: "8em" }}>
          <Sidebar vertical visible>
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
                      // active={
                      //   this.state.activeItem ===
                      //   this.props.match.path + "/" + route.path
                      //     ? true
                      //     : false
                      // }
                      key={key}
                    >
                      <Link
                        to={this.props.match.path + route.path}
                        style={{ color: "black" }}
                        // onClick={() => this.handldeActiveItem(route.path)}
                      >
                        <Icon name={route.icon} size="large" />
                        {route.name}
                      </Link>
                    </Menu.Item>
                  );
                }
              })}
            </Menu>
          </Sidebar>
          <Sidebar.Pusher as={Container} fluid style={{ paddingLeft: "1em" }}>
            {renderRoutes(MenuRoutes, this.props.match.path)}
          </Sidebar.Pusher>
        </div>
        <FooterAdmin />
      </div>
    );
  }
}

export default FullLayoutAdmin;
