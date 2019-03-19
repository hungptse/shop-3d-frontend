import AccountProfile from './components/AccontProfile';
import OrderHistory from './components/OrderUser';
import FeedbackUser from './components/FeedbackUser';
import ChangePassword from "./components/ChangePassword";


const ThemeRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    component: AccountProfile
  },
  {
    path: '/change-password',
    name: 'Change password',
    component: ChangePassword
  },
  {
    path: '/order',
    name: 'Order history',
    component: OrderHistory
  },
  {
    path: '/feedback',
    name: 'Feedback history',
    component: FeedbackUser
  },
  { path: '/', pathTo: '/profile', name: 'Profile', redirect: true }
];

export default ThemeRoutes;
