import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/stockInfo",
    name: "StockInfo",
    component: () => import("./views/StockInfo.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes: routes,
});