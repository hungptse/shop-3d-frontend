import React, { Component } from "react";
import { Tab, Container, Menu } from "semantic-ui-react";
import { renderRoutes } from "../../components/route";
import ThemeRoutes from "./routing.jsx";
import Header from "./../publicPage/components/UI/Header";
import Footer from "./../publicPage/components/UI/Footer";
class FullLayoutUser extends Component {
  state = { panes: [] };

  componentDidMount() {
    var tabs = [];
     // eslint-disable-next-line
    ThemeRoutes.map((route, key) => {
      if (!route.redirect && !route.hidden) {
        tabs.push({
          menuItem: (
            <Menu.Item
              key={key}
              onClick={() =>
                this.props.history.push(this.props.match.path + route.path)
              }
            >
              {route.name}
            </Menu.Item>
          ),
          render: () => (
            <Tab.Pane key={key}>
              {renderRoutes(ThemeRoutes, this.props.match.path)}
            </Tab.Pane>
          )
        });
      }
    });
    this.setState({
      panes: tabs
    });
  }
  renderTab = () => {};

  render() {
    const { panes } = this.state;
    return (
      <div>
        <Header
          match={this.props.match}
          history={this.props.history}
          location={this.props.location}
          listRouters={[]}
        />
        <div style={{ padding: "1em 0em", minHeight: "55.5em", position : "relative", top : "8.5em" }}>
          <Container>
            <Tab
              menu={{ fluid: true, vertical: true, tabular: true }}
              panes={panes}
            />
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default FullLayoutUser;
