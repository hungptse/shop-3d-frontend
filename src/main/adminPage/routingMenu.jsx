import ProductManage from "./components/ProductPage";
import CategoryManage from "./components/CategoryPage";
import AccountManage from "./components/AccountPage";
import FeedbackMange from "./components/FeedbackPage";
import OrderMange from "./components/OrderPage";



const ThemeRoutes = [
  {
    path: "/products",
    name: "Manage Product",
    icon: "paper plane outline",
    component: ProductManage
  },
  {
    path: "/cates",
    name: "Manage Category",
    icon: "clone outline",
    component: CategoryManage
  },
  {
    path: "/accounts",
    name: "Manage Account",
    icon: "user outline",
    component: AccountManage
  },
  {
    path: "/feedback",
    name: "Manage Feedback",
    icon: "quote right",
    component: FeedbackMange
  },
  {
    path: "/order",
    name: "Manage Order",
    icon: "dollar sign",
    component: OrderMange
  },
  { path: "/", pathTo: "/products", name: "Product Manage", redirect: true }
];

export default ThemeRoutes;
