import React, { Component } from "react";
import { Container, Card, Grid, Header, Breadcrumb } from "semantic-ui-react";
import Product from "../UI/Product";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getListProductFromAPI } from "./ProductPage.action";

const PRODUCT_PAGE_STORE = "PRODUCT_PAGE_STORE";

const loadListProductFromReducer = state =>
  state[PRODUCT_PAGE_STORE].listProduct;

const startSelector = createSelector(
  loadListProductFromReducer,
  listProduct => ({ listProduct: listProduct || [] })
);

class ProductPage extends Component {
  componentDidMount() {
    this.props.getListProductFromAPI && this.props.getListProductFromAPI();
  }

  render() {
    return (
      <div>
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
                <Grid columns={3}>
                  {this.props.listProduct.map((product, key) => {
                    return (
                      <Grid.Column key={key}>
                        <Product info={product} />{" "}
                      </Grid.Column>
                    );
                  })}
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default connect(
  startSelector,
  { getListProductFromAPI }
)(ProductPage);
