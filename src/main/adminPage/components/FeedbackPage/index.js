import React, { Component } from "react";
import { Grid, Table, Icon, Menu, Button, Rating, Label } from "semantic-ui-react";
import { get } from "../../../../utils/ApiCaller";
import { FEEDBACK } from "../../../../utils/ApiEndpoint";

class FeedbackMange extends Component {
  state = { feedbacks: [] };
  async componentDidMount() {
    await get(FEEDBACK(), {}, {}, {}).then(res => {
      this.setState({ feedbacks: res.data });
    });
  }

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
                  <Table.HeaderCell>Rate</Table.HeaderCell>
                  <Table.HeaderCell>Owner</Table.HeaderCell>
                  <Table.HeaderCell>Posted Time</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {feedbacks.map(feedback => {
                  return (
                    <Table.Row key={feedback.id}>
                      <Table.Cell>{feedback.id}</Table.Cell>
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
                        <Label as="a" basic color={feedback.isApprove ? "green" : "red"}>
                          {feedback.isApprove ? "Judged" : "Not Judge"}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="teal"
                          icon="edit outline"
                          content="Approve Rate"
                        />
                        <Button
                          color="teal"
                          icon="edit outline"
                          content="Denied Rate"
                        />
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
