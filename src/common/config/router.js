// @ts-ignore
import Home from "../../views/Home/Home";
// @ts-ignore
import About from "../../views/About/About";
import { RouteConfig } from "vue-router";

let routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "TESE"
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "*",
    name: "defaul",
    component: Home
  }
];

export default routes;
