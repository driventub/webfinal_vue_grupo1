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
    },
    {
        path: "/alert",
        component: () => import('../components/modules/acercamiento/components/Alert.vue'),
    },
    {
        path: "/principalQuejas",
        component: () => import('../components/modules/quejas/pages/ConsultaQueja.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router 