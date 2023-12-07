import { createRouter, createWebHistory } from "vue-router"

// Import page components
import LoginPage from "./pages/login.vue"
import RegisterPage from "./pages/register.vue"
import HomePage from "./pages/Home.vue"
import GameStatsPage from "./pages/GameStats.vue"
import AccountSettingPage from "./pages/AccountSetting.vue"
import RoomPage from "./pages/Room.vue"

const routes = [
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/", component: HomePage },
    { path: "/gamestats", component: GameStatsPage },
    { path: "/accountsetting", component: AccountSettingPage },
    { path: "/room/:roomId?", component: RoomPage, props: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router