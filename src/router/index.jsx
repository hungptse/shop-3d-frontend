import withAdminRouteComponent from "./withAdminRouteComponent";
import withUserRouteComponent from "./withUserRouteComponent";

import Login from '../main/loginPage/Login.jsx';
import AdminPage from '../main/adminPage';
import UserPage from '../main/userPage';
import HomePage from '../main/publicPage';
import ProductPage from '../main/publicPage/components/ProductPage/ProductPage.jsx';



const withAdmin = withAdminRouteComponent("/");
const withUser = withUserRouteComponent("/");

const indexRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/product',
        name: 'Product',
        component: ProductPage
    },
    {
        path: '/admin',
        name: 'Admin',
        component: withAdmin(AdminPage)
    },
    {
        path: '/user',
        name: 'User',
        component: withUser(UserPage)
    },
    { path: '/', pathTo: '/home', name: 'Home', redirect: true }
];

export default indexRoutes;
