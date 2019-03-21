import React, { Component } from "react";
import { Container, Card, Grid, Header, Breadcrumb } from "semantic-ui-react";
import Product from "../UI/Product";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getListProductFromAPI } from "./ProductPage.action";
import { Pagination } from "antd";
const PRODUCT_PAGE_STORE = "PRODUCT_PAGE_STORE";

const loadListProductFromReducer = state =>
  state[PRODUCT_PAGE_STORE].listProduct;

const startSelector = createSelector(
  loadListProductFromReducer,
  listProduct => ({ listProduct: listProduct || [] })
);
const ITEM_ON_PAGE = 6;

class ProductPage extends Component {
  state = { page: [] };
  componentDidMount() {
    if (this.props.listProduct.length === 0) {
      this.props.getListProductFromAPI && this.props.getListProductFromAPI();
      console.log(this.props);
    
    setTimeout(() => {
      
      this.setState({ page: this.props.listProduct.slice(0, ITEM_ON_PAGE) });
    }, 200);}
  }
  
  changePage = pageNumber => {
    var indexMax = pageNumber * ITEM_ON_PAGE;
    this.setState({
      page: this.props.listProduct.slice(indexMax - ITEM_ON_PAGE, indexMax)
    });
  };
  render() {
    const { listProduct } = this.props;
    const { page } = this.state;

    return (
      <Container>
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
                {page.map((product, key) => {
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
        <Grid>
          <Grid.Column floated="left" width={10} />
          <Grid.Column width={6} textAlign="right">
            <Pagination
              defaultCurrent={1}
              pageSize={ITEM_ON_PAGE}
              onChange={page => this.changePage(page)}
              total={listProduct.length}
            />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default connect(
  startSelector,
  { getListProductFromAPI }
)(ProductPage);
