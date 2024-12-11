import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {name: "Inicio"},
      component: HomeView,
    },
    {
      path: "/team",
      name: "team",
      meta: {name: "Equipo"},
      component: () => import("../views/TeamView.vue"),
    },{
      path: "/team/:id",
      name: "team-member",
      meta: {name: "Miembro del equipo"},
      component: () => import("../views/TeamMemberView.vue"),
    }
  ],

  scrollBehavior() {
    return new Promise((resolve) => {
      resolve({ left: 0, top: 0 })
    })
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.name ? to.meta.name + " - PokeApp" : "PokeApp";
  next();
});

export default router;