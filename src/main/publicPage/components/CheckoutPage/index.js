import React, { Component } from "react";
import {
  Container,
  Grid} from "semantic-ui-react";
import OrderSummary from "./OrderSummary";
class CheckoutPage extends Component {
  render() {
   
    return (
      <Container style={{ marginTop: "2em" }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>ACC</Grid.Column>
            <Grid.Column width={8}>
              <OrderSummary />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default CheckoutPage;
