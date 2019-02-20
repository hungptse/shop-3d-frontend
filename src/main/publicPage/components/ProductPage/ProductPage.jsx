import React, { Component } from "react";
import {
  Container,
  Card,
  Grid,
  Header,
  Breadcrumb,
} from "semantic-ui-react";
import Product from "../UI/Product";
class ProductPage extends Component {
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
                  <Grid.Column>
                      <Product name='My Name is Hung'/>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ProductPage;
