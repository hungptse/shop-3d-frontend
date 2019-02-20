import React from "react";
import { renderRoutes } from "../../components/route";
import ThemeRoutes from "./routing.jsx";
import { Segment } from "semantic-ui-react";
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
        <Segment
          style={{ minHeight: 700, padding: "1em 0em", marginTop: "8em" }}
          vertical
        >
          {renderRoutes(ThemeRoutes, this.props.match.path)}
        </Segment>
        {/* <Footer /> */}
      </div>
    );
  }
}
export default Fulllayout;
