import Starter from '../components/starter.jsx';
import { store } from '../../../store';
import { startReducer } from '../components/starter.reducer.js';

const STARTER_STORE = "STARTER_STORE";

const ThemeRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'ti-loop',
    component: Starter,
    preProcess: () => store.injectReducer(STARTER_STORE, startReducer)
    //inject reducer: thêm reducer cho trang cần dùng
    //1 page 1 reducer
  },
  {
    path: '/alert',
    name: 'Alerts',
    icon: 'mdi mdi-comment-processing-outline',
    component: Starter
  },
  {
    path: '/badge',
    name: 'Badges',
    icon: 'mdi mdi-arrange-send-backward',
    component: Starter
  },
  {
    path: '/button',
    name: 'Buttons',
    icon: 'mdi mdi-toggle-switch',
    component: Starter
  },
  {
    path: '/card',
    name: 'Cards',
    icon: 'mdi mdi-credit-card-multiple',
    component: Starter
  },
  {
    path: '/grid',
    name: 'Grid',
    icon: 'mdi mdi-apps',
    component: Starter
  },
  {
    path: '/pagination',
    name: 'Pagination',
    icon: 'mdi mdi-priority-high',
    component: Starter
  },
  {
    path: '/popover',
    name: 'Popover',
    icon: 'mdi mdi-pencil-circle',
    component: Starter
  },
  {
    path: '/ui-components/tooltip',
    name: 'Toltips',
    icon: 'mdi mdi-image-filter-vintage',
    component: Starter
  },
  {
    path: '/viewProfile',
    name: 'View profile',
    icon: 'mdi mdi-credit-card-multiple',
    component: Starter
  },
  { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];

export default ThemeRoutes;
