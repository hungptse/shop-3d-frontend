import React, { Component } from "react";
import {
  Grid,
  Dimmer,
  Header,
  Form,
  Input,
  Image,
  Icon
} from "semantic-ui-react";

class ChangePassword extends Component {
  state = { oldPassword: "", newPassword: "", reNewPassword: "" };
  handleSumbit = () => {
      console.log(this.state);
      
  };
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={7}>
              <Image
                avatar
                size="massive"
                src="https://avatars1.githubusercontent.com/u/25200427?s=460"
              />
            </Grid.Column>
            <Grid.Column width={9}>
              <Grid.Row centered>
                <Header as="h3">Change Password</Header>
                <Form onSubmit={this.handleSumbit}>
                  <Form.Group widths="equal">
                    <Form.Field width={10}>
                      <label>Old Password</label>
                      <Input
                        label={{
                          basic: true,
                          content: <Icon name="terminal" size="small" />
                        }}
                        labelPosition="left"
                        onChange={e => this.setState({oldPassword : e.target.value})}
                        type="password"
                        required
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field width={16}>
                      <label>New Password</label>
                      <Input
                        label={{
                          basic: true,
                          content: <Icon name="terminal" size="small" />
                        }}
                        labelPosition="left"
                        type="password"
                        required
                        onChange={e => this.setState({newPassword : e.target.value})}
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field width={16}>
                      <label>Re-new Password</label>
                      <Input
                        label={{
                          basic: true,
                          content: <Icon name="terminal" size="small" />
                        }}
                        labelPosition="left"
                        type="password"
                        required
                        onChange={e => this.setState({reNewPassword : e.target.value})}                        
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Button width={16} fluid secondary>
                      Change Password
                    </Form.Button>
                  </Form.Group>
                </Form>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default ChangePassword;
