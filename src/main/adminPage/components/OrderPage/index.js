import React, { Component } from "react";
import {
  Grid,
  Table,
  Icon,
  Menu,
  Button,
  Label,
  Segment,
  Header,
  Tab
} from "semantic-ui-react";
import { get, put } from "../../../../utils/ApiCaller";
import { ORDER_LIST, ORDER_CHANGE_STATUS } from "../../../../utils/ApiEndpoint";
import TimeAgo from "timeago-react";
import { getOrderFromAPI, changeStatusOrderToAPI } from "./Order.action";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { notification } from "antd";
const ORDER_STORE = "ORDER_STORE";

const loadOrderFromReducer = state => state[ORDER_STORE].orders;

const startSelector = createSelector(
  loadOrderFromReducer,
  orders => ({ orders: orders || [] })
);

class OrderMange extends Component {
  state = { details: [], user: {}, orderSelected: {} };
  componentDidMount() {
    this.props.getOrderFromAPI && this.props.getOrderFromAPI();
  }

  viewDetailOrder = value => {
    this.props.orders.map(order => {
      if (order.id === value) {
        this.setState({ details: order.orderDetail });
        this.setState({ user: order.user });
        this.setState({ orderSelected: order });
      }
    });
  };

  approveOrder = id => {
    this.props.changeStatusOrderToAPI &&
      this.props.changeStatusOrderToAPI(id, 2);
    notification.success({
      message: "Approved Order #" + id,
      placement: "topRight"
    });
  };

  deniedOrder = async id => {
    this.props.changeStatusOrderToAPI &&
      this.props.changeStatusOrderToAPI(id, 3);

    notification.error({
      message: "Denied Order #" + id,
      placement: "topRight"
    });
  };
  shippingOrder = async id => {
    this.props.changeStatusOrderToAPI &&
      this.props.changeStatusOrderToAPI(id, 4);

    notification.success({
      message: "Shipping Order #" + id,
      placement: "topRight"
    });
  };

  closeOrder = async id => {
    this.props.changeStatusOrderToAPI &&
      this.props.changeStatusOrderToAPI(id, 5);

    notification.success({
      message: "Closed Order #" + id,
      placement: "topRight"
    });
  };
  shippingFailOrder = async id => {
    this.props.changeStatusOrderToAPI &&
      this.props.changeStatusOrderToAPI(id, 6);
    notification.success({
      message: "Returned Order #" + id,
      placement: "topRight"
    });
  };

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
          <Label as="a" basic color="green">
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
          <Label as="a" basic color="olive">
            Failed Shipping
          </Label>
        );
        break;
    }
  };
  render() {
    const { details, user, orderSelected } = this.state;
    const { orders } = this.props;

    const panes = [
      {
        menuItem: "All",
        render: () => <Tab.Pane>All</Tab.Pane>
      },
      {
        menuItem: "Pending",
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
      },
      {
        menuItem: "Approved",
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
      },
      {
        menuItem: "Cancelled",
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
      },
      {
        menuItem: "Shipping",
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
      },
      {
        menuItem: "Closed",
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
      }
    ];

    const renderBtn = (id, status) => {
      switch (status) {
        case 1:
          return (
            <Table.Cell>
              <Button
                color="green"
                icon="check"
                content="Accept"
                size="small"
                onClick={() => this.approveOrder(id)}
              />
              <Button
                color="red"
                icon="times"
                content="Cancel"
                size="small"
                onClick={() => this.deniedOrder(id)}
              />
            </Table.Cell>
          );
          break;
        case 2:
          return (
            <Table.Cell>
              <Button
                color="blue"
                icon="shipping"
                content="Shipping"
                size="small"
                onClick={() => this.shippingOrder(id)}
              />
            </Table.Cell>
          );
          break;
        case 4:
          return (
            <Table.Cell>
              <Button
                color="blue"
                icon="inbox"
                content="Close"
                size="small"
                onClick={() => this.closeOrder(id)}
              />
              <Button
                color="olive"
                icon="user x"
                content="Ship Failed"
                size="small"
                onClick={() => this.shippingFailOrder(id)}
              />
            </Table.Cell>
          );
          break;
        default:
          return <Table.Cell />;
      }
    };

    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column width={13}>
            {/* <AddProduct /> */}
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={10}>
                  <Table padded="very" selectable>
                    <Table.Header fullWidth>
                      <Table.Row>
                        <Table.HeaderCell>Order-ID</Table.HeaderCell>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Created Time</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {orders.map(order => {
                        return (
                          <Table.Row
                            key={order.id}
                            as="tr"
                            onClick={() => this.viewDetailOrder(order.id)}
                          >
                            <Table.Cell>#{order.id}</Table.Cell>
                            <Table.Cell>{order.userId}</Table.Cell>
                            <Table.Cell>
                              {" "}
                              <TimeAgo
                                datetime={order.createdTime}
                                locale="en"
                              />
                            </Table.Cell>
                            <Table.Cell>${order.total}</Table.Cell>
                            <Table.Cell>
                              {this.renderStatus(order.status)}
                            </Table.Cell>
                            {renderBtn(order.id, order.status)}
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
                {Object.keys(this.state.orderSelected).length !== 0 ? (
                  <Grid.Column width={6}>
                    <Segment>
                      <Grid container>
                        <Grid.Row textAlign="right">
                          <Header as="h5">
                            Created at:{" "}
                            {new Date(
                              orderSelected.createdTime
                            ).toLocaleString()}
                          </Header>
                        </Grid.Row>
                        <Grid.Row centered>
                          <Header as="h2">
                            Order Detail #{orderSelected.id}
                          </Header>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                          <Grid.Column>Customer: {user.name}</Grid.Column>
                          <Grid.Column>Address: {user.address}</Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                          <Grid.Column>Phone: {user.phone}</Grid.Column>
                          <Grid.Column>Email: {user.email}</Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                          <Grid.Column>
                            Note:{" "}
                            {orderSelected.note === ""
                              ? "None"
                              : orderSelected.note}
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1} centered>
                          <Grid.Column>
                            Status: {this.renderStatus(orderSelected.status)}
                            <Button size="small" secondary floated="right">
                              Total: ${orderSelected.total}
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                    <Table padded="very" selectable>
                      <Table.Header fullWidth>
                        <Table.Row>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                          <Table.HeaderCell>Quanitty</Table.HeaderCell>
                          <Table.HeaderCell>Price</Table.HeaderCell>
                          <Table.HeaderCell>Subtotal</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {details.map(product => {
                          return (
                            <Table.Row key={product.id}>
                              <Table.Cell>{product.pro.name}</Table.Cell>
                              <Table.Cell>{product.quantity}</Table.Cell>
                              <Table.Cell>${product.price}</Table.Cell>
                              <Table.Cell>
                                <Button size="mini" secondary floated="right">
                                  ${product.price * product.quantity}
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                ) : (
                  <div />
                )}
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(
  startSelector,
  { getOrderFromAPI, changeStatusOrderToAPI }
)(OrderMange);
