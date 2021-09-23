import { Path } from "../common/constants";

export default [
  {
    path: Path.ROOT,
    name: `IndexHome`,
    component: () => import(`../views/Index.vue`),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: Path.CARD,
    name: `Cart`,
    component: () => import(`../views/Cart.vue`),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: Path.LOGIN,
    name: `Login`,
    component: () => import(`../views/Login.vue`),
    meta: { layout: "AppLayoutModal" },
  },
  {
    path: Path.ORDERS,
    name: `Orders`,
    component: () => import(`../views/Orders.vue`),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: Path.PROFILE,
    name: `Profile`,
    component: () => import(`../views/Profile.vue`),
    meta: { layout: "AppLayoutDefault" },
  },
];
