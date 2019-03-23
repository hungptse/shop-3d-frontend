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
import { Pagination } from "antd";

const ITEM_ON_PAGE = 6;

class FeedbackMange extends Component {
  state = { feedbacks: [], page: [] , loading : true };
  async componentDidMount() {
    await get(FEEDBACK(), {}, {}, {}).then(res => {
      this.setState({ feedbacks: res.data });
      this.setState({
        page: this.state.feedbacks.slice(0, ITEM_ON_PAGE)
      });
    });    
  }
  changePage = pageNumber => {
    var indexMax = pageNumber * ITEM_ON_PAGE;
    this.setState({
      page: this.state.feedbacks.slice(indexMax - ITEM_ON_PAGE, indexMax)
    });
  };

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
        page: this.state.page.map(feedback =>
          feedback.id === id ? { ...feedback, isApprove: status } : feedback
        )
      });
    });
  };
  render() {
    const { feedbacks, page , loading } = this.state;
    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column width={16}>
            <Table padded="very" selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>ID-Feedback</Table.HeaderCell>
                  <Table.HeaderCell>Posted Time</Table.HeaderCell>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>User</Table.HeaderCell>
                  <Table.HeaderCell>Rate</Table.HeaderCell>
                  <Table.HeaderCell>Comment</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {page.map(feedback => {
                  return (
                    <Table.Row key={feedback.id} negative={!feedback.isApprove} positive={feedback.isApprove}>
                      <Table.Cell>
                        #{feedback.id}
                      </Table.Cell>
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
                })}
              </Table.Body>
            </Table>
            <Grid>
              <Grid.Column width={16} textAlign="right">
                <Pagination
                  defaultCurrent={1}
                  pageSize={ITEM_ON_PAGE}
                  onChange={page => this.changePage(page)}
                  total={feedbacks.length}
                />
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default FeedbackMange;
