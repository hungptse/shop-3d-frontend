import React, { Component } from "react";
import {
  Form,
  Grid,
  Container,
  Input,
  Header,
  Dropdown,
  Label,
  Modal,
  Image,
  Button,
  Table,
  Icon
} from "semantic-ui-react";
import { get, post } from "../../../../utils/ApiCaller";
import {
  PRODUCT_ENDPOINT,
} from "../../../../utils/ApiEndpoint";
import _ from "lodash";
import AddProduct from "./AddProduct.jsx";
class ProductManage extends Component {
  componentDidMount(){

  }

  render() {
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column width={13}>
            <AddProduct />
            <Table  padded='very'>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Registration Date</Table.HeaderCell>
                  <Table.HeaderCell>E-mail address</Table.HeaderCell>
                  <Table.HeaderCell>Premium Plan</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John Lilki</Table.Cell>
                  <Table.Cell>September 14, 2013</Table.Cell>
                  <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                  <Table.Cell>No</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie Harington</Table.Cell>
                  <Table.Cell>January 11, 2014</Table.Cell>
                  <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                  <Table.Cell>Yes</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jill Lewis</Table.Cell>
                  <Table.Cell>May 11, 2014</Table.Cell>
                  <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                  <Table.Cell>Yes</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ProductManage;
