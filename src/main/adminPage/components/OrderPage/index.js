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
  Tab,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { get, put } from "../../../../utils/ApiCaller";
import { ORDER_LIST, ORDER_CHANGE_STATUS } from "../../../../utils/ApiEndpoint";
import TimeAgo from "timeago-react";
import { Redirect } from "react-router-dom";
import {
  notification,
  Pagination,
  Drawer,
  Popover,
  Steps,
  Icon as IconAntd
} from "antd";

const ITEM_ON_PAGE = 5;

class OrderMange extends Component {
  state = {
    details: [],
    user: {},
    orderSelected: {},
    orders: [],
    page: [],
    visible: false,
    pageDetail: [],
    loading : true
  };

  async componentDidMount() {
    await get(ORDER_LIST(), {}, {}).then(res => {
      this.setState({ orders: res.data });
      this.setState({ page: this.state.orders.slice(0, ITEM_ON_PAGE) });
      setTimeout(() => {
        this.setState({ loading : false});
      }, 500);
    });
  }

  changeStatusOrder = async (id, status) => {
    return await put(ORDER_CHANGE_STATUS(id, status), {}, {}, {});
  };
  changeStatusOrderView = (id, status) => {
    this.setState({
      page: this.state.page.map(order =>
        order.id === id ? { ...order, status: status } : order
      )
    });
    this.setState({
      orderSelected: { ...this.state.orderSelected, status: status }
    });
    this.setState({
      orders: this.state.orders.map(order =>
        order.id === id ? { ...order, status: status } : order
      )
    });
  };
  viewDetailOrder = id => {
    this.state.orders.map(order => {
      if (order.id === id) {
        this.setState({ details: order.orderDetail });
        this.setState({ user: order.user });
        this.setState({ orderSelected: order });
        this.setState({
          pageDetail: order.orderDetail.slice(0, ITEM_ON_PAGE)
        });
        this.setState({ visible: true });
      }
    });
  };

  approveOrder = id => {
    this.changeStatusOrder(id, 2).then(res => {
      notification.success({
        message: "Approved Order #" + id,
        placement: "topRight"
      });
      this.changeStatusOrderView(id, 2);
    });
  };

  deniedOrder = async id => {
    this.changeStatusOrder(id, 3).then(res => {
      notification.error({
        message: "Denied Order #" + id,
        placement: "topRight"
      });
      this.changeStatusOrderView(id, 3);
    });
  };
  shippingOrder = async id => {
    this.changeStatusOrder(id, 4).then(res => {
      notification.success({
        message: "Shipping Order #" + id,
        placement: "topRight"
      });
      this.changeStatusOrderView(id, 4);
    });
  };

  completeOrder = async id => {
    this.changeStatusOrder(id, 5).then(res => {
      notification.success({
        message: "Order Completed #" + id,
        placement: "topRight"
      });
      this.changeStatusOrderView(id, 5);
    });
  };
  shippingFailOrder = async id => {
    this.changeStatusOrder(id, 6).then(res => {
      notification.error({
        message: "Shipping Failed Order #" + id,
        placement: "topRight"
      });
      this.changeStatusOrderView(id, 6);
    });
  };

