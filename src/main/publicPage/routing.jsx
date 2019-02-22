 import { store } from '../../store';

import ProductPage from "./components/ProductPage/ProductPage.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import { productReducer } from './components/ProductPage/ProductPage.reducer';
import { cartReducer } from './components/UI/Cart/Cart.reducer';



const PRODUCT_PAGE_STORE = "PRODUCT_PAGE_STORE";


const ThemeRoutes = [
  {
    path: 'home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: 'product',
    name: 'Product',
    component: ProductPage,
    // preProcess: () => store.injectReducer('CART_STORE', cartReducer)
   preProcess: () => store.injectReducer(PRODUCT_PAGE_STORE, productReducer)

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

