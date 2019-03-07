import ProductManage from './components/ProductPage';
import CategoryManage from "./components/CategoryPage";
import AccountManage from "./components/AccountPage";
import FeedbackMange from './components/FeedbackPage';
import OrderMange from './components/OrderPage';

const ThemeRoutes = [
  {
    path: '/products',
    component: ProductManage,
  },
  {
    path: "/cates",
    component: CategoryManage
  },
  {
    path: "/accounts",
    component: AccountManage
  },
  {
    path: "/feedback",
    component: FeedbackMange
  },
  {
    path: "/order",
    component: OrderMange
  },
  { path: '/', pathTo: '/products', name: 'Product Manage', redirect: true }
];

export default ThemeRoutes;