import React, { Component } from "react";
import {
  Container,
  Grid,
  Card,
  Image,
  Header,
  Label,
  Icon,
  Divider
} from "semantic-ui-react";
import { GET_PRODUCT_BY_ID } from "../../../../utils/ApiEndpoint";
import { get } from "../../../../utils/ApiCaller";
import Quantity from "./Quantity.jsx";
class ProductDetailPage extends Component {
  state = { product: {} };

  async componentWillMount() {
    await get(GET_PRODUCT_BY_ID(2)).then(res => {
      this.setState({ product: res.data });
    });
  }

  render() {
    const { product } = this.state;
    return (
      <Container>
        <Header as="h1">Product Detail</Header>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={10}>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h2">{product.name} </Header>
              <Divider horizontal>
                <Header as="h4">
                  <Icon name="tag" />
                  General Infomation
                </Header>
              </Divider>
              Price   <Label tag color='black'>
                <Icon name="dollar sign"  />
                {product.price}
              </Label>
              Quantity <Quantity maxQuantity={product.quantity}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default ProductDetailPage;
