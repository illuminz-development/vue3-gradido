import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Analytics from "../views/Analytics.vue";
import Communities from '../views/Communities.vue';
import CommunitiesList from '../views/CommunitiesList.vue';
import CommunityUsers from '../views/CommunityUsers.vue';
import AddCommunity from '../views/AddCommunity.vue';
import EditCommunity from '../views/EditCommunity.vue';
import CategoriesList from '../views/CategoriesList.vue';
import Categories from '../views/Categories.vue';
import EditCategory from '../views/EditCategory.vue';
import TagsList from '../views/TagsList.vue';
import EditTag from '../views/EditTag.vue';
import Tags from '../views/Tags.vue';
import Offers from '../views/Offers.vue';
import Needs from '../views/Needs.vue';
import Profile from "../views/Profile.vue";
import Signin from "../views/Signin.vue";
import Logout from '../views/Logout.vue';
import Playground from '../views/Playground.vue';
import PlaygroundCommunity from '../views/PlaygroundCommunity.vue';

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
        name: "CategoriesList",
        component: CategoriesList,
        meta: {
          breadCrumbs: {
            to: '/dashboard/categories'
          }
        },
        children: [
          {
            path: "",
            name: "Categories",
            component: Categories,
            meta: {
              breadCrumbs: {
                to: '/dashboard/categories'
              }
            },
          },
          {
            path: "edit/:id",
            name: "EditCategory",
            component: EditCategory,
          }
        ]
      },
      {
        path: "tags",
        name: "TagsList",
        component: TagsList,
        meta: {
          breadCrumbs: {
            to: '/dashboard/tags'
          }
        },
        children: [
          {
            path: "",
            name: "Tags",
            component: Tags,
            meta: {
              breadCrumbs: {
                to: '/dashboard/tags'
              }
            },
          },
          {
            path: "edit/:id",
            name: "EditTag",
            component: EditTag,
          }
        ]
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
  },
  {
    path: "/playground-community",
    name: "PlaygroundCommunity",
    component: PlaygroundCommunity
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
