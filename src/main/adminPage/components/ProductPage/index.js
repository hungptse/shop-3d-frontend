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
import { get, post, put } from "../../../../utils/ApiCaller";
import {
  PRODUCT_ENDPOINT,
  PRODUCT_BY_ID,
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
import { Drawer, Row, Col, Divider, notification, Pagination } from "antd";
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
const ITEM_ON_PAGE = 6;

class ProductManage extends Component {
  state = {
    visible: false,
    product: {},
    loading: false,
    cates: [],
    addNew: false,
    page: [],
    loadingPage : true
  };

  async componentDidMount() {
    if (this.props.listProduct.length === 0) {
      this.props.getListProductFromAPI && this.props.getListProductFromAPI();
    }
    setTimeout(() => {
      this.setState({ page: this.props.listProduct.slice(0, ITEM_ON_PAGE), loadingPage : false });
    }, 500);

    await get(ADMIN_LIST_CATE_NAME(), {}, {}).then(res => {
      var afterReduce = [];
      _.reduce(
        res.data,
        (obj, cate) => {
          obj = {
            key: cate.id,
            value: cate.id,
            text: cate.name
          };
          afterReduce.push(obj);
        },
        {}
      );
      this.setState({ cates: afterReduce });
    });
  }

  changePage = pageNumber => {
    var indexMax = pageNumber * ITEM_ON_PAGE;
    this.setState({
      page: this.props.listProduct.slice(indexMax - ITEM_ON_PAGE, indexMax)
    });
  };
  showDrawer = async id => {
    this.setState({
      loading: true
    });
    await get(PRODUCT_BY_ID(id), {}, {}).then(res => {
      this.setState({ product: res.data });
    });

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
      visible: false,
      addNew: false
    });
  };

  handleSumbit = async () => {
    var product = this.state.product;
    this.setState({
      loading: true
    });

    if (!this.state.addNew) {
      await put(
        PRODUCT_BY_ID(product.id),
        {
          name: product.name,
          model: product.model,
          cate: product.cateId,
          description: product.description,
          height: product.height,
          weight: product.weight,
          price: product.price,
          quantity: product.quantity,
          imgThumb: "Demo"
        },
        {},
        {}
      )
        .then(res => {
          this.props.getListProductFromAPI &&
            this.props.getListProductFromAPI();
          this.onClose();
          notification.success({
            message: "Update product successful",
            placement: "topRight"
          });
        })
        .catch(err => {
          notification.error({
            message: "Update product failed",
            placement: "topRight"
          });
        });
    } else {
      await post(
        PRODUCT_ENDPOINT(),
        {
          name: product.name,
          model: product.model,
          cate: product.cateId,
          description: product.description,
          height: product.height,
          weight: product.weight,
          price: product.price,
          quantity: product.quantity,
          imgThumb: "Demo"
        },
        {},
        {}
      )
        .then(res => {
          this.props.getListProductFromAPI &&
            this.props.getListProductFromAPI();
          this.onClose();
          notification.success({
            message: "Insert product successful",
            placement: "topRight"
          });
          this.setState({ addNew: false, product: {} });
        })
        .catch(err => {
          notification.error({
            message: "Insert product failed",
            placement: "topRight"
          });
        });
    }
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  };

  addNewProduct = () => {
    this.setState({ addNew: true, product: {}, visible: true });
  };

  render() {
    const { listProduct } = this.props;
    const { product, loading, cates, addNew, page , loadingPage} = this.state;

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
                  value={addNew ? "" : product.name}
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
                  value={addNew ? "" : product.model}
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
                  value={addNew ? "" : product.cateId}
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
                      value={addNew ? "" : product.price}
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
                      value={addNew ? "" : product.quantity}
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
                      value={addNew ? "" : product.weight}
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
                      value={addNew ? "" : product.height}
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
                  value={addNew ? "" : product.description}
                  required
                />
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={8} offset={8}>
                <Form.Group>
                  {addNew ? (
                    <Form.Button width={16} fluid secondary>
                      Insert Product
                    </Form.Button>
                  ) : (
                    <Form.Button width={16} fluid secondary>
                      Update Product
                    </Form.Button>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Drawer>
        <Grid>
          <Dimmer active={loadingPage} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
          <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <Button
                width={4}
                basic
                icon="add"
                secondary
                content="Add Product"
                onClick={this.addNewProduct}
              />
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
                  {page.map(product => {
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
              </Table>
              <Grid>
                <Grid.Column width={16} textAlign="right">
                  <Pagination
                    defaultCurrent={1}
                    pageSize={ITEM_ON_PAGE}
                    onChange={page => this.changePage(page)}
                    total={listProduct.length}
                  />
                </Grid.Column>
              </Grid>
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
