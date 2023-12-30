<script setup>
import Navbar from "./components/NavBar.vue";
import { useSessionStore } from "./store/session.js";

const sessionStore = useSessionStore();
</script>

<template>
    <div id="app">
        <Navbar
            :isLoggedIn="sessionStore.getIsLoggedIn"
            :data="sessionStore.getData"
        />
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: null,
            userData: null,
        };
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Monda&display=swap");

* {
    font-family: "Monda", sans-serif;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}

html {
    background: #18191a;
}

::-webkit-scrollbar {
    width: 3px;
}

::-webkit-scrollbar-thumb {
    background: #a35bff;
    border-radius: 10px;
}
</style>
