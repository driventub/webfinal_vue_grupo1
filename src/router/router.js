import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [

    {
        path: "/suscribirse",
        component: () => import('../components/modules/acercamiento/pages/GuardarSuscripcion.vue'),
    },
    {
        path: "/terminos",
        component: () => import('../components/modules/acercamiento/pages/Terminos.vue'),
    },
    {
        path: "/ayuda",
        component: () => import('../components/modules/acercamiento/pages/Ayuda.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router 