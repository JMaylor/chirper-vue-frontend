import { createRouter, createWebHistory } from "vue-router";

import { routeGuard } from "@/auth";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("@/views/Landing.vue"),
  },
  {
    path: "/app",
    name: "AppLayout",
    component: () => import("@/views/AppLayout.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/liked",
        name: "Liked",
        component: () => import("@/views/Liked.vue"),
      },
      {
        path: "/search",
        name: "Search",
        component: () => import("@/views/Search.vue"),
      },
      {
        path: "/settings",
        name: "Settings",
        component: () => import("@/views/Settings.vue"),
      },
    ],
  },
  {
    path: "/callback",
    name: "Callback",
    component: () => import("@/views/Callback.vue"),
  },
  {
    path: "/error",
    name: "Error",
    component: () => import("@/views/Error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(routeGuard);

export default router;
