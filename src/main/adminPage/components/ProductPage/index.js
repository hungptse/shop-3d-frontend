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
  Icon,
  Pagination,
  Menu
} from "semantic-ui-react";
import { get, post } from "../../../../utils/ApiCaller";
import { PRODUCT_ENDPOINT } from "../../../../utils/ApiEndpoint";
import _ from "lodash";
import AddProduct from "./AddProduct.jsx";
class ProductManage extends Component {
  state = { products: [] };
  componentDidMount() {
    get(PRODUCT_ENDPOINT(), {}, {}).then(res => {
      console.log(res);
      this.setState({ products: res.data });
    });
  }

  render() {
    const { products } = this.state;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column width={13}>
            <AddProduct />
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
                {products.map(product => {
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

export default ProductManage;
