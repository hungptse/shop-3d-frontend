import React, { Component } from "react";
import {
  Form,
  Grid,
  Input,
  Header,
  Dropdown,
  Modal,
  Button
} from "semantic-ui-react";
import { get, post } from "../../../../utils/ApiCaller";
import {
  ADMIN_LIST_CATE_NAME,
  PRODUCT_ENDPOINT
} from "../../../../utils/ApiEndpoint";
import _ from "lodash";
import ImageUploader from "react-images-upload";
import FirebaseUitls from "../../../../utils/FirebaseUitls";
class AddProduct extends Component {
  state = {
    cates: [],
    product: {
      name: "",
      model: "",
      cate: null,
      price: null,
      quantity: null,
      height: null,
      weight: null,
      description: ""
    },
    picture: null
  };

  async componentDidMount() {
    this.onDrop = this.onDrop.bind(this);
    await get(ADMIN_LIST_CATE_NAME(), {}, {}).then(res => {
      var afterReduce = [];
      var cates = res.data;
      _.reduce(
        cates,
        (obj, cate) => {
          obj = {
            key: cate.id,
            text: cate.name,
            value: cate.id
          };
          afterReduce.push(obj);
        },
        {}
      );
      this.setState({ cates: afterReduce });
    });
  }
  onDrop(picture) {
    this.setState({ picture: picture });
  }

  handleSumbit = () => {
    console.log(this.state.picture);
    // console.log(this.state.product);
    FirebaseUitls.uploadImages(this.state.picture);
    var product = this.state.product;
    post(
      PRODUCT_ENDPOINT(),
      {
        name: product.name,
        model: product.model,
        cate: product.cate,
        description: product.description,
        height: product.height,
        weight: product.weight,
        price: product.price,
        quantity: product.quantity,
        imgThumb: this.state.picture.name
      },
      {},
      {}
    ).then(() => {
      window.location.reload();
    });
  };

  close = () => {
    this.setState({ open: false });
  };
  openModal = () => {
    this.setState({ open: true });
  };

  render() {
    const { cates, open } = this.state;
    return (
      <div>
        <Button basic onClick={this.openModal} icon="add" content="Add New" />
        <Modal
          centered={false}
          dimmer="inverted"
          open={open}
          closeOnDimmerClick={false}
        >
          <Modal.Header>Insert Product</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={8}>
                    <Header>Images Thubnail</Header>
                    <ImageUploader
                      withIcon={true}
                      buttonText="Choose images"
                      onChange={this.onDrop}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={1048576}
                      withPreview
                      singleImage
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Header>Product Detail</Header>
                    <Form onSubmit={this.handleSumbit}>
                      <Form.Group widths="equal">
                        <Form.Input
                          fluid
                          label="Name"
                          onChange={e =>
                            this.setState({
                              product: {
                                ...this.state.product,
                                name: e.target.value
                              }
                            })
                          }
                        />
                        <Form.Input
                          fluid
                          label="Model"
                          onChange={e =>
                            this.setState({
                              product: {
                                ...this.state.product,
                                model: e.target.value
                              }
                            })
                          }
                        />
                        <Form.Field>
                          <label>Category</label>
                          <Dropdown
                            fluid
                            onChange={(e, { value }) =>
                              this.setState({
                                product: { ...this.state.product, cate: value }
                              })
                            }
                            options={cates}
                            placeholder="Category"
                            selection
                            value={this.state.product.cate}
                          />
                        </Form.Field>
                      </Form.Group>
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
                          />
                        </Form.Field>
                      </Form.Group>
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
                          />
                        </Form.Field>
                      </Form.Group>
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
                      />
                      <Form.Group>
                        <Form.Button width={10} fluid basic color='green'>
                          Insert Product
                        </Form.Button>
                        <Form.Button width={6} fluid basic onClick={this.close} color='red'>
                          Cancel
                        </Form.Button>
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default AddProduct;
