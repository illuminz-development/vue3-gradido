import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Communities from '../views/Communities.vue';
import AddCommunity from '../views/AddCommunity.vue';
import EditCommunity from '../views/EditCommunity.vue';
import Categories from '../views/Categories.vue';
import Tags from '../views/Tags.vue';
import Offers from '../views/Offers.vue';
import Needs from '../views/Needs.vue';
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Logout from '../views/Logout.vue';

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/communities",
    name: "Communities",
    component: Communities,
  },
  {
    path: "/communities/add",
    name: "AddCommunity",
    component: AddCommunity,
  },
  {
    path: "/communities/edit/:id",
    name: "EditCommunity",
    component: EditCommunity,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/tags",
    name: "Tags",
    component: Tags,
  },
  {
    path: "/offers",
    name: "Offers",
    component: Offers,
  },
  {
    path: "/needs",
    name: "Needs",
    component: Needs,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
