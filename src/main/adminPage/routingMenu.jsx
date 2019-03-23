import ProductManage from "./components/ProductPage";
import CategoryManage from "./components/CategoryPage";
import AccountManage from "./components/AccountPage";
import FeedbackMange from "./components/FeedbackPage";
import OrderMange from "./components/OrderPage";



const ThemeRoutes = [
  {
    path: "/products",
    name: "Manage Product",
    icon: "shop",
    component: ProductManage
  },
  {
    path: "/cates",
    name: "Manage Category",
    icon: "deployment-unit",
    component: CategoryManage
  },
  {
    path: "/accounts",
    name: "Manage Account",
    icon: "usergroup-add",
    component: AccountManage
  },
  {
    path: "/feedback",
    name: "Manage Feedback",
    icon: "solution",
    component: FeedbackMange
  },
  {
    path: "/order",
    name: "Manage Order",
    icon: "shop",
    component: OrderMange
  },
  { path: "/", pathTo: "/products", name: "Product Manage", redirect: true }
];

export default ThemeRoutes;
