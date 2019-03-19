import React, { Component } from "react";
import { Grid, Table, Icon, Menu } from "semantic-ui-react";

class FeedBackUser extends Component {
  render() {
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
                {/* {feedbacks.map(feedback => {
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
                      <Table.Cell>{feedback.acc.name}</Table.Cell>
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
                      <Table.Cell>
                        <Radio
                          toggle
                          checked={feedback.isApprove}
                          onClick={() =>
                            this.changeStatus(feedback.id, !feedback.isApprove)
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })} */}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default FeedBackUser;
