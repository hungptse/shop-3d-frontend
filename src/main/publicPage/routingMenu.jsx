
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";

const MenuRoutes = [
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: HomePage,
  // },
  // {
  //   path: '/products',
  //   name: 'Product',
  //   component: ProductPage
  // },
  { path: '/', pathTo: 'home', name: 'Home', redirect: true }
];

export default MenuRoutes;

