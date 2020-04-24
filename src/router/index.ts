import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// @ts-ignore
import routes from "../common/config/router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