  changePage = pageNumber => {
    var indexMax = pageNumber * ITEM_ON_PAGE;
    this.setState({
      page: this.state.orders.slice(indexMax - ITEM_ON_PAGE, indexMax)
    });
  };
  changePageDetail = pageNumber => {
    var indexMax = pageNumber * ITEM_ON_PAGE;
    this.setState({
      pageDetail: this.state.details.slice(indexMax - ITEM_ON_PAGE, indexMax)
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

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  renderStepOder = status => {
    switch (status) {
      case 1:
        return (
          <Steps>
            <Steps.Step
              status="process"
              title="Pending"
              icon={<IconAntd type="sync" spin />}
              description="Store waiting confirm this order"
            />
            <Steps.Step
              title="Approved"
              description="Store accepted this order"
            />
            <Steps.Step title="Shipping" description="Store shipping for you" />
            <Steps.Step
              title="Successful"
              description="Thank you. Your order completed!"
            />
          </Steps>
        );
        break;
      case 2:
        return (
          <Steps>
            <Steps.Step
              status="process"
              title="Pending"
              icon={<Icon name="shopping cart" />}
              description="Store waiting confirm this order"
            />
            <Steps.Step
              status="finish"
              title="Approved"
              icon={<Icon name="check" />}
              description="Store accepted this order"
            />
            <Steps.Step title="Shipping" description="Store shipping for you" />
            <Steps.Step
              title="Successful"
              description="Thank you. Your order completed!"
            />
          </Steps>
        );
        break;
      case 3:
        return (
          <Steps>
            <Steps.Step
              status="process"
              title="Pending"
              icon={<Icon name="shopping cart" />}
              description="Store waiting confirm this order"
            />
            <Steps.Step
              status="error"
              title="Cancelled"
              description="Store cancelled this order"
            />
            <Steps.Step title="Shipping" description="Store shipping for you" />
            <Steps.Step
              title="Successful"
              description="Thank you. Your order completed!"
            />
          </Steps>
        );
        break;
      case 4:
        return (
          <Steps>
            <Steps.Step
              status="process"
              title="Pending"
              icon={<Icon name="shopping cart" />}
              description="Store waiting confirm this order"
            />
            <Steps.Step
              status="process"
              icon={<Icon name="check" />}
              title="Approved"
              description="Store accepted this order"
            />
            <Steps.Step
              title="Shipping"
              status="process"
              icon={<IconAntd type="sync" spin />}
              description="Store shipping for you"
            />
            <Steps.Step
              title="Successful"
              description="Thank you. Your order completed!"
            />
          </Steps>
        );
        break;
      case 5:
        return (
          <Steps>
            <Steps.Step
              status="process"
              title="Pending"
              icon={<Icon name="shopping cart" />}
              description="Store waiting confirm this order"
            />
            <Steps.Step
              status="process"
              icon={<Icon name="check" />}
              title="Approved"
              description="Store accepted this order"
            />
            <Steps.Step
              title="Shipping"
              status="process"
              icon={<Icon name="shipping" />}
              description="Store shipping for you"
            />
            <Steps.Step
              status="finish"
              icon={<IconAntd type="smile" />}
              title="Successful"
              description="Thank you. Your order completed!"
            />
          </Steps>
        );
        break;
      case 6:
        return (
          <Steps>
            <Steps.Step
              status="process"
              title="Pending"
              icon={<Icon name="shopping cart" />}
              description="Store waiting confirm this order"
            />
            <Steps.Step
              status="process"
              icon={<Icon name="check" />}
              title="Approved"
              description="Store accepted this order"
            />
            <Steps.Step
              status="error"
              title="Failed Shipping"
              icon={<Icon name="x" />}
              description="Sorry! We can't ship order for you. Please re-order in store"
            />
            <Steps.Step
              title="Successful"
              description="Thank you. Your order completed!"
            />
          </Steps>
        );
        break;
    }
  };


  render() {
    const {
      details,
      user,
      orderSelected,
      orders,
      page,
      visible,
      pageDetail,
      loading
    } = this.state;

    const renderBtn = (id, status) => {
      switch (status) {
        case 1:
          return (
            <Grid.Column>
              <Button
                color="red"
                icon="times"
                basic
                content="Cancel"
                size="small"
                floated="right"
                onClick={() => this.deniedOrder(id)}
              />
              <Button
                color="green"
                icon="check"
                basic
                content="Accept"
                size="small"
                floated="right"
                onClick={() => this.approveOrder(id)}
              />
            </Grid.Column>
          );
          break;
        case 2:
          return (
            <Grid.Column>
              <Button
                color="blue"
                icon="shipping"
                content="Shipping"
                size="small"
                floated="right"
                basic
                onClick={() => this.shippingOrder(id)}
              />
            </Grid.Column>
          );
          break;
        case 4:
          return (
            <Grid.Column>
              <Button
                color="blue"
                icon="inbox"
                content="Completed"
                size="small"
                basic
                floated="right"
                onClick={() => this.completeOrder(id)}
              />
              <Button
                color="olive"
                icon="user x"
                content="Ship Failed"
                size="small"
                basic
                floated="right"
                onClick={() => this.shippingFailOrder(id)}
              />
            </Grid.Column>
          );
          break;
      }
    };

    return (
      <Grid>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={visible}
        >
          {Object.keys(this.state.orderSelected).length !== 0 ? (
            <Grid.Column width={6}>
              <Segment>
                <Grid container>
                  <Grid.Row textAlign="right">
                    <Header as="h5">
                      Created at:{" "}
                      {new Date(orderSelected.createdTime).toLocaleString()}
                    </Header>
                  </Grid.Row>
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
                    <Grid.Column>
                      Note:{" "}
                      {orderSelected.note === "" ? "None" : orderSelected.note}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={1} centered>
                    <Grid.Column>
                      <Popover
                        content={this.renderStepOder(orderSelected.status)}
                        title="Order Tracking"
                        placement="right"
                      >
                        Status: {this.renderStatus(orderSelected.status)}
                      </Popover>
                      <Button size="small" secondary floated="right">
                        Total: ${orderSelected.total}
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={1} centered>
                    {renderBtn(orderSelected.id, orderSelected.status)}
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
                  {pageDetail.map(product => {
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
              <Grid>
                <Grid.Column width={16} textAlign="right">
                  <Pagination
                    defaultCurrent={1}
                    pageSize={ITEM_ON_PAGE}
                    onChange={page => this.changePageDetail(page)}
                    total={details.length}
                  />
                </Grid.Column>
                <Grid.Column floated="right" width={5} />
              </Grid>
            </Grid.Column>
          ) : (
            <div />
          )}
        </Drawer>
        <Grid.Row columns={1}>
        <Dimmer active={loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
          <Grid.Column width={16}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={16}>
                  <Table padded="very" selectable>
                    <Table.Header fullWidth>
                      <Table.Row>
                        <Table.HeaderCell>Order-ID</Table.HeaderCell>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Created Time</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {page.map(order => {
                        return (
                          <Table.Row
                            key={order.id}
                            as="tr"
                            onClick={() => this.viewDetailOrder(order.id)}
                          >
                            <Table.Cell>#{order.id}</Table.Cell>
                            <Table.Cell>{order.userId}</Table.Cell>
                            <Table.Cell>
                              <Popover
                                content={new Date(
                                  order.createdTime
                                ).toLocaleString()}
                                title="Ordered at"
                              >
                                <TimeAgo
                                  datetime={order.createdTime}
                                  locale="en"
                                />
                              </Popover>
                            </Table.Cell>
                            <Table.Cell>${order.total}</Table.Cell>
                            <Table.Cell>
                              <Popover
                                content={this.renderStepOder(
                                  order.status
                                )}
                                title="Order Tracking"
                                placement="top"
                              >
                                {this.renderStatus(order.status)}
                              </Popover>
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
                        total={orders.length}
                      />
                    </Grid.Column>
                    <Grid.Column floated="right" width={5} />
                  </Grid>
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
