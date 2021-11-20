export const RoutesConfig = [
  {
    title: 'HOME',
    key: 'home',
    path: '/app/home/:id?',
    component: () => import('@/routes/home'),
  },
  {
    title: 'BASEJS',
    key: 'basejs',
    path: '/app/basejs',
    component: () => import('@/routes/baseJs'),
  },
  {
    title: 'REACT',
    key: 'react',
    path: '/app/react',
    component: () => import('@/routes/react'),
  },
  {
    title: 'REDUX',
    key: 'redux',
    path: '/app/redux',
    component: () => import('@/routes/redux'),
  },
  {
    title: 'DVAJS',
    key: 'dvajs',
    path: '/app/dvajs',
    component: () => import('@/routes/dvaJs'),
  },
  {
    title: 'WEBPACK',
    key: 'webpack',
    path: '/app/webpack',
    component: () => import('@/routes/webpack'),
  },
  {
    title: 'DND',
    key: 'dnd',
    path: '/app/dnd',
    component: () => import('@/routes/dnd'),
  },
  {
    title: 'NODE',
    key: 'node',
    path: '/app/node',
    component: () => import('@/routes/node'),
  },
  {
    title: 'AUTH',
    key: 'auth',
    path: '/app/auth',
    component: () => import('@/routes/auth'),
  },
  {
    title: 'LOGIN',
    key: 'login',
    path: '/app/login',
    component: () => import('@/routes/login'),
    exact: true,
  },
];
