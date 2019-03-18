import React, { Component } from "react";
import logo from "../../../../../assets/images/azgundam-logo.png";
import { Link } from "react-router-dom";
import {
  Image,
  Menu,
  Container} from "semantic-ui-react";
import CartIcon from "../Cart";
import Cart from "../Cart/Cart.jsx";
import "../Cart/cart.scss";
import "../Cart/header.scss";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import {  setCartIsActiveToReducer, getCartFromLocal } from "../Cart/Cart.action";
import Login from "../../Login";
import SearchBar from "../Search";
import { setProfileToReducer } from "../../Login/Auth.action";
const CART_STORE = "CART_STORE";

const getCartFromReducer = state => state[CART_STORE].cart;
const getCartIsActive = state => state[CART_STORE].cartIsActive;

const startSelector = createSelector(
  getCartFromReducer,
  getCartIsActive,
  (cart, cartIsActive) => ({ cart: cart || [], cartIsActive: cartIsActive })
);

class HeaderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.location.pathname
    };
  }

  componentDidMount() {
    
    if (this.state.activeItem === "/") {
      this.setState({ activeItem: "store/home" });
    } else {
      this.setState({ activeItem: this.props.location.pathname });
    }
    
    this.props.getCartFromLocal && this.props.getCartFromLocal();
    this.props.setProfileToReducer && this.props.setProfileToReducer();
  }

  handldeActiveItem = path => {    
    this.setState({ activeItem: this.props.match.path + path });
  };

  handleCartIcon = () => {
    // this.setState({ cartIsActive: !this.state.cartIsActive });

    this.props.setCartIsActiveToReducer &&
      this.props.setCartIsActiveToReducer(!this.props.cartIsActive);
    // if (this.props.cartIsActive) {
    //   document.body.classList.add("dark-overflow");
    // } else{
    //   document.body.classList.remove("dark-overflow");
    // }
  };

  backToHome = () => {
    this.props.history.push("/store/home");
  }

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
            as='a'
            style={{ marginTop: "0.5em", marginLeft: "0.5em", cursor : 'pointer' }}
            onClick={this.backToHome}
          />
          {this.props.listRouters.map((route, key) => {
            if (!route.redirect) {
              return (
                <Menu.Item
                  active={
                    this.state.activeItem ===
                    this.props.match.path + route.path
                      ? true
                      : false
                  }
                  key={key}
                >
                  <Link
                    to={this.props.match.path  + route.path}
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
              <SearchBar
                match={this.props.match}
                history={this.props.history}
                location={this.props.location}
              />
            </Menu.Item>
            <Menu.Item>
              <Login
                match={this.props.match}
                history={this.props.history}
                location={this.props.location}
              />
            </Menu.Item>
            <Menu.Item>
              <CartIcon
                onClick={this.handleCartIcon}
                cartIsActive={cartIsActive}
              />
              <div className={cartIsActive ? "mini-cart-open" : ""}>
                <Cart
                  match={this.props.match}
                  history={this.props.history}
                  location={this.props.location}
                />
              </div>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default connect(
  startSelector,
  {  setCartIsActiveToReducer, getCartFromLocal, setProfileToReducer }
)(HeaderPage);
