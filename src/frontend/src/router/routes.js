import { Path } from "../common/constants";
import { getView } from "../common/helpers";

export default [
  {
    path: Path.ROOT,
    name: `IndexHome`,
    component: getView("Index"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: Path.CART,
    name: `Cart`,
    component: getView("Cart"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: Path.LOGIN,
    name: `Login`,
    component: getView("Login"),
    meta: { layout: "AppLayoutModal" },
  },
  {
    path: Path.ORDERS,
    name: `Orders`,
    component: getView("Orders"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: Path.PROFILE,
    name: `Profile`,
    component: getView("Profile"),
    meta: { layout: "AppLayoutDefault" },
  },
];
