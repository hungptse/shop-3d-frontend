import LocalStorage, { LOCAL_STORAGE_KEY } from "./LocalStorage";

class CartLocal {
  constructor() {
    this.cart = this.getCart() || [];
  }

  addToCart(product) {
    var cart = this.getCart();
    var isExisted =
      cart.findIndex(p => p.id === product.id) > -1 ? true : false;
    if (isExisted) {
      var newQuantity =
        cart.find(p => p.id === product.id).quantity + product.quantity;
      if (newQuantity >= product.maxQuantity) {
        newQuantity = product.maxQuantity;
      }
      cart.find(p => p.id === product.id).quantity = newQuantity;
    } else {
      cart.push(product);
    }
    LocalStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify(cart));
  }

  removeProduct(id) {
    var cart = this.getCart();
    console.log(cart.filter(p => p.id !== id));
    if (cart.length === 0) {
      LocalStorage.setItem(LOCAL_STORAGE_KEY.CART, JSON.stringify([]));
    } else {
      LocalStorage.setItem(
        LOCAL_STORAGE_KEY.CART,
        JSON.stringify(cart.filter(p => p.id !== id))
      );
    }
  }
  getCart() {
    var cart =
      LocalStorage.getCart() === undefined
        ? this.cart
        : JSON.parse(LocalStorage.getCart());
    return cart;
  }
}
export default new CartLocal();
