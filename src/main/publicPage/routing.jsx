// import { store } from '../../store';

import ProductPage from "./components/ProductPage/ProductPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";



const ThemeRoutes = [
  {
    path: 'home',
    name: 'Home',
    component: HomePage
  },
  {
    path: 'product',
    name: 'Product',
    component: ProductPage
  },
  {
    path: '1',
    name: 'Gundam',
    component: ProductPage
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

