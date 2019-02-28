import React, { Component } from "react";
import logo from "../../../../../assets/images/azgundam-logo.png";
import { Link } from "react-router-dom";
import { Image, Menu, Container, Button, Input } from "semantic-ui-react";
import CartIcon from "../Cart";
import Cart from "../Cart/Cart.jsx";
import "../Cart/cart.scss";
import "../Cart/header.scss";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { getCartFromAPI, setCartIsActiveToReducer } from "../Cart/Cart.action";
import Login from "../../Login";
import SearchBar from "../Search";
import CookieStorageUtils, {
  COOKIE_KEY
} from "../../../../../utils/CookieStorage";
const CART_STORE = "CART_STORE";
const AUTH_STORE = "AUTH_STORE";

const getCartFromReducer = state => state[CART_STORE].cart;
const getCartIsActive = state => state[CART_STORE].cartIsActive;

const startSelector = createSelector(
  getCartFromReducer,
  getCartIsActive,
  (cart, cartIsActive) => ({ cart: cart || [], cartIsActive : cartIsActive })
);

class HeaderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.location.pathname,
      // cartIsActive: true
    };
  }

  componentDidMount() {
    if (this.state.activeItem === "/") {
      this.setState({ activeItem: "/home" });
    } else {
      this.setState({ activeItem: this.props.location.pathname });
    }
    this.props.getCartFromAPI &&
      this.props.getCartFromAPI(CookieStorageUtils.getSub());
  }

  handldeActiveItem = path => {
    this.setState({ activeItem: "/" + path });
  };

  handleCartIcon = () => {

    // this.setState({ cartIsActive: !this.state.cartIsActive });
    
    this.props.setCartIsActiveToReducer && this.props.setCartIsActiveToReducer(!this.props.cartIsActive);
    // if (this.state.cartIsActive) {
    //   document.body.classList.add("dark-overflow");
    // } else{
    //   document.body.classList.remove("dark-overflow");
    // }
  };

  render() {
    const { cartIsActive } = this.props;
    return (
      <Menu
        fixed="top"
        borderless
        secondary
        pointing
        style={{ paddingBottom: "1em", background: "#ffffff" }}
        className="boderBot"
      >
        <Container style={{ backgroudColor: "white" }}>
          <Image
            floated="left"
            src={logo}
            style={{ marginTop: "0.5em", marginLeft: "0.5em" }}
          />
          {this.props.listRouters.map((route, key) => {
            if (!route.redirect) {
              return (
                <Menu.Item
                  active={
                    this.state.activeItem === "/" + route.path ? true : false
                  }
                  key={key}
                >
                  <Link
                    to={this.props.match.path + route.path}
                    style={{ color: "black" }}
                    onClick={() => this.handldeActiveItem(route.path)}
                  >
                    {route.name.toUpperCase()}
                  </Link>
                </Menu.Item>
              );
            }
          })}
          <Menu.Menu position="right">
            <Menu.Item>
              <SearchBar />
              {/* <Input icon="search" placeholder="Search..." /> */}
            </Menu.Item>
            <Menu.Item>
              <CartIcon
                onClick={this.handleCartIcon}
                cartIsActive={cartIsActive}
              />
              <div className={cartIsActive ? "mini-cart-open" : ""}>
                <Cart />
              </div>
            </Menu.Item>
            <Menu.Item>
              <Login />

              {/* <Button primary>Login</Button> */}
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default connect(
  startSelector,
  { getCartFromAPI, setCartIsActiveToReducer }
)(HeaderPage);
