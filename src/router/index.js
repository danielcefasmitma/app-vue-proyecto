import { createRouter, createWebHistory } from "vue-router";
import Inicio from "./../views/Inicio.vue";
import Login from "./../views/Login.vue";
import Producto from "./../views/Producto.vue";

const routes = [
  { path: "/", component: Inicio },
  { path: "/producto", component: Producto },
  { path: "/login", component: Login },
];

export const router = createRouter({
    history: createWebHistory('/app-vue-proyecto/'),
    routes,
})
