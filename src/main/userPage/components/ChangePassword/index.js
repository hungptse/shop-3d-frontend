import React, { Component } from "react";
import {
  Grid,
  Dimmer,
  Header,
  Form,
  Input,
  Image,
  Icon,
  Loader
} from "semantic-ui-react";
import { message, notification } from "antd";
import { put } from "../../../../utils/ApiCaller";
import { CHANGE_PASSWORD } from "../../../../utils/ApiEndpoint";
import LocalStorageUtil from "../../../../utils/LocalStorage";
class ChangePassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
    loading: false
  };
  handleSumbit = async () => {
    console.log(this.state);
    if (this.state.newPassword === this.state.reNewPassword) {
      this.setState({ loading: true });
      await put(
        CHANGE_PASSWORD(),
        {
          username: LocalStorageUtil.getSub(),
          password: this.state.oldPassword,
          newPassword: this.state.newPassword
        },
        {},
        {}
      )
        .then(res => {
          notification.success({
            message: "Change password successful",
            description: "Password changed",
            placement: "topRight"
          });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 500);
          this.setState({ oldPassword : "", reNewPassword : "", newPassword : "" });
        })
        .catch(err => {
          notification.error({
            message: "Opp! Something wrong",
            description: "Incorrect old password",
            placement: "topRight"
          });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 500);
          this.setState({ reNewPassword : "" });
        });
    } else {
      notification.error({
        message: "Opp! Something wrong",
        description: "Re-Password not match with new password",
        placement: "topRight"
      });
      this.setState({ reNewPassword : "", newPassword : ""})
    }
  };
  render() {
    return (
      <div>
        <Grid>
          <Dimmer active={this.state.loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
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
                        onChange={e =>
                          this.setState({ oldPassword: e.target.value })
                        }
                        type="password"
                        required
                        value={this.state.oldPassword}
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
                        onChange={e =>
                          this.setState({ newPassword: e.target.value })
                        }
                        value={this.state.newPassword}
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
                        onChange={e =>
                          this.setState({ reNewPassword: e.target.value })
                        }
                        value={this.state.reNewPassword}

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
