<template>
    <nav>
        <!--navbar-->
        <div id="container-div">
            <div id="nav-home">
                <router-link to="/">
                    <img src="/99.png" alt="logo" width="50px" height="50px" onclick="">
                </router-link>
                <ul class="nav-ul">
                    <li class="nav-list">
                        <a href="/"> Home </a>
                    </li>
                </ul>
            </div>
            <div id="nav-profile">
                <ul class="nav-ul">
                    <li class="nav-list">
                        <a href="/login"> Login </a>
                    </li>
                    <router-link to="/AccountSetting">
                        <img src="/default_profile_icon.png" alt="profile" width="50px" height="50px">
                    </router-link>
                </ul>
            </div>
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
                    { name: 'Contact', path: '/contact' }
                ]
            }
        }
    }
</script>

<style scoped>
    nav {
        background-color: #242526;
        color: #fff;
        padding: 10px;
        margin-bottom: 20px;
    }

    img {
        padding: 10px;
    }

    #container-div {
        display: flex;
        align-items: center;
        justify-content: space-between;
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

    #nav-home {
        display: flex;
        align-items: center;
    }
</style>