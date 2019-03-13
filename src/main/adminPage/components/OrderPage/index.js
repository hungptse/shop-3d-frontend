import React, { Component } from "react";
import {
  Grid,
  Table,
  Icon,
  Menu,
  Button,
  Label,
  Segment,
  Header
} from "semantic-ui-react";
import { get } from "../../../../utils/ApiCaller";
import { ORDER_LIST } from "../../../../utils/ApiEndpoint";
class OrderMange extends Component {
  state = { orders: [], details: [], user : {}, orderSelected : [] };
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
    }
  };
  render() {
    const { orders, details, user, orderSelected } = this.state;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column width={13}>
            {/* <AddProduct /> */}
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
                            <Table.Cell>{order.id}</Table.Cell>
                            <Table.Cell>{order.userId}</Table.Cell>
                            <Table.Cell>{order.createdTime}</Table.Cell>
                            <Table.Cell>${order.total}</Table.Cell>
                            <Table.Cell>
                              {this.renderStatus(order.status)}
                            </Table.Cell>
                            <Table.Cell>
                              <Button
                                basic
                                color="green"
                                icon="edit outline"
                                content="Accept"
                                size="small"
                              />
                              <Button
                                basic
                                color="red"
                                icon="edit outline"
                                content="Cancel"
                                size="small"
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
                <Grid.Column width={6}>
                  <Segment>
                    <Grid container>
                      <Grid.Row centered>
                        <Header as="h2">Order Detail #{orderSelected.id}</Header>
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
                        <Grid.Column>Note: {orderSelected.note === "" ? "None" : orderSelected.note}</Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={1} centered>
                        <Grid.Column as="h3">Total: ${orderSelected.total}</Grid.Column>
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
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default OrderMange;
