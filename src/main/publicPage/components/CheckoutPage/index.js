import React, { Component } from "react";
import {
  Container,
  Grid,
  Card,
  Form,
  Input,
  Dropdown,
  Button,
  Label,
  FormField
} from "semantic-ui-react";
import OrderSummary from "./OrderSummary";
class CheckoutPage extends Component {
  render() {
    return (
      <Container style={{ marginTop: "2em"}}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
              <Card fluid centered>
                <Card.Content
                  content="Customer Detail"
                  textAlign="center"
                  style={{ fontSize: "2em", fontWeight: 300 }}
                />
                <Form
                  onSubmit={this.handleSumbit}
                  style={{ paddingLeft: "1em", paddingRight: "1em" }}
                >
                  <Form.Group inline widths="equal">
                    <Form.Input fluid label="Fullname" />
                  </Form.Group>

                  <Form.Group widths="equal" inline>
                    <Form.Input fluid label="Email" />
                    <Form.Input fluid label="Phone" />
                  </Form.Group>
                  <Form.Input fluid label="Address" />
                  <Form.TextArea
                    label="Note"
                    placeholder="Note for this order..."
                    rows={5}
                    autoHeight
                  />
                  <Form.Checkbox label='I agree to the Terms and Conditions' />
                  <Form.Group>
                    <Form.Button width={4} fluid color="instagram" className="btn-checkout">
                      Checkout
                    </Form.Button>
                  </Form.Group>
                </Form>
              </Card>
            </Grid.Column>
            <Grid.Column width={7}>
              <OrderSummary />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default CheckoutPage;
