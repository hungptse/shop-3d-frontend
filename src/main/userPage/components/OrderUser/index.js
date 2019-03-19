import React, { Component } from 'react';
import { Grid, Table, Icon, Menu } from "semantic-ui-react";

class OrderUser extends Component {
    render() {
        return (
            <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Table padded="very" selectable basic>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>ID-Feedback</Table.HeaderCell>
                  <Table.HeaderCell>Posted Time</Table.HeaderCell>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Rate</Table.HeaderCell>
                  <Table.HeaderCell>Comment</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
              
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
        );
    }
}

export default OrderUser;