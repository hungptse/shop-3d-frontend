import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Segment,
  Divider,
  Grid,
  Header,
  Message} from "semantic-ui-react";
import { post } from "../../../../utils/ApiCaller";
import { AUTH__LOGIN } from "../../../../utils/ApiEndpoint";
import CookieStorageUtils, {
  COOKIE_KEY
} from "../../../../utils/CookieStorage";

class LoginForm extends Component {
  state = {
    open: false,
    username: "",
    password: "",
    error: true,
    loading: false
  };

  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false, error : true });

  handleSubmit = () => {
    console.log(this.state.username + " " + this.state.password);
    this.setState({ loading: true });
    this.onLogin(this.state.username, this.state.password, token => {
      if (token) {
        CookieStorageUtils.setItem(COOKIE_KEY.JWT, token);
        CookieStorageUtils.setItem(COOKIE_KEY.USERNAME, this.state.username);
      }
    });
    // this.setState({loading : false});
  };

  async onLogin(username, password, cb) {
    await post(
      AUTH__LOGIN,
      { username: username, password: password },
      {},
      { "Content-Type": "application/json" }
    )
      .then(res => {
        cb(res.config.headers.Authorization.replace("Bearer ", ""));
        this.setState({ error: true, loading: false });
      })
      .catch(() => {
              this.setState({ error: false, loading: false });
              console.log("Invalid Username or Password");
          });
  }

  render() {
    const { open, error, loading } = this.state;
    return (
      <div>
        {/* <Button onClick={this.show(true)}>Default</Button> */}
        <Button onClick={this.show} primary>
          Login
        </Button>
        {/* <Button onClick={this.show("blurring")}>Blurring</Button> */}

        <Modal centered={false} dimmer="blurring" open={open} onClose={this.close}>
          <Segment placeholder style={{ background: "white" }} padded='very'>
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column>
                <Form onSubmit={this.handleSubmit} error loading={loading}>
                  <Header textAlign="center">Login into 3D Shop</Header>
                  <Form.Input
                    icon="user"
                    iconPosition="left"
                    label="Username"
                    placeholder="Username"
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
                  <Button content="Login" secondary />
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

export default LoginForm;
