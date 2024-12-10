import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/team",
      name: "team",
      component: () => import("../views/TeamView.vue"),
    },{
      path: "/team/:id",
      name: "team-member",
      component: () => import("../views/TeamMemberView.vue"),
    }
  ],
});

export default router;