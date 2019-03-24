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
import { get } from "../../../../utils/ApiCaller";
import { ACCOUNT_CHECK } from "../../../../utils/ApiEndpoint";
import { message } from "antd";

class RegisterPage extends Component {
  state = { profile: {} };
  handleSumbit = () => {
    console.log(this.state.profile);
  };

  checkDuplicate = async username => {
    if (username.length >= 6) {
      await get(ACCOUNT_CHECK(username))
      .then(res => {
        message.error("Username already existed");
      })
      .catch(err => {
        message.success("Username can be use");
        this.setState({
          profile: {
            ...this.state.profile,
            username: username
          }
        });
      });
    } else {
      message.error("Username must have length > 6");
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
                      // value={profile.username}
                      onChange={e => this.checkDuplicate(e.target.value)}
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
                        content: <Icon name="lock"/>
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
                  <Form.Button width={8} fluid secondary disabled>
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
