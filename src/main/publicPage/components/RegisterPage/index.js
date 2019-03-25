import React, { Component } from "react";
import {
  Grid,
  Container,
  Segment,
  Form,
  Input,
  Radio,
  Icon,
  Header,
  Label,
  Message
} from "semantic-ui-react";
import { get, post } from "../../../../utils/ApiCaller";
import { ACCOUNT_CHECK, ACCOUNT } from "../../../../utils/ApiEndpoint";
import { message, notification } from "antd";

class RegisterPage extends Component {
  state = { profile: {} };
  handleSumbit = async () => {
    var profile = this.state.profile;
    var valid = true;
    if (profile.username.length < 6) {
      notification.error({
        message: "Invalid username",
        description: "Username must have length great than 6 letter",
        placement: "topRight"
      });
      valid = false;
    }
    if (profile.pwd !== profile.rePwd) {
      notification.error({
        message: "Invalid password",
        description: "Two passwords that you enter is inconsistent!",
        placement: "topRight"
      });
      valid = false;
    }
    if (valid) {
      await post(
        ACCOUNT(),
        {
          username: profile.username,
          name: profile.name,
          password: profile.pwd,
          email: profile.email,
          phone: profile.phone,
          address: profile.phone
        },
        {},
        {}
      )
        .then(res => {
          notification.success({
            message: "Register successful",
            description: "You can login to system now!",
            placement: "topRight"
          });
          this.props.history.push("store");
        })
        .catch(err => {
          notification.error({
            message: "Username existed",
            description: "Username that you enter is already used",
            placement: "topRight"
          });
        });
    }
  };

  render() {
    return (
      <Grid container style={{ height: 800 }}>
        <Grid.Row columns={1} centered>
          <Grid.Column width={8}>
            <Grid.Row centered>
              <Header as="h2" textAlign="center" style={{ fontWeight: 400 }}>
                Register Account
              </Header>
              <Form onSubmit={this.handleSumbit}>
                <Form.Group widths="equal">
                  <Form.Field width={8}>
                    <label>Username</label>
                    <Input
                      label={{
                        basic: true,
                        content: <Icon name="terminal" size="small" />
                      }}
                      onChange={e =>
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            username: e.target.value
                          }
                        })
                      }
                      required
                      labelPosition="left"
                      type="text"
                    />
                  </Form.Field>
                  <Form.Field width={8}>
                    <label>Name</label>
                    <Input
                      type="text"
                      required
                      label={{
                        basic: true,
                        content: <Icon name="user" size="small" />
                      }}
                      onChange={e =>
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            name: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field width={16}>
                    <label>Password</label>
                    <Input
                      label={{
                        basic: true,
                        content: <Icon name="lock" />
                      }}
                      type="password"
                      required
                      onChange={e =>
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            pwd: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field width={16}>
                    <label>Retype Password</label>
                    <Input
                      label={{
                        basic: true,
                        content: <Icon name="lock" />
                      }}
                      type="password"
                      required
                      // value={profile.email}
                      onChange={e =>
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            rePwd: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field width={6}>
                    <label>Email</label>
                    <Input
                      label={{
                        basic: true,
                        content: <Icon name="at" size="small" />
                      }}
                      type="email"
                      required
                      // value={profile.email}
                      onChange={e =>
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            email: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Field>
                  <Form.Field width={6}>
                    <label>Phone</label>
                    <Input
                      label={{
                        basic: true,
                        content: <Icon name="phone" size="small" />
                      }}
                      labelPosition="left"
                      type="number"
                      onChange={e =>
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            phone: e.target.value
                          }
                        })
                      }
                      required
                    />
                  </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Field width={12}>
                    <label>Address</label>
                    <Input
                      label={{
                        basic: true,
                        content: <Icon name="map" size="small" />
                      }}
                      labelPosition="left"
                      type="text"
                      required
                      onChange={e =>
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            address: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="sixteen">
                  <Form.Field width={4} />
                  <Form.Button width={8} fluid secondary>
                    Create Account
                  </Form.Button>
                </Form.Group>
              </Form>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default RegisterPage;
