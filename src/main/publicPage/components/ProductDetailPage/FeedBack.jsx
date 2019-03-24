import React, { Component } from "react";
import {
  Comment,
  Form,
  Button,
  Container,
  TextArea,
  Icon,
  Rating,
  Header
} from "semantic-ui-react";

import { connect } from "react-redux";
import { createSelector } from "reselect";
import TimeAgo from "timeago-react";
import { post } from "../../../../utils/ApiCaller";
import { FEEDBACK } from "../../../../utils/ApiEndpoint";
import { notification } from "antd";

const AUTH_STORE = "AUTH_STORE";
const signnedFromReducer = state => state[AUTH_STORE].signned;
const profileFromReducer = state => state[AUTH_STORE].profile;

const startSelector = createSelector(
  signnedFromReducer,
  profileFromReducer,
  (signned, profile) => ({ signned: signned, profile: profile })
);

class FeedBack extends Component {
  state = { comt: "", rate: 3, loading: false };

  handleFeedback = async () => {
    this.setState({ loading: true });
    if (this.state.comt === "") {
      setTimeout(() => {
        notification.error({
          message: "Feedback push failed",
          description: "Please fill comment",
          placement: "topRight"
        });
        this.setState({ loading: false });
      }, 500);
    } else {
      this.setState({ loading: true });
      await post(
        FEEDBACK(),
        {
          rate: this.state.rate,
          comment: this.state.comt,
          uid: this.props.profile.username,
          pro: this.props.proId
        },
        {},
        {}
      ).then(res => {
        this.setState({ comt: "" });
        setTimeout(() => {
          notification.success({
            message: "Feedback pushed",
            description: "Thank you! Please waiting admin approve",
            placement: "topRight"
          });
          this.setState({ loading: false });
        }, 500);
      });
    }
  };

  renderFormFeedBack = () => {
    if (this.props.signned) {
      return (
        <Form loading={this.state.loading}>
          <Comment>
            <Comment.Avatar
              as="a"
              src="https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg"
            />
            <Comment.Content>
              <Comment.Author as="a">{this.props.profile.name}</Comment.Author>
              <Comment.Metadata>
                <Rating
                  icon="heart"
                  defaultRating={3}
                  maxRating={5}
                  onRate={(e, { rating }) => this.setState({ rate: rating })}
                />
              </Comment.Metadata>
              <Comment.Text>
                <TextArea
                  required
                  autoHeight
                  placeholder="Tell us more"
                  style={{
                    minHeight: 50,
                    marginBottom: "10px",
                    width: "80%",
                    padding: "10px 10px"
                  }}
                  value={this.state.comt}
                  onChange={(e, { value }) => this.setState({ comt: value })}
                />
                <Button
                  content="Feedback us"
                  labelPosition="left"
                  basic
                  size="small"
                  icon="paper plane outline"
                  attached
                  onClick={this.handleFeedback}
                />
              </Comment.Text>
            </Comment.Content>
          </Comment>
        </Form>
      );
    } else {
      return (
        <Header as="h4">
          <i>Please login to feedback and rating</i>
        </Header>
      );
    }
  };

  render() {
    const { feedbacks } = this.props;
    return (
      <Container style={{ height : 200, overflowY : "scroll" }}>
        <Comment.Group>
          {feedbacks.map(feedback => {
            if (feedback.isApprove) {
              return (
                <Comment key={feedback.id}>
                  <Comment.Avatar
                    as="a"
                    src="https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg"
                  />
                  <Comment.Content>
                    <Comment.Author as="a">{feedback.acc.name}</Comment.Author>
                    <Comment.Metadata>
                      <TimeAgo datetime={feedback.postedTime} locale="en" />
                      <Rating
                        icon="heart"
                        defaultRating={feedback.rate}
                        disabled
                        maxRating={5}
                      />
                    </Comment.Metadata>
                    <Comment.Text>{feedback.comment}</Comment.Text>
                  </Comment.Content>
                </Comment>
              );
            }
          })}

          {this.renderFormFeedBack()}
        </Comment.Group>
      </Container>
    );
  }
}

export default connect(
  startSelector,
  {}
)(FeedBack);
