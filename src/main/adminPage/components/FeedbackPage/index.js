import React, { Component } from "react";
import {
  Grid,
  Table,
  Rating,
  Label,
  Radio,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { get, put } from "../../../../utils/ApiCaller";
import { FEEDBACK, FEEDBACK_CHANGE } from "../../../../utils/ApiEndpoint";
import TimeAgo from "timeago-react";
import { Pagination, Popover, notification } from "antd";

const ITEM_ON_PAGE = 6;

class FeedbackMange extends Component {
  state = { feedbacks: [], page: [], loading: true };
  async componentDidMount() {
    await get(FEEDBACK(), {}, {}, {}).then(res => {
      this.setState({ feedbacks: res.data });
      this.setState({
        page: this.state.feedbacks.slice(0, ITEM_ON_PAGE)
      });
      setTimeout(() => {
        this.setState({loading : false});
      }, 1000);
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
    ).then(() => {
      this.setState({
        page: this.state.page.map(feedback =>
          feedback.id === id ? { ...feedback, isApprove: status } : feedback
        )
      });
      if(status){
        notification.success({
          message: "Approved feedback #" + id,
          description : this.state.page.find(feedback => feedback.id === id).comment,
          placement: "topRight"
        });
      } else{
        notification.error({
          message: "Denied feeback #" + id,
          description : this.state.page.find(feedback => feedback.id === id).comment,
          placement: "topRight"
        });
      }
    }).catch(() => {
      notification.error({
        message: "Error connection. Please try again",
        placement: "topRight"
      });
    });
  };
  render() {
    const { feedbacks, page, loading } = this.state;
    return (
      <Grid>
        <Dimmer active={loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
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
                    <Table.Row key={feedback.id}>
                      <Table.Cell>#{feedback.id}</Table.Cell>
                      <Table.Cell>
                        <Popover
                          content={new Date(
                            feedback.postedTime
                          ).toLocaleString()}
                          title="Posted at"
                        >
                          <TimeAgo datetime={feedback.postedTime} locale="en" />
                        </Popover>
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
