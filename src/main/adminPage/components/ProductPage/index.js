import React, { Component } from "react";
import { Grid, Button, Table, Icon, Menu } from "semantic-ui-react";
import { get } from "../../../../utils/ApiCaller";
import { PRODUCT_ENDPOINT } from "../../../../utils/ApiEndpoint";
import AddProduct from "./AddProduct.jsx";
import SignalrClient from "../../../../utils/SignalrClient";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import {
  getListProductFromAPI,
  setListProductsToReducer
} from "../../../publicPage/components/ProductPage/ProductPage.action";

const PRODUCT_PAGE_STORE = "PRODUCT_PAGE_STORE";
const loadListProductFromReducer = state =>
  state[PRODUCT_PAGE_STORE].listProduct;
const startSelector = createSelector(
  loadListProductFromReducer,
  listProduct => ({ listProduct: listProduct || [] })
);

class ProductManage extends Component {
  componentDidMount() {
    if (this.props.listProduct.length === 0) {
      this.props.getListProductFromAPI && this.props.getListProductFromAPI();
    }
  }
  
  addProduct = () => {
    SignalrClient.sendAddProduct(data => {
      console.log(data);
      
      // this.props.setListProductsToReducer &&
      //   this.props.setListProductsToReducer(data);
    });
  };

  render() {
    const { listProduct } = this.props;
    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column width={16}>  
            <AddProduct addProduct={this.addProduct} />
            <Table padded="very" selectable>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>Thumbnail</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Category</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {listProduct.map(product => {
                  return (
                    <Table.Row key={product.id}>
                      <Table.Cell>{product.thumbnail}</Table.Cell>
                      <Table.Cell>{product.name}</Table.Cell>
                      <Table.Cell>{product.price}</Table.Cell>
                      <Table.Cell>{product.quantity}</Table.Cell>
                      <Table.Cell>{product.cate.name}</Table.Cell>
                      <Table.Cell>
                        <Button
                          basic
                          color="teal"
                          icon="edit outline"
                          content="Edit Product"
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
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(
  startSelector,
  { getListProductFromAPI, setListProductsToReducer }
)(ProductManage);
