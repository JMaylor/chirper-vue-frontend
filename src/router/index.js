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
        path: "/signup",
        name: "SignUp",
        component: () => import("@/views/SignUp.vue"),
      },
      {
        path: "/liked",
        name: "Liked",
        component: () => import("@/views/Liked.vue"),
      },
      {
        path: "/compose",
        name: "Compose",
        component: () => import("@/views/Compose.vue"),
      },
      {
        path: "/user/:userId",
        name: "User",
        component: () => import("@/views/User.vue"),
      },
      {
        path: "/chirp/:chirpId",
        name: "Chirp",
        component: () => import("@/views/Chirp.vue"),
      },
      {
        path: "/search",
        name: "Search",
        component: () => import("@/views/Search.vue"),
        children: [
          {
            path: "/hashtag/:hashtag",
            name: "Hashtag",
            component: () => import("@/views/Hashtag.vue"),
          },
        ],
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
