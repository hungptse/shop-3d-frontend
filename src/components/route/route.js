import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

class RouteContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    const { route } = this.props;

    route.preProcess && route.preProcess();
    this.setState({ loaded: true });
  }

  render() {
    const { route, match, history, location } = this.props;
    const { loaded } = this.state;

    return loaded ? <route.component {...route.props} match={match} history={history} location={location} /> : null;
  }
}

export const renderRoutes = (routes, url) => {
  return routes
    ? <Switch>
      {routes.map((prop, key) => {
        if (prop.redirect) {
          return <Redirect from={url + prop.path} to={url + prop.pathTo} key={key} />;
        }
        else {          
          return (
            <Route
              path={url + prop.path}
              key={key}
              render={({ match, history, location }) =>
                <RouteContent route={prop} match={match} history={history} location={location} />} />
          );
        }
      })}
    </Switch>
    : null;
};