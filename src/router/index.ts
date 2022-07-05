import { createRouter, createWebHistory } from "vue-router";
import DetailView from "../views/DetailView.vue";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/about",
      name: "about",
      component: DetailView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

    
export default router;
