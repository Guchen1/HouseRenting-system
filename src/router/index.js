import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/MainView.vue"),
    },
    {
      path: "/owner",
      name: "Owner",
      component: () => import("../views/OwnerView.vue"),
    },
    {
      path: "/house",
      name: "House",
      component: () => import("../views/HouseView.vue"),
    },
    {
      path: "/tenant",
      name: "Tenant",
      component: () => import("../views/TenantView.vue"),
    },
    {
      path: "/rent",
      name: "Rent",
      component: () => import("../views/RentView.vue"),
    },
    {
      path: "/state",
      name: "State",
      component: () => import("../views/StateView.vue"),
    },
    {
      path: "/charge",
      name: "Charge",
      component: () => import("../views/ChargeView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
