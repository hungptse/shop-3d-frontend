
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import CheckoutPage from "./components/CheckoutPage";



const ThemeRoutes = [
  {
    path: 'home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: 'product',
    name: 'Product',
    component: ProductPage
  },
  {
    path: 'checkout',
    name: 'Checkout',
    component: CheckoutPage
  },
  {
    path: '2',
    name: 'Figures',
    component: ProductPage
  },
  {
    path: '3',
    name: 'About US',
    component: ProductPage
  },
  { path: '/', pathTo: 'home', name: 'Home', redirect: true }
];

export default ThemeRoutes;

