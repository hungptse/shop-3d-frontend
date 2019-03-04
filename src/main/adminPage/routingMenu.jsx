import ProductManage from "./components/ProductPage";

const ThemeRoutes = [
  {
    path: "/products",
    name: "Product Manage",
    icon: "paper plane outline",
    component: ProductManage
  },
  { path: "/", pathTo: "/products", name: "Product Manage", redirect: true }
];

export default ThemeRoutes;
