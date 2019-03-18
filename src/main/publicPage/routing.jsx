
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import CheckoutPage from "./components/CheckoutPage";
import ProductDetailPage from "./components/ProductDetailPage";
import ProfilePage from "./components/AccontProfile";

import withUserRouteComponent from "../../router/withUserRouteComponent";
const withUser = withUserRouteComponent("/");

const ThemeRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/products',
    name: 'Product',
    component: ProductPage
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: withUser(CheckoutPage)
  },
  {
    path: '/product/:id',
    name: 'Product Detail',
    component: ProductDetailPage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: withUser(ProfilePage)
  },
  { path: '/', pathTo: '/home', name: 'Home', redirect: true }
];

export default ThemeRoutes;

