import React from "react";
import { renderRoutes } from "../../components/route";
import ThemeRoutes from "./routing.jsx";
import { Segment, Sidebar, Menu, Icon } from "semantic-ui-react";
import HeaderPage from "./components/UI/Header";
import Footer from "./components/UI/Footer";

class Fulllayout extends React.Component {
  render() {
    return (
      <div>
        <HeaderPage
          match={this.props.match}
          history={this.props.history}
          location={this.props.location}
          listRouters={ThemeRoutes}
        />
        <div
          style={{ minHeight: 700, padding: "1em 0em", marginTop: "8em" }}
        >
          {renderRoutes(ThemeRoutes, this.props.match.path)}
        </div>
      </div>
    );
  }
}
export default Fulllayout;
