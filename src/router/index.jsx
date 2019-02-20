import withAdminRouteComponent from "./withAdminRouteComponent";
import withUserRouteComponent from "./withUserRouteComponent";

import AdminPage from '../main/adminPage';
import UserPage from '../main/userPage';
import PublicPage from '../main/publicPage';



const withAdmin = withAdminRouteComponent("/");
const withUser = withUserRouteComponent("/");

const indexRoutes = [
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: Login
    // },
    {
        path: '/',
        name: 'Public',
        component: PublicPage
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
    { path: '/', pathTo: '/', name: 'Public', redirect: true }
];

export default indexRoutes;
