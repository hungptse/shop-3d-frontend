import React, { Component } from "react";
import {
  Form,
  Grid,
  Container,
  Input,
  Header,
  Dropdown,
  Label
} from "semantic-ui-react";
import { get, post } from "../../../../utils/ApiCaller";
import { ADMIN_LIST_CATE_NAME, ADMIN_ADD_PRODUCT } from "../../../../utils/ApiEndpoint";
import _ from "lodash";
import ImageUploader from "react-images-upload";
import FirebaseUitls from "../../../../utils/FirebaseUitls";
class ProductManage extends Component {
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
      // console.log(this.state.picture);
      // console.log(this.state.product);
      FirebaseUitls.uploadImages(this.state.picture);
      var product = this.state.product;
      post(ADMIN_ADD_PRODUCT(),{
          name : product.name,
          model : product.model,
          cate : product.cate,
          description : product.description,
          height : product.height,
          weight : product.weight,
          price : product.price,
          quantity : product.quantity,
          imgThumb : this.state.picture.name
      },{},{}).then(res => {
        window.location.reload();
      });
  };

  render() {
    const { cates } = this.state;
    return (
      <Grid container>
        <Grid.Row>
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
                      product: { ...this.state.product, name: e.target.value }
                    })
                  }
                />
                <Form.Input
                  fluid
                  label="Model"
                  onChange={e =>
                    this.setState({
                      product: { ...this.state.product, model: e.target.value }
                    })
                  }
                />
                {/* <Form.Select
                  fluid
                  label="Category"
                  options={cates}
                  placeholder="Catelogy"
                /> */}
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
                    placeholder="Choose an option"
                    selection
                    value={this.state.product.cate}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Price</label>
                  <Input
                    label={{ basic: true, content: "$" }}
                    labelPosition="right"
                    placeholder="Enter price..."
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
                <Form.Field>
                  <label>Quantity</label>
                  <Input
                    label={{ basic: true, content: "items" }}
                    labelPosition="right"
                    placeholder="Enter quantity..."
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
                <Form.Field>
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
                <Form.Field>
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
              <Form.Button fluid basic>
                Add Product
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ProductManage;
