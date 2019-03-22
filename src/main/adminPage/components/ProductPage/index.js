import React, { Component } from "react";
import {
  Grid,
  Button,
  Table,
  Icon,
  Menu,
  Form,
  Dropdown,
  Input,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { get } from "../../../../utils/ApiCaller";
import {
  PRODUCT_ENDPOINT,
  GET_PRODUCT_BY_ID,
  PUBLIC_LIST_CATE,
  ADMIN_LIST_CATE_NAME
} from "../../../../utils/ApiEndpoint";
import AddProduct from "./AddProduct.jsx";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import {
  getListProductFromAPI,
  setListProductsToReducer
} from "../../../publicPage/components/ProductPage/ProductPage.action";
import { Drawer, Row, Col, Divider } from "antd";
import _ from "lodash";

const PRODUCT_PAGE_STORE = "PRODUCT_PAGE_STORE";
const loadListProductFromReducer = state =>
  state[PRODUCT_PAGE_STORE].listProduct;
const startSelector = createSelector(
  loadListProductFromReducer,
  listProduct => ({ listProduct: listProduct || [] })
);

const pStyle = {
  fontSize: 18,
  color: "rgba(0,0,0,0.85)",
  lineHeight: "24px",
  display: "block",
  marginBottom: 16
};
class ProductManage extends Component {
  state = { visible: false, product: {}, loading : false, cates : [] };

  async componentDidMount() {
    if (this.props.listProduct.length === 0) {
      this.props.getListProductFromAPI && this.props.getListProductFromAPI();
    }
    await get(ADMIN_LIST_CATE_NAME(), {}, {}).then(res => {
      console.log(res.data);
      var afterReduce = [];
      _.reduce(res.data,(obj,cate) => {
        obj = {
          key: cate.id,
          value: cate.id,
          text: cate.name
        };
        afterReduce.push(obj);
      },{})
      this.setState({ cates : afterReduce });
    });

    console.log(this.state.cates);
    
  }
  showDrawer = async id => {
    this.setState({
      loading: true
    });
    await get(GET_PRODUCT_BY_ID(id), {}, {}).then(res => {
      this.setState({ product: res.data });
    });
    console.log(this.state.product);
    
    this.setState({
      visible: true
    });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  addProduct = () => {
    // SignalrClient.sendAddProduct(data => {
    //   console.log(data);

    //   // this.props.setListProductsToReducer &&
    //   //   this.props.setListProductsToReducer(data);
    // });
  };

  render() {
    const { listProduct } = this.props;
    const { product, loading, cates } = this.state;

    return (
      <div>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Dimmer active={loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
          <p style={{ ...pStyle, marginBottom: 24 }}>Product Detail</p>
          <Divider />
          <p style={pStyle}>General</p>
          <Form onSubmit={this.handleSumbit}>
            <Form.Group widths="equal">
              <Form.Field width={6}>
                <label>Name</label>
                <Input
                  fluid
                  onChange={e =>
                    this.setState({
                      product: {
                        ...this.state.product,
                        name: e.target.value
                      }
                    })
                  }
                  value={product.name}
                  required
                />
              </Form.Field>
              <Form.Field width={6}>
                <label>Model</label>
                <Input
                  fluid
                  onChange={e =>
                    this.setState({
                      product: {
                        ...this.state.product,
                        model: e.target.value
                      }
                    })
                  }
                  value={product.model}
                  required
                />
              </Form.Field>
              <Form.Field width={6}>
                <label>Category</label>
                <Dropdown
                  fluid
                  onChange={(e, { value }) =>
                    this.setState({
                      product: { ...this.state.product, cateId: value }
                    })
                  }
                  options={cates}
                  placeholder="Category"
                  selection
                  value={product.cateId}
                />
              </Form.Field>
            </Form.Group>
            <Row>
              <Col span={24}>
                <Form.Group widths="equal">
                  <Form.Field width={6}>
                    <label>Price</label>
                    <Input
                      label={{ basic: true, content: "$" }}
                      labelPosition="right"
                      placeholder="Price..."
                      type="number"
                      onChange={e =>
                        this.setState({
                          product: {
                            ...this.state.product,
                            price: e.target.value
                          }
                        })
                      }
                      value={product.price}
                      required
                    />
                  </Form.Field>
                  <Form.Field width={6}>
                    <label>Quantity</label>
                    <Input
                      label={{ basic: true, content: "items" }}
                      labelPosition="right"
                      placeholder="Quantity..."
                      type="number"
                      onChange={e =>
                        this.setState({
                          product: {
                            ...this.state.product,
                            quantity: e.target.value
                          }
                        })
                      }
                      value={product.quantity}
                      required
                    />
                  </Form.Field>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Group widths="equal">
                  <Form.Field width={6}>
                    <label>Weight</label>
                    <Input
                      label={{ basic: true, content: "kg" }}
                      labelPosition="right"
                      placeholder="Enter weight..."
                      type="number"
                      onChange={e =>
                        this.setState({
                          product: {
                            ...this.state.product,
                            weight: e.target.value
                          }
                        })
                      }
                      value={product.weight}
                      required
                    />
                  </Form.Field>
                  <Form.Field width={6}>
                    <label>Height</label>
                    <Input
                      label={{ basic: true, content: "cm" }}
                      labelPosition="right"
                      placeholder="Enter height..."
                      type="number"
                      onChange={e =>
                        this.setState({
                          product: {
                            ...this.state.product,
                            height: e.target.value
                          }
                        })
                      }
                      value={product.height}
                      required
                    />
                  </Form.Field>
                </Form.Group>
              </Col>
            </Row>
            <Divider />
            <p style={pStyle}>Additional Information</p>
            <Row>
              <Col span={24}>
                <Form.TextArea
                  label="Description"
                  placeholder="Tell more about product..."
                  rows={5}
                  autoHeight
                  onChange={e =>
                    this.setState({
                      product: {
                        ...this.state.product,
                        description: e.target.value
                      }
                    })
                  }
                  value={product.description}
                  required
                />
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={24}>
                <Form.Group>
                  <Form.Button width={12} fluid secondary>
                    Update Product
                  </Form.Button>
                  <Form.Button
                    width={12}
                    fluid
                    onClick={this.onClose}
                    color="red"
                  >
                    Cancel
                  </Form.Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Drawer>
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
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {listProduct.map(product => {
                    return (
                      <Table.Row
                        key={product.id}
                        onClick={() => this.showDrawer(product.id)}
                      >
                        <Table.Cell>{product.thumbnail}</Table.Cell>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>{product.price}</Table.Cell>
                        <Table.Cell>{product.quantity}</Table.Cell>
                        <Table.Cell>{product.cate.name}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>

                {/* <Table.Footer>
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
                </Table.Footer> */}
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  startSelector,
  { getListProductFromAPI, setListProductsToReducer }
)(ProductManage);
