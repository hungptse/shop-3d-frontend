import React, { Component } from "react";
import {
  Grid,
  Header,
  Card,
  Image,
  Form,
  Input,
  Icon,
  Radio,
  Loader,
  Dimmer
} from "semantic-ui-react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { get, put } from "../../../../utils/ApiCaller";
import { PROFILE_ACCOUNT } from "../../../../utils/ApiEndpoint";
import LocalStorageUtils from "../../../../utils/LocalStorage";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";
import moment from "moment";
import { setProfileToReducer } from "../../../publicPage/components/Login/Auth.action";
import { notification } from "antd";
const AUTH_STORE = "AUTH_STORE";
const profileFromReducer = state => state[AUTH_STORE].profile;

const startSelector = createSelector(
  profileFromReducer,
  profile => ({ profileInStore: profile })
);

class AccountProfilePage extends Component {
  state = { profile: {
    username : '',
    name : '',
    email : '', 
    phone : '',
    address : ''

  }, loading: false };
  async componentDidMount() {
    this.setState({ loading: true });
    await get(PROFILE_ACCOUNT(LocalStorageUtils.getSub())).then(res => {
      this.setState({ profile: res.data });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    });
  }

  handleSumbit = async () => {
    this.setState({ loading: true });
    await put(
      PROFILE_ACCOUNT(LocalStorageUtils.getSub()),
      {
        name: this.state.profile.name,
        gender: this.state.profile.gender,
        birthdate: this.state.profile.birthDate,
        email: this.state.profile.email,
        phone: this.state.profile.phone,
        address: this.state.profile.address
      },
      {},
      {}
    ).then(res => {
      this.props.setProfileToReducer && this.props.setProfileToReducer();
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
      notification.success({
        message: "Change profile successful",
        placement: "topRight"
      });
    }).catch(err => {
      notification.error({
        message: "Change profile unsuccessful",
        placement: "topRight"
      });
    });
  };

  render() {
    const { profile, loading } = this.state;
    return (
      <div>
        <Grid>
          <Dimmer active={loading} inverted>
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
                <Header as="h3">Profice Account</Header>
                <Form onSubmit={this.handleSumbit}>
                  <Form.Group widths="equal">
                    <Form.Field width={7}>
                      <label>Username</label>
                      <Input
                        label={{
                          basic: true,
                          content: <Icon name="terminal" size="small" />
                        }}
                        value={profile.username}
                        labelPosition="left"
                        readOnly
                        type="text"
                      />
                    </Form.Field>
                    <Form.Field width={9}>
                      <label>Name</label>
                      <Input
                        type="text"
                        required
                        value={profile.name}
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
                    <Form.Field width={6}>
                      <label>Gender</label>
                      <Form.Field inline>
                        <Radio
                          label="Male"
                          name="radioGroup"
                          checked={profile.gender === true}
                          onChange={e =>
                            this.setState({
                              profile: {
                                ...this.state.profile,
                                gender: true
                              }
                            })
                          }
                        />
                        <Radio
                          label="Female"
                          name="radioGroup"
                          checked={profile.gender === false}
                          onChange={e =>
                            this.setState({
                              profile: {
                                ...this.state.profile,
                                gender: false
                              }
                            })
                          }
                        />
                      </Form.Field>
                    </Form.Field>
                    <Form.Field width={6}>
                      <label>Birthdate</label>
                      <DayPickerInput
                        style={{ width: "100%" }}
                        format="MM/DD/YYYY"
                        formatDate={formatDate}
                        parseDate={parseDate}
                        value={moment(profile.birthDate).format("MM/DD/YYYY")}
                        onDayChange={value =>
                          this.setState({
                            profile: {
                              ...this.state.profile,
                              birthDate: moment(value).format("MM/DD/YYYY")
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
                        onChange={e => {}}
                        value={profile.email}
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
                        value={profile.phone}
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
                        value={profile.address}
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
                  <Form.Group>
                    <Form.Button width={16} fluid secondary>
                      Update Profile
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

export default connect(
  startSelector,
  { setProfileToReducer }
)(AccountProfilePage);
