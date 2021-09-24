import  {createRouter, createWebHashHistory} from "vue-router";
import Light from "@c/Light";
import {PATH_GREEN, PATH_RED, PATH_YELLOW} from "@/constatnts/routes";


const routes = [
    {
        path: '/',
        component: Light
    },
    {
        path: PATH_RED,
        component: Light
    },
    {
        path: PATH_YELLOW,
        component: Light
    },
    {
        path: PATH_GREEN,
        component: Light
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router