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
    component: () =>
      import(/* webpackChunkName: "BasicLayout" */ "../layout/BasicLayout/index.vue"),
    children: [
      {
        path: "books",
        name: "Books",
        component: () => import(/* webpackChunkName: "Book" */ "../views/Books/index.vue")
      },
      {
        path: "books/:id",
        name: "BookDetail",
        component: () =>
          import(/* webpackChunkName: "BookDetail" */ "../views/BookDetail/index.vue")
      }
    ]
  }
];

const router = createRouter({
  history:createWebHashHistory(),
  routes,
});

export default router;
