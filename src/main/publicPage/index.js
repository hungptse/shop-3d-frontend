import React from "react";
import { renderRoutes } from "../../components/route";
import MenuRoutes from "./routingMenu.jsx";
import ThemeRoutes from "./routing.jsx";
import ScrollToTop from "../../utils/ScrollToTop";

// import { Segment, Sidebar, Menu, Icon } from "semantic-ui-react";
import HeaderPage from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import { Breadcrumb } from "semantic-ui-react";

class Fulllayout extends React.Component {
  render() {
    return (
      <div>
        <HeaderPage
          match={this.props.match}
          history={this.props.history}
          location={this.props.location}
          listRouters={MenuRoutes}
        />
        <div style={{ padding: "1em 0em", marginTop: "8em" }}>
          <ScrollToTop
            match={this.props.match}
            history={this.props.history}
            location={this.props.location}
          >
            {renderRoutes(ThemeRoutes, this.props.match.path)}
          </ScrollToTop>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Fulllayout;
