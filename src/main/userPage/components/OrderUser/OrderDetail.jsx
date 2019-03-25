import React, { Component } from "react";
import { get } from "../../../../utils/ApiCaller";
import { ORDER_DETAIL_BY_ID } from "../../../../utils/ApiEndpoint";
import {
  Table,
  Button,
  Header,
  Grid,
  Icon,
  Label,
  Segment
} from "semantic-ui-react";
import { Steps, Pagination, Icon as IconAntd } from "antd";
const ITEM_ON_PAGE = 3;

class OrderDetail extends Component {
  state = { order: {}, orderDetail: [], page: [] };
  async componentDidMount() {
    await get(ORDER_DETAIL_BY_ID(this.props.match.params.id)).then(res => {
      this.setState({ order: res.data });
    });
    if (this.state.order.orderDetail.length === 0) {
      this.props.history.push("/user/orders");
    }
    this.setState({ orderDetail: this.state.order.orderDetail });
    this.setState({ page: this.state.orderDetail.slice(0, ITEM_ON_PAGE) });
  }
  renderStatus = status => {
    // eslint-disable-next-line
    switch (status) {
      case 1:
        return (
          <Label as="a" basic color="grey">
            Pending
          </Label>
        );
      case 2:
        return (
          <Label as="a" basic color="blue">
            Approved
          </Label>
        );
      case 3:
        return (
          <Label as="a" basic color="red">
            Cancelled
          </Label>
        );
      case 4:
        return (
          <Label as="a" basic color="blue">
            Shipping
          </Label>
        );
      case 5:
        return (
          <Label as="a" basic color="green">
            Successful
          </Label>
        );
      case 6:
        return (
          <Label as="a" basic color="red">
            Failed Shipping
          </Label>
        );
    }
  };

  renderStepOder = status => {
    // eslint-disable-next-line
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
    }
  };

  changePage = pageNumber => {
    var indexMax = pageNumber * ITEM_ON_PAGE;
    this.setState({
      page: this.state.orderDetail.slice(indexMax - ITEM_ON_PAGE, indexMax)
    });
  };
  render() {
    const { order, orderDetail, page } = this.state;

    return (
      <div>
        <Grid>
          <Grid.Row centered>
            <Header as="h3">
              Order Detail #{order.id} - {this.renderStatus(order.status)}
            </Header>
          </Grid.Row>
        </Grid>
        <Segment>
        {this.renderStepOder(order.status)}</Segment>
        <Table.Row>
          <Table.HeaderCell>
            <Header as="h5">
              Created at: {new Date(order.createdTime).toLocaleString()}
            </Header>
          </Table.HeaderCell>
        </Table.Row>
        <Table padded="very" selectable>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell singleLine>Quanitty</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Subtotal</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {page.map(product => {
              return (
                <Table.Row key={product.id}>
                  <Table.Cell>{product.pro.name}</Table.Cell>
                  <Table.Cell>{product.quantity}</Table.Cell>
                  <Table.Cell>${product.price}</Table.Cell>
                  <Table.Cell>
                    <Button size="mini" secondary>
                      ${product.price * product.quantity}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
            <Table.Row>
              <Table.Cell />
              <Table.Cell>
                <b>Note:</b> {order.note === "" ? "None" : order.note}
              </Table.Cell>
              <Table.Cell>
                <b>Total:</b>
              </Table.Cell>
              <Table.Cell>
                <Button size="mini" basic primary>
                  ${order.total}
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Grid>
          <Grid.Column floated="left" width={5} />
          <Grid.Column width={6} textAlign="center">
            <Pagination
              defaultCurrent={1}
              pageSize={ITEM_ON_PAGE}
              onChange={page => this.changePage(page)}
              total={orderDetail.length}
            />
          </Grid.Column>
          <Grid.Column floated="right" width={5} />
        </Grid>
        <Button
          icon
          labelPosition="left"
          size="small"
          onClick={() => this.props.history.push("/user/orders")}
        >
          <Icon name="reply" />
          Back
        </Button>
      </div>
    );
  }
}

export default OrderDetail;
