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
import LocalStorageUtils, {
  LOCAL_STORAGE_KEY
} from "../../../../utils/LocalStorage";
import {
  setSignnedToReducer,
  getSignnedFromReducer,
  setOpenToReducer,
  setProfileToReducer
} from "../Login/Auth.action";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import jwt_decode from "jwt-decode";
import { notification } from "antd";
const AUTH_STORE = "AUTH_STORE";
const signnedFromReducer = state => state[AUTH_STORE].signned;
const uidFromReducer = state => state[AUTH_STORE].uid;
const openFromReducer = state => state[AUTH_STORE].open;
const profileFromReducer = state => state[AUTH_STORE].profile;

const startSelector = createSelector(
  signnedFromReducer,
  uidFromReducer,
  openFromReducer,
  profileFromReducer,
  (signned, uid, open, profile) => ({
    signned: signned,
    uid: uid,
    open: open,
    profile: profile
  })
);

class LoginForm extends Component {
  state = {
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
    this.setState({ uid: LocalStorageUtils.getSub() });
  }

  handleSubmit = () => {
    this.setState({ loading: true });
    this.onLogin(this.state.username, this.state.password, token => {
      if (token) {
        LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.JWT, token);
        if (jwt_decode(token).role === "Admin") {
          this.props.history.push("/admin");
        } else {
          setTimeout(() => {
            notification.success({
              message: "Welcome back, " + this.props.profile.name,
              placement: "topRight"
            });
          }, 500);
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
        this.setState({ uid: LocalStorageUtils.getSub() });
        this.props.setOpenToReducer && this.props.setOpenToReducer(false);
        this.props.setSignnedToReducer && this.props.setSignnedToReducer(true);
        this.props.setProfileToReducer && this.props.setProfileToReducer();
        // setTimeout(() => {
        //   notification.success({
        //     message: "Welcome back, " + this.props.profile.name,
        //     placement: "topRight"
        //   });
        // }, 500);
      })
      .catch(() => {
        this.setState({ error: false, loading: false });
      });
  }

  handleLogout = () => {
    LocalStorageUtils.removeItem(LOCAL_STORAGE_KEY.JWT);
    this.props.setSignnedToReducer && this.props.setSignnedToReducer(false);
    window.location.reload();
  };

  handleAccount = () => {
    this.props.history.push("/user");
  };

  // changePassword = () => {
  //   this.props.history.push("/user/change-password")
  // }

  render() {
    const { error, loading, uid } = this.state;
    const { signned, open } = this.props;

    const LogginButton = () => {
      if (signned) {
        return (
          <Dropdown trigger={dropdownBtn} pointing="top left">
            <Dropdown.Menu>
              <Dropdown.Item disabled>
                Signed in as <strong>{uid}</strong>
              </Dropdown.Item>
              <Dropdown.Item onClick={this.handleAccount}>
                <Icon name="user" /> My Account
              </Dropdown.Item>
              {/* <Dropdown.Item onClick={this.changePassword}>
                <Icon name="settings" /> Change Password
              </Dropdown.Item> */}
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
          size="mini"
        />
        Hello, {this.props.profile.name}
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
    setOpenToReducer,
    setProfileToReducer
  }
)(LoginForm);
