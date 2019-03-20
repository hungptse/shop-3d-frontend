import React, { Component } from "react";
import { Grid, Table, Icon, Menu, Rating, Label } from "semantic-ui-react";
import { get } from "../../../../utils/ApiCaller";
import { FEEDBACK_OF_USER } from "../../../../utils/ApiEndpoint";
import LocalStorageUtils from "../../../../utils/LocalStorage";
class FeedBackUser extends Component {
  state = { feedbacks: [] };
  async componentDidMount() {
    await get(FEEDBACK_OF_USER(LocalStorageUtils.getSub()), {}, {}).then(
      res => {
        this.setState({ feedbacks: res.data });
      }
    );
  }
  render() {
    const { feedbacks } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Table padded="very" selectable basic>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>ID-Feedback</Table.HeaderCell>
                  <Table.HeaderCell>Posted Time</Table.HeaderCell>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Rate</Table.HeaderCell>
                  <Table.HeaderCell>Comment</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {feedbacks.map(feedback => {
                  return (
                    <Table.Row
                      key={feedback.id}
                      negative={!feedback.isApprove}
                      positive={feedback.isApprove}
                    >
                      <Table.Cell>#{feedback.id}</Table.Cell>
                      <Table.Cell>
                        {new Date(feedback.postedTime).toLocaleString()}
                      </Table.Cell>
                      <Table.Cell>{feedback.pro.name}</Table.Cell>
                      <Table.Cell>
                        <Rating
                          icon="heart"
                          defaultRating={feedback.rate}
                          maxRating={5}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell>{feedback.comment}</Table.Cell>
                      <Table.Cell>
                        <Label
                          as="a"
                          basic
                          color={feedback.isApprove ? "green" : "red"}
                        >
                          {feedback.isApprove ? "Approved" : "Rejected"}
                        </Label>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default FeedBackUser;
