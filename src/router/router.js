import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () =>
      import("../pages/HomeCivil.vue"),
  },
  {
    path: "/civil",
    component: () =>
      import("../pages/HomeCivil.vue"),
  },
  {
    path: "/suscribirse",
    component: () =>
      import("../components/modules/acercamiento/pages/GuardarSuscripcion.vue"),
  },
  {
    path: "/terminos",
    component: () =>
      import("../components/modules/acercamiento/pages/Terminos.vue"),
  },
  {
    path: "/ayuda",
    component: () =>
      import("../components/modules/acercamiento/pages/Ayuda.vue"),
  },
  {
    path: "/alert",
    component: () =>
      import("../components/modules/acercamiento/components/Alert.vue"),
  },
  {
    path: "/noticias/insertar",
    component: () =>
      import(
        "../components/modules/publicaciones/pages/NoticiasInsertarPage.vue"
      ),
  },
  ////parte de las quejas
  {
    path: "/noticias/ver",
    component: () =>
      import(
        "../components/modules/publicaciones/pages/NoticiasVerPage.vue"
      ),
  },
  {
    path: "/principalQuejas",
    path: "/quejas",
    component: () =>
      import("../components/modules/quejas/pages/ConsultaQueja.vue"),
  },
  {
    path: "/quejas/insertar",
    component: () =>
      import("../components/modules/quejas/pages/GuardaQueja.vue"),
  },
  {
    path: "/quejas/actualizar",
    component: () =>
      import("../components/modules/quejas/pages/ActualizarQueja.vue"),
  },
  {
    path: "/quejas/eliminar",
    component: () =>
      import("../components/modules/quejas/pages/EliminarQueja.vue"),
  },
  {
    path:"/foro",
    component:()=> import('../components/modules/foro/page/ForoPage.vue')

  },

  {
    path: "/profesor",
    component: () =>
      import("../components/modules/acercamiento/components/Profesor.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
