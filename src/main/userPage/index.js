import React, { Component } from "react";
import { Tab, Container, Menu, Segment } from "semantic-ui-react";
import { renderRoutes } from "../../components/route";
import ThemeRoutes from "./routing";
import Header from "./../publicPage/components/UI/Header";

class FullLayoutUser extends Component {
  state = { panes: [] };

  componentDidMount() {
    var tabs = [];
    ThemeRoutes.map((route, key) => {
      if (!route.redirect) {
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
        <div style={{ padding: "1em 0em", marginTop: "8.5em" }}>
          <Container>
            <Tab
              menu={{ fluid: true, vertical: true, tabular: true }}
              panes={panes}
            />
          </Container>
        </div>
      </div>
    );
  }
}

export default FullLayoutUser;
