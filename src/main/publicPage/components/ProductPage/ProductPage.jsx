import React, { Component } from "react";
import {
  Container,
  Card,
  Grid,
  Header,
  Breadcrumb,
  Segment,
  Image,
  Placeholder,
  Button
} from "semantic-ui-react";
import Product from "../UI/Product";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getListProductFromAPI } from "./ProductPage.action";
import _ from "lodash";
const PRODUCT_PAGE_STORE = "PRODUCT_PAGE_STORE";

const loadListProductFromReducer = state =>
  state[PRODUCT_PAGE_STORE].listProduct;

const startSelector = createSelector(
  loadListProductFromReducer,
  listProduct => ({ listProduct: listProduct || [] })
);

class ProductPage extends Component {
  componentDidMount() {
    if (this.props.listProduct.length == 0) {
      this.props.getListProductFromAPI && this.props.getListProductFromAPI();
    }
  }

  renderLoading() {
    if (this.props.listProduct.length == 0) {
      return (
        <Card.Group doubling itemsPerRow={3} stackable>
          {_.range(0, 9).map(value => {
            return (
              <Card key={value}>
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length="very short" />
                      <Placeholder.Line length="medium" />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length="short" />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Card.Content>
                <Card.Content extra>
                  <Button color="blue" fluid disabled>
                    Add to cart
                  </Button>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      );

      // return (
      //   <Card.Group doubling itemsPerRow={3} stackable>
      //     <Card>
      //       <Placeholder>
      //         <Placeholder.Image square />
      //       </Placeholder>
      //       <Card.Content>
      //         <Placeholder>
      //           <Placeholder.Header>
      //             <Placeholder.Line length="very short" />
      //             <Placeholder.Line length="medium" />
      //           </Placeholder.Header>
      //           <Placeholder.Paragraph>
      //             <Placeholder.Line length="short" />
      //           </Placeholder.Paragraph>
      //         </Placeholder>
      //       </Card.Content>
      //       <Card.Content extra>
      //         <Button animated color="blue" fluid disable>
      //           Add to cart
      //         </Button>
      //       </Card.Content>
      //     </Card>
      //   </Card.Group>
      // );
    }
  }

  render() {
    return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>Product</Breadcrumb.Section>
        </Breadcrumb>
        <Header as="h1">Product</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={12}>
              {this.renderLoading()}
              <Grid columns={3}>
                {this.props.listProduct.map((product, key) => {
                  return (
                    <Grid.Column key={key}>
                      <Product
                        info={product}
                        match={this.props.match}
                        history={this.props.history}
                        location={this.props.location}
                      />
                    </Grid.Column>
                  );
                })}
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default connect(
  startSelector,
  { getListProductFromAPI }
)(ProductPage);
