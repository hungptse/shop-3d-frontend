import AccountProfile from './components/AccontProfile';
import OrderHistory from './components/OrderUser';
import FeedbackUser from './components/FeedbackUser';
import ChangePassword from "./components/ChangePassword";
import OrderDetail from './components/OrderUser/OrderDetail.jsx';


const ThemeRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    component: AccountProfile
  },
  {
    path: '/change-password',
    name: 'Change password',
    component: ChangePassword,
    hidden : true
  },
  {
    path: '/orders',
    name: 'Order history',
    component: OrderHistory
  },
  {
    path: '/feedback',
    name: 'Feedback history',
    component: FeedbackUser
  },
  {
    path: '/order/:id',
    name: 'Order Detail',
    component: OrderDetail,
    hidden : true
  },
  { path: '/', pathTo: '/profile', name: 'Profile', redirect: true }
];

export default ThemeRoutes;
