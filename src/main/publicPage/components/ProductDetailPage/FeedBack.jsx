import React, { Component } from "react";
import {
  Comment,
  Header,
  Form,
  Button,
  Segment,
  Container,
  TextArea,
  Icon
} from "semantic-ui-react";

import { connect } from "react-redux";
import { createSelector } from "reselect";
const AUTH_STORE = "AUTH_STORE";
const signnedFromReducer = state => state[AUTH_STORE].signned;
const startSelector = createSelector(
  signnedFromReducer,
  signned => ({ signned: signned })
);

class FeedBack extends Component {
  renderFormFeedBack = () => {
    if (this.props.signned) {
      return (
        <Comment>
          <Form>
            <TextArea
              autoHeight
              placeholder="Tell us more"
              style={{ minHeight: 100, marginBottom: "10px" }}
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment>
      );
    } else {
      return (
        <p>
          <i>Please login to feedback and rating</i>
        </p>
      );
    }
  };

  render() {
    return (
      <Container>
        <Comment.Group size="large">
          <Comment>
            <Comment.Avatar
              as="a"
              src="https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg"
            />
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <span>Today at 5:42PM</span>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar
              as="a"
              src="https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg"
            />
            <Comment.Content>
              <Comment.Author as="a">Elliot Fu</Comment.Author>
              <Comment.Metadata>
                <span>Yesterday at 12:30AM</span>
              </Comment.Metadata>
              <Comment.Text>
                <p>
                  This has been very useful for my research. Thanks as well!
                </p>
              </Comment.Text>
            </Comment.Content>
          </Comment>
          <Comment>
            <Comment.Avatar
              as="a"
              src="https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg"
            />
            <Comment.Content>
              <Comment.Author as="a">Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <span>
                  <Icon name="star" />5 Stars
                </span>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
            </Comment.Content>
          </Comment>
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
