import React, { Component } from "react";
import logo from "../../../../assets/images/logo.png";
import Footer from "../UI/Footer.jsx";
import {
  Container,
  Divider,
  Card,
  Grid,
  Header,
  Image,
  Item,
  Menu,
  Icon,
  Breadcrumb
} from "semantic-ui-react";

import HeaderPage from "../UI/Header";

class ProductPage extends Component {
  render() {
    return (
      <div>
        <HeaderPage />

        <Container style={{ marginTop: "7em", height: "1000px" }}>
          <Breadcrumb>
            <Breadcrumb.Section link>Home</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Product</Breadcrumb.Section>
          </Breadcrumb>
          <Header as="h1">Product</Header>

          <Grid>
            <Grid.Row>
              <Grid.Column width={3}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>Fillter</Card.Header>
                    <Card.Description>
                      Matthew is a musician living in Nashville.
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={13}>
                
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default ProductPage;
