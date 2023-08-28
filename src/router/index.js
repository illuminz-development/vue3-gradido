import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Analytics from "../views/Analytics.vue";
import Communities from '../views/Communities.vue';
import CommunitiesList from '../views/CommunitiesList.vue';
import CommunityUsers from '../views/CommunityUsers.vue';
import AddCommunity from '../views/AddCommunity.vue';
import EditCommunity from '../views/EditCommunity.vue';
import Categories from '../views/Categories.vue';
import Tags from '../views/Tags.vue';
import Offers from '../views/Offers.vue';
import Needs from '../views/Needs.vue';
import Profile from "../views/Profile.vue";
import Signin from "../views/Signin.vue";
import Logout from '../views/Logout.vue';
import Playground from '../views/Playground.vue';

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
    meta: {
      breadCrumbs: {
        to: '/dashboard'
      }
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      breadCrumbs: {
        to: '/dashboard'
      }
    },
    children: [
      {
        path: "",
        name: "Analytics",
        component: Analytics,
        meta: {
          breadCrumbs: {
            to: '/dashboard'
          }
        }
      },
      {
        path: "communities",
        name: "Communities",
        component: Communities,
        meta: {
          breadCrumbs: {
            to: '/dashboard/communities'
          }
        },
        children: [
          {
            path: "",
            name: "CommunitiesList",
            component: CommunitiesList,
            meta: {
              breadCrumbs: {
                to: '/dashboard/communities'
              }
            },
          },
          {
            path: "users",
            name: "CommunityUsers",
            component: CommunityUsers,
            meta: {
              breadCrumbs: {
                to: '/dashboard/communities/users'
              }
            },
          },
          {
            path: "add",
            name: "AddCommunity",
            component: AddCommunity,
            meta: {
              breadCrumbs: {
                to: '/dashboard/communities/add'
              }
            },
          },
          {
            path: "edit/:id",
            name: "EditCommunity",
            component: EditCommunity,
          }
        ]
      },
      {
        path: "categories",
        name: "Categories",
        component: Categories,
        meta: {
          breadCrumbs: {
            to: '/dashboard/categories'
          }
        },
      },
      {
        path: "tags",
        name: "Tags",
        component: Tags,
        meta: {
          breadCrumbs: {
            to: '/dashboard/tags'
          }
        },
      },
      {
        path: "offers",
        name: "Offers",
        component: Offers,
        meta: {
          breadCrumbs: {
            to: '/dashboard/offers'
          }
        },
      },
      {
        path: "needs",
        name: "Needs",
        component: Needs,
        meta: {
          breadCrumbs: {
            to: '/dashboard/needs'
          }
        },
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        meta: {
          breadCrumbs: {
            to: '/dashboard/profile'
          }
        },
      }
    ]
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  },
  {
    path: "/playground",
    name: "Playground",
    component: Playground
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
