import React, { Component } from "react";
import { Grid, Table, Icon, Menu } from "semantic-ui-react";
import { get } from "../../../../utils/ApiCaller";
import { ORDER_OF_USER } from "../../../../utils/ApiEndpoint";
import LocalStorageUtils from "../../../../utils/LocalStorage";

class OrderUser extends Component {
  state = { orders: [] };
  async componentDidMount() {
    await get(ORDER_OF_USER(LocalStorageUtils.getSub()), {}, {}).then(res => {
      this.setState({ orders: res.data });
    });
  }
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Table padded="very" selectable basic>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.HeaderCell>Created Time</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body />
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default OrderUser;
