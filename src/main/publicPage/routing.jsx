// import { store } from '../../store';

import HomePage from "./components/HomePage/HomePage.jsx";
import ProductPage from "./components/ProductPage/ProductPage.jsx";


const ThemeRoutes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/product',
    name: 'Product',
    component: ProductPage
  },
  { path: '/', pathTo: '/home', name: 'Home', redirect: true }
];

export default ThemeRoutes;

