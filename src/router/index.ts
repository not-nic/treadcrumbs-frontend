import { createWebHistory, createRouter } from "vue-router";
// @ts-ignore
import Upload from "../views/Upload.vue";
// @ts-ignore
import Dashboard from "../views/Dashboard.vue";

const routes = [
    { path: "/", name: "upload", component: Upload},
    { path: "/dashboard", name: "dashboard", component: Dashboard }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router