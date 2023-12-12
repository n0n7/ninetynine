<script setup>
import Navbar from "./components/NavBar.vue"
</script>

<template>
    <div id="app">
        <Navbar />
        <router-view></router-view>
    </div>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Monda&display=swap');
    
    *{
        font-family: 'Monda', sans-serif;
        
    }

    html{
        background: #18191A;
    }
</style>
