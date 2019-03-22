import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import "./admin.css";
import Footer from "../publicPage/components/UI/Footer";
import HeaderAdmin from "../adminPage/components/UI/Header";
import MenuRoutes from "./routingMenu";
import { Link } from "react-router-dom";
import { renderRoutes } from "../../components/route";

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {MenuRoutes.map((route, key) => {
              if (!route.redirect) {
                return (
                  <Menu.Item key={key}>
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
          <HeaderAdmin toggle={this.toggle} />

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: "69vh"
            }}
          >
            {renderRoutes(MenuRoutes, this.props.match.path)}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}
export default SiderDemo;
