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
import { get,post } from "../../../../utils/ApiCaller";
import { CHECK_OUT_CART, PROFILE_ACCOUNT } from "../../../../utils/ApiEndpoint";
import CartLocal from "../../../../utils/CartLocal";
import LocalStorageUtils from "../../../../utils/LocalStorage";
import {  checkoutCart, getCartFromLocal } from "../UI/Cart/Cart.action";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import OrderSummary from "./OrderSummary";

import { setProfileToReducer } from "../Login/Auth.action";
import { notification } from "antd";

const startSelector = createSelector(
  getCartFromLocal,
  cart => ({ cart: cart || [] })
);
class CheckoutPage extends Component {
  state = { note: "", info : {} };

  componentDidMount(){
    get(PROFILE_ACCOUNT(LocalStorageUtils.getSub()),{},{}).then(res => {
      console.log(res);
      this.setState({info : res.data});
    })
  }

  handleSumbit = async () => {
    await post(
      CHECK_OUT_CART(),
      {
        userId: LocalStorageUtils.getSub(),
        note: this.state.note,
        total: CartLocal.getTotal(),
        products: CartLocal.getCheckoutCart()
      },
      {},
      {}
    ).then(res => {
      this.setState({ note : ""});
      CartLocal.checkout();
      this.props.checkoutCart && this.props.checkoutCart();
      setTimeout(() => {
        notification.success({
          message: "Checkout Successful ",
          placement: "topRight"
        });
      }, 500);
    });
  };
  render() {
    const {info} = this.state;
    return (
      <Container style={{ height : 790 }}>
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
                    <Form.Input
                      fluid
                      label="Fullname"
                      children={info.name}
                    />
                  </Form.Group>

                  <Form.Group widths="equal" inline>
                    <Form.Input
                      fluid
                      label="Email"
                      children={info.email}
                    />
                    <Form.Input
                      fluid
                      label="Phone"
                      children={info.phone}
                    />
                  </Form.Group>
                  <Form.Input
                    fluid
                    label="Address"
                    children={info.address}
                  />
                  <Form.TextArea
                    label="Note"
                    placeholder="Note for this order..."
                    rows={5}
                    autoHeight
                    value={this.state.note}
                    onChange={(e, { value }) => this.setState({ note: value })}
                  />
                  {/* <Form.Checkbox toggle label="Using infomation form account" /> */}
                  <Form.Group>
                    <Form.Button
                      width={4}
                      fluid
                      color="instagram"
                      className="btn-checkout"
                      disabled={CartLocal.getTotal() === 0}
                    >
                      Checkout
                    </Form.Button>
                  </Form.Group>
                  <i style={{marginTop : "1em", color : "red"}}>*Note: Please confirm all information is correct. We are acceptable order within 2-4 days working</i>
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

export default connect(startSelector,{ checkoutCart, setProfileToReducer })(CheckoutPage);
