import React, { Component } from "react";
import {
  Comment,
  Header,
  Form,
  Button,
  Segment,
  Container,
  TextArea
} from "semantic-ui-react";

class FeedBack extends Component {
  render() {
    return (
      <Container>
        <Comment.Group size="large">
          <Comment>
            <Comment.Avatar as="a" src="https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg" />
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <span>Today at 5:42PM</span>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar as="a" src="https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg" />
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
            <Comment.Avatar as="a" src="https://s3.amazonaws.com/uifaces/faces/twitter/javorszky/128.jpg" />
            <Comment.Content>
              <Comment.Author as="a">Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <span>5 days ago</span>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
            </Comment.Content>
          </Comment>
          <Comment>
          <Form >
            <TextArea autoHeight placeholder="Tell us more"  style={{ minHeight: 100, marginBottom : '10px' }}/>
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
          </Comment>
        </Comment.Group>
      </Container>
    );
  }
}

export default FeedBack;
