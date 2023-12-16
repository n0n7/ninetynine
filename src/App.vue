<script setup>
import Navbar from "./components/NavBar.vue";
</script>

<template>
    <div id="app">
        <Navbar />
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
