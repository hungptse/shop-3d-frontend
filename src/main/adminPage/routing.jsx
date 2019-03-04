import ProductManage from './components/ProductPage';

const ThemeRoutes = [
  {
    path: '/products',
    component: ProductManage,
  },
  { path: '/', pathTo: '/products', name: 'Product Manage', redirect: true }
];

export default ThemeRoutes;