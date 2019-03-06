import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Segment,
  Divider,
  Grid,
  Header,
  Message,
  Dropdown,
  Image,
  Icon
} from "semantic-ui-react";
import { post } from "../../../../utils/ApiCaller";
import { AUTH__LOGIN } from "../../../../utils/ApiEndpoint";
import CookieStorageUtils, {
  COOKIE_KEY
} from "../../../../utils/CookieStorage";
import {
  setSignnedToReducer,
  getSignnedFromReducer,
  setUIDToReducer,
  getUIDFromReducer,
  setOpenToReducer
} from "../Login/Auth.action";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import jwt_decode from "jwt-decode";
const AUTH_STORE = "AUTH_STORE";
const signnedFromReducer = state => state[AUTH_STORE].signned;
const uidFromReducer = state => state[AUTH_STORE].uid;
const openFromReducer = state => state[AUTH_STORE].open;

const startSelector = createSelector(
  signnedFromReducer,
  uidFromReducer,
  openFromReducer,
  (signned, uid, open) => ({ signned: signned, uid: uid, open: open })
);

class LoginForm extends Component {
  state = {
    // open: false,
    username: "",
    password: "",
    error: true,
    loading: false
  };

  show = () => {
    this.props.setOpenToReducer && this.props.setOpenToReducer(true);
  };
  close = () => {
    this.props.setOpenToReducer && this.props.setOpenToReducer(false);
    this.setState({ error: true });
  };

  componentDidMount() {
    this.props.getSignnedFromReducer && this.props.getSignnedFromReducer();
    this.props.getUIDFromReducer && this.props.getUIDFromReducer();
  }

  handleSubmit = () => {
    this.setState({ loading: true });
    this.onLogin(this.state.username, this.state.password, token => {
      if (token) {
        CookieStorageUtils.setItem(COOKIE_KEY.JWT, token);
        CookieStorageUtils.setItem(COOKIE_KEY.UID, this.state.username);
        if (jwt_decode(token).role === "Admin") {
          this.props.history.push("/admin");
          this.props.setUIDToReducer &&
            this.props.setUIDToReducer(this.state.username, false);
        } else {
          this.props.setUIDToReducer &&
            this.props.setUIDToReducer(this.state.username, true);
        }
      }
    });
  };

  async onLogin(username, password, getToken) {
    await post(
      AUTH__LOGIN(),
      { username: username, password: password },
      {},
      {}
    )
      .then(res => {
        getToken(res.headers.authorization.replace("Bearer ", ""));
        this.setState({
          error: true,
          loading: false
        });
        this.props.setOpenToReducer && this.props.setOpenToReducer(false);
        this.props.setSignnedToReducer && this.props.setSignnedToReducer(true);
        window.location.reload();
      })
      .catch(() => {
        this.setState({ error: false, loading: false });
      });
  }

  handleLogout = () => {
    CookieStorageUtils.removeItem(COOKIE_KEY.JWT);
    this.props.setSignnedToReducer && this.props.setSignnedToReducer(false);
    this.props.setUIDToReducer && this.props.setUIDToReducer(undefined);
    window.location.reload();
  };

  render() {
    const { error, loading } = this.state;
    const { signned, uid, open } = this.props;

    const LogginButton = () => {
      if (signned) {
        return (
          <Dropdown trigger={dropdownBtn} pointing="top left">
            <Dropdown.Menu>
              <Dropdown.Item disabled>
                Signed in as <strong>{uid}</strong>
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="user" /> Account
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="settings" /> Settings
              </Dropdown.Item>
              <Dropdown.Item onClick={this.handleLogout}>
                <Icon name="sign-out" /> Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      }
      return (
        <Button onClick={this.show} primary>
          Login
        </Button>
      );
    };

    const dropdownBtn = (
      <span>
        <Image
          avatar
          src="https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg"
        />{" "}
        Hello, {uid}
      </span>
    );
    return (
      <div>
        {/* <Button onClick={this.show(true)}>Default</Button> */}
        {/* <Button onClick={this.show} primary>
          Login
        </Button> */}
        <LogginButton />
        {/* <Button onClick={this.show("blurring")}>Blurring</Button> */}

        <Modal
          // centered={false}
          dimmer="inverted"
          open={open}
          onClose={this.close}
        >
          <Segment placeholder style={{ background: "white" }} padded="very">
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column>
                <Form onSubmit={this.handleSubmit} error loading={loading}>
                  <Header textAlign="center">Login into 3D Shop</Header>
                  <Form.Input
                    icon="user"
                    iconPosition="left"
                    label="Username"
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                  <Form.Input
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    type="password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <Message hidden={error} error>
                    <Message.Content>
                      <Message.Header>Action Forbidden</Message.Header>
                      Invalid Username or Password
                    </Message.Content>
                  </Message>
                  {/* <Grid.Row columns={2}> */}
                  <Grid.Column>
                    <Button content="Login" secondary />
                  </Grid.Column>
                  {/* <Grid.Column  >
                      <Button content="Forgot Password?" secondary floated='right'/>
                    </Grid.Column> */}
                  {/* <Button content="" secondary /> */}
                  {/* </Grid.Row> */}
                </Form>
              </Grid.Column>

              <Grid.Column verticalAlign="middle">
                <Button content="Sign up account" icon="signup" size="medium" />
              </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
          </Segment>
        </Modal>
      </div>
    );
  }
}

export default connect(
  startSelector,
  {
    setSignnedToReducer,
    getSignnedFromReducer,
    setUIDToReducer,
    getUIDFromReducer,
    setOpenToReducer
  }
)(LoginForm);
