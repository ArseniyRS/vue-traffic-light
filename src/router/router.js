import VueRouter, {createRouter, createWebHistory} from "vue-router";
import Light from "../components/Light";


const routes = [
    {
        path: '/',
        component: Light
    },
    {
        path: '/red',
        component: Light
    },
    {
        path: '/yellow',
        component: Light
    },
    {
        path: '/green',
        component: Light
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router