import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth/index.vue")
  },
  {
    path: "/",
    name: "BasicLayout",
    component: () => import(/* webpackChunkName: "auth" */ "../layout/BasicLayout/index.vue")
  }
];

const router = createRouter({
  history:createWebHashHistory(),
  routes,
});

export default router;
