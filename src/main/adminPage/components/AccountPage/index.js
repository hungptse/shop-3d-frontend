import React, { Component } from "react";
import { Grid, Table, Icon, Menu } from "semantic-ui-react";

class AccountMange extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column width={13}>
            {/* <AddProduct /> */}
            <Table padded="very" selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>Username  </Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Phone</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {/* {products.map(product => {
                      return (
                        <Table.Row key={product.id}>
                          <Table.Cell>{product.thumbnail}</Table.Cell>
                          <Table.Cell>{product.name}</Table.Cell>
                          <Table.Cell>{product.price}</Table.Cell>
                          <Table.Cell>{product.quantity}</Table.Cell>
                          <Table.Cell>{product.cate.name}</Table.Cell>
                          <Table.Cell>
                            <Button basic color="teal" icon="edit outline" content="Edit Product" />
                          </Table.Cell>
                        </Table.Row>
                      );
                    })} */}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default AccountMange;
