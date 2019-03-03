
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import CheckoutPage from "./components/CheckoutPage";
import ProductDetailPage from "./components/ProductDetailPage";



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
    component: CheckoutPage
  },
  {
    path: '/product/:id',
    name: 'Product Detail',
    component: ProductDetailPage
  },
  { path: '/', pathTo: '/home', name: 'Home', redirect: true }
];

export default ThemeRoutes;

