import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(`${import.meta.env.BASE_URL}`),
  routes: [{
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/stockInfo",
    name: "StockInfo",
    component: () => import("./views/StockInfo.vue"),
  },
  {
    path: "/stockDividend",
    name: "StockDividend",
    component: () => import("./views/StockDividend.vue"),
  }]
});
