import React, { Component } from "react";
import { Layout, Menu, Icon, Card } from "antd";
import "./admin.css";
import Footer from "../publicPage/components/UI/Footer";
import HeaderAdmin from "../adminPage/components/UI/Header";
import MenuRoutes from "./routingMenu";
import MainRoutes from "./routing";

import { Link } from "react-router-dom";
import { renderRoutes } from "../../components/route";
import { Icon as IconSe } from "semantic-ui-react";
const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: true
  };
  componentDidMount() {
    var path = this.props.location.pathname.split("/")[2];
    var index = MenuRoutes.findIndex(
      route => route.path.split("/")[1] === path
    );
    this.setState({ indexDefault: index });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  setActiveItem = path => {
    var name = path.split("/")[1];
    var index = MenuRoutes.findIndex(
      route => route.path.split("/")[1] === name
    );
    this.setState({ indexDefault: index });
  };

  render() {
    return (
      <Layout>
        <Sider
          style={{ paddingTop: 20 }}
          theme="light"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[this.state.indexDefault + ""]}
          >
            <Card
              hoverable
              size="small"
              onClick={this.toggle}
              style={{ marginBottom: 100, textAlign: "center" }}
            >
              <IconSe name="sliders horizontal" className="trigger" />
            </Card>
            {MenuRoutes.map((route, key) => {
              if (!route.redirect) {
                return (
                  <Menu.Item
                    key={key}
                    onClick={() => this.setActiveItem(route.path)}
                  >
                    <Link to={this.props.match.path + route.path}>
                      <Icon type={route.icon} />
                      <span>{route.name}</span>
                    </Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </Sider>
        <Layout>
          <HeaderAdmin
            match={this.props.match}
            history={this.props.history}
            location={this.props.location}
          />

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: "69vh"
            }}
          >
            {renderRoutes(MainRoutes, this.props.match.path)}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}
export default SiderDemo;
