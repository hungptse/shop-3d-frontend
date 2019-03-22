import React, { Component } from "react";
import {
  Grid,
  Table,
  Icon,
  Menu,
  Label,
  Header,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { get } from "../../../../utils/ApiCaller";
import { ORDER_OF_USER } from "../../../../utils/ApiEndpoint";
import LocalStorageUtils from "../../../../utils/LocalStorage";
import { Pagination } from "antd";

const ITEM_ON_PAGE = 5;

class OrderUser extends Component {
  state = { orders: [], page: [], loading: true };
  async componentDidMount() {
    await get(ORDER_OF_USER(LocalStorageUtils.getSub()), {}, {}).then(res => {
      this.setState({ orders: res.data });
      this.setState({ page: this.state.orders.slice(0, ITEM_ON_PAGE) });
    });
    setTimeout(() => {
      this.setState({ loading : false});
    }, 500);
  }

  renderStatus = status => {
    switch (status) {
      case 1:
        return (
          <Label as="a" basic color="grey">
            Pending
          </Label>
        );
        break;
      case 2:
        return (
          <Label as="a" basic color="blue">
            Approved
          </Label>
        );
        break;
      case 3:
        return (
          <Label as="a" basic color="red">
            Cancelled
          </Label>
        );
        break;
      case 4:
        return (
          <Label as="a" basic color="blue">
            Shipping
          </Label>
        );
        break;
      case 5:
        return (
          <Label as="a" basic color="green">
            Successful
          </Label>
        );
        break;
      case 6:
        return (
          <Label as="a" basic color="red">
            Failed Shipping
          </Label>
        );
        break;
    }
  };
  changePage = pageNumber => {
    var indexMax = pageNumber * ITEM_ON_PAGE;
    this.setState({
      page: this.state.orders.slice(indexMax - ITEM_ON_PAGE, indexMax)
    });
  };
  linkToDetail = id => {
    this.props.history.push(`order/${id}`);
  };

  render() {
    const { orders, page, loading } = this.state;
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
                  <Table.HeaderCell>Created Time</Table.HeaderCell>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {page.map(order => {
                  return (
                    <Table.Row
                      key={order.id}
                      onClick={() => this.linkToDetail(order.id)}
                    >
                      <Table.Cell>#{order.id}</Table.Cell>
                      <Table.Cell>
                        {new Date(order.createdTime).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>{order.orderDetail[0].pro.name}</Table.Cell>
                      <Table.Cell>${order.total}</Table.Cell>
                      <Table.Cell>{this.renderStatus(order.status)}</Table.Cell>
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
                  total={orders.length}
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

export default OrderUser;
