import React, { Component } from "react";
import {
  Grid,
  Table,
  Icon,
  Menu,
  Button,
  Rating,
  Label,
  Radio
} from "semantic-ui-react";
import { get, put } from "../../../../utils/ApiCaller";
import { FEEDBACK, FEEDBACK_CHANGE } from "../../../../utils/ApiEndpoint";
import TimeAgo from "timeago-react";
class FeedbackMange extends Component {
  state = { feedbacks: [] };
  async componentDidMount() {
    await get(FEEDBACK(), {}, {}, {}).then(res => {
      this.setState({ feedbacks: res.data });
    });
  }

  changeStatus = async (id, status) => {
    await put(
      FEEDBACK_CHANGE(id),
      {
        status: status
      },
      {},
      {}
    ).then(res => {
      this.setState({
        feedbacks: this.state.feedbacks.map(feedback =>
          feedback.id === id ? { ...feedback, isApprove: status } : feedback
        )
      });
    });
  };
  render() {
    const { feedbacks } = this.state;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column width={13}>
            {/* <AddProduct /> */}
            <Table padded="very" selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>ID-Feedback</Table.HeaderCell>
                  <Table.HeaderCell>Posted Time</Table.HeaderCell>
                  <Table.HeaderCell>Rate</Table.HeaderCell>
                  <Table.HeaderCell>Owner</Table.HeaderCell>
                  <Table.HeaderCell>comment</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {feedbacks.map(feedback => {
                  return (
                    <Table.Row key={feedback.id} negative={!feedback.isApprove} positive={feedback.isApprove}>
                      <Table.Cell>
                        #{feedback.id}
                      </Table.Cell>
                      <Table.Cell>
                        {new Date(feedback.postedTime).toLocaleString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Rating
                          icon="heart"
                          defaultRating={feedback.rate}
                          maxRating={5}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell>{feedback.userId}</Table.Cell>
                      <Table.Cell>{feedback.comment}</Table.Cell>
                      <Table.Cell>
                        <Label
                          as="a"
                          basic
                          color={feedback.isApprove ? "green" : "red"}
                        >
                          {feedback.isApprove ? "Judged" : "Not Judge"}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Radio
                          toggle
                          checked={feedback.isApprove}
                          onClick={() =>
                            this.changeStatus(feedback.id, !feedback.isApprove)
                          }
                        />
                        {/* <Button
                          size="small"
                          color="green"
                          icon="check"
                          content="Approve"
                        />
                        <Button
                          size="small"
                          color="red"
                          icon="times"
                          content="Denied"
                        /> */}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="12">
                    <Menu floated="right" pagination>
                      <Menu.Item as="a" icon>
                        <Icon name="chevron left" />
                      </Menu.Item>
                      <Menu.Item as="a">1</Menu.Item>
                      <Menu.Item as="a">2</Menu.Item>
                      <Menu.Item as="a">3</Menu.Item>
                      <Menu.Item as="a">4</Menu.Item>
                      <Menu.Item as="a" icon>
                        <Icon name="chevron right" />
                      </Menu.Item>
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default FeedbackMange;
