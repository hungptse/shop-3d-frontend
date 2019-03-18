import AccountProfile from './components/AccontProfile';
import OrderHistory from './components/OrderUser';
import FeedbackUser from './components/FeedbackUser';



const ThemeRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    component: AccountProfile
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
