import React, { Component } from "react";
import {
  Grid,
  Table,
  Icon,
  Menu,
  Rating,
  Label,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { get } from "../../../../utils/ApiCaller";
import { FEEDBACK_OF_USER } from "../../../../utils/ApiEndpoint";
import LocalStorageUtils from "../../../../utils/LocalStorage";
import { Pagination } from "antd";

const ITEM_ON_PAGE = 5;

class FeedBackUser extends Component {
  state = { feedbacks: [], page: [], loading: true };
  async componentDidMount() {
    await get(FEEDBACK_OF_USER(LocalStorageUtils.getSub()), {}, {}).then(
      res => {
        this.setState({ feedbacks: res.data });
        this.setState({
          page: this.state.feedbacks.slice(0, ITEM_ON_PAGE)
        });
      }
    );
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }
  changePage = pageNumber => {
    var indexMax = pageNumber * ITEM_ON_PAGE;
    this.setState({
      page: this.state.feedbacks.slice(indexMax - ITEM_ON_PAGE, indexMax)
    });
  };
  render() {
    const { feedbacks, page, loading } = this.state;
    return (
      <Grid>
        <Dimmer active={loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Grid.Row>
          <Grid.Column width={16}>
            <Table padded="very" selectable basic>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.HeaderCell>Posted Time</Table.HeaderCell>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Rate</Table.HeaderCell>
                  <Table.HeaderCell>Comment</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {page.map(feedback => {
                  return (
                    <Table.Row
                      key={feedback.id}
                      negative={!feedback.isApprove}
                      positive={feedback.isApprove}
                    >
                      <Table.Cell>#{feedback.id}</Table.Cell>
                      <Table.Cell>
                        {new Date(feedback.postedTime).toLocaleDateString()}
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
            <Grid>
              <Grid.Column floated="left" width={5} />
              <Grid.Column width={6} textAlign="center">
                <Pagination
                  defaultCurrent={1}
                  pageSize={ITEM_ON_PAGE}
                  onChange={page => this.changePage(page)}
                  total={feedbacks.length}
                />
              </Grid.Column>
              <Grid.Column floated="right" width={5} />
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default FeedBackUser;
