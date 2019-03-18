import AccountProfile from './components/AccontProfile';
import OrderHistory from './components/OrderUser';


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
  { path: '/', pathTo: '/profile', name: 'Profile', redirect: true }
];

export default ThemeRoutes;
