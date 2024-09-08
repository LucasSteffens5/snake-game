import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../components/Menu.vue'
import BoardGame from '../components/BoardGame.vue'

const routes = [
    { path: '/', component: Menu },
    { path: '/play', component: BoardGame }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router