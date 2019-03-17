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

class OrderMange extends Component {
  state = { orders: [], details: [], user: {}, orderSelected: [] };
  componentDidMount() {
    get(ORDER_LIST(), {}, {}).then(res => {
      this.setState({ orders: res.data });
    });
  }

  viewDetailOrder = value => {
    this.state.orders.map(order => {
      if (order.id === value) {
        this.setState({ details: order.orderDetail });
        this.setState({ user: order.user });
        this.setState({ orderSelected: order });
      }
    });
  };

  approveOrder = async id => {
    await put(ORDER_CHANGE_STATUS(id, 2), {}, {}, {})
      .then(res => {
        this.setState({
          orders: this.state.orders.map(order => order.id === id ? {...order, status : 2} : order)
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deniedOrder = async id => {
    await put(ORDER_CHANGE_STATUS(id, 3), {}, {}, {})
      .then(res => {
        this.setState({
          orders: this.state.orders.map(order => order.id === id ? {...order, status : 3} : order)
        });
      })
      .catch(err => {
        console.log(err);
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
            Denieded
          </Label>
        );
        break;
    }
  };
  render() {
    const { orders, details, user, orderSelected } = this.state;
    const panes = [
      {
        menuItem: "Tab 1",
        render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
      },
      {
        menuItem: "Tab 2",
        render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
      },
      {
        menuItem: "Tab 3",
        render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
      }
    ];
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column width={13}>
            {/* <AddProduct /> */}
            {/* <Tab menu={{ secondary: true, pointing: true }} panes={panes} /> */}
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={details.length === 0 ? 16 : 10}>
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
                            {order.status === 1 ? (
                              <Table.Cell>
                                <Button
                                  color="green"
                                  icon="check"
                                  content="Accept"
                                  size="small"
                                  onClick={() => this.approveOrder(order.id)}
                                />
                                <Button
                                  color="red"
                                  icon="times"
                                  content="Cancel"
                                  size="small"
                                  onClick={() => this.deniedOrder(order.id)}
                                />
                              </Table.Cell>
                            ) : (
                              <Table.Cell />
                            )}
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
                {this.state.orderSelected.length !== 0 ? (
                  <Grid.Column width={6}>
                    <Segment>
                      <Grid container>
                        <Grid.Row textAlign="right">
                          <Header as="h5">
                            Created at: {new Date(orderSelected.createdTime).toLocaleString()}
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
                            Total: ${orderSelected.total}
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
                                ${product.price * product.quantity}
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

export default OrderMange;
