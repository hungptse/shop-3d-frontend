import Starter from '../components/starter.jsx';

const ThemeRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'ti-loop',
    component: Starter
  },
  { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];

export default ThemeRoutes;
