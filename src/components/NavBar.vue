<template>
    <nav>
        <div id="container-div">
            <img src="/public/99.png" alt="logo" width="50px" height="50px" href="/" onclick="">
            <ul class="nav-ul">
                <li v-for="(page,index) in pages" class="nav-list">
                    <a :href="page.path"> {{ page.name }} </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                pages: [
                    { name: 'Home', path: '/' },
                    { name: 'Login', path: '/login' },
                    { name: 'Contact', path: '/contact' },
                ]
            }
        }
    }
</script>

<style>
    nav {
        background-color: #333;
        color: #fff;
        padding: 10px;
        margin-bottom: 20px;
    }

    img {
        padding-left: 10px;
    }

    #container-div {
        display: flex;
        align-items: center;
    }

    .nav-ul {
        display: flex;
        align-items: center;
        list-style-type: none;
    }

    .nav-list {
        padding: 10px;
    }

    .nav-list a {
        color: #fff;
        text-decoration: none;
    }

    .nav-list a:hover {
        color: #ccc;
    }
</style>