import withAdminRouteComponent from "./withAdminRouteComponent";
import withUserRouteComponent from "./withUserRouteComponent";
import withGuestRouteComponent from "./withGuestAndUserRouteComponent";



import AdminPage from '../main/adminPage';
import UserPage from '../main/userPage';
import PublicPage from '../main/publicPage';
import RegisterPage from "../main/publicPage/components/RegisterPage";



const withAdmin = withAdminRouteComponent("/");
const withUser = withUserRouteComponent("/");
const withNotAdmin = withGuestRouteComponent("/admin");




const indexRoutes = [
    {
        path: '/store',
        name: 'Public',
        component: withNotAdmin(PublicPage)
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
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage
    },
    { path: '/', pathTo: '/store', name: 'Public', redirect: true }
];

export default indexRoutes;
