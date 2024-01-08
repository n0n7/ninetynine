<template>
    <nav>
        <!--navbar-->
        <div id="container-div">
            <div id="nav-home">
                <router-link to="/">
                    <img
                        src="/99.png"
                        alt="logo"
                        width="50px"
                        height="50px"
                        onclick=""
                    />
                </router-link>
                <ul class="nav-ul">
                    <li class="nav-list">
                        <router-link to="/">
                            <a> Home </a>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div id="nav-profile">
                <div class="dropdown">
                    <div class="profile-detail">
                        <router-link v-if="!isLoggedIn" to="/login">
                            <a> Login </a>
                        </router-link>
                        <p v-else>{{ data.username }}</p>
                        <img
                            class="profile-pic"
                            v-if="!isLoggedIn"
                            src="/default_profile_icon.png"
                        />
                        <img
                            class="profile-pic"
                            v-else
                            :src="data.profilePic"
                            @error="setAvatarToDefault"
                        />
                    </div>
                    <div class="dropdown-content" v-if="isLoggedIn">
                        <!-- <router-link to="/accountsetting"> -->
                        <a>Profile</a>
                        <!-- </router-link> -->
                        <a id="logout-btn" @click="toggleWindow">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <ConfirmWindow
        message="Logout?"
        to="/"
        :isVisible="isWindowShown"
        @confirm="logout"
        @closeWindow="toggleWindow"
    />
</template>

<script>
import ConfirmWindow from "./ConfirmWindow.vue";
import { useSessionStore } from "../store/session.js";
export default {
    setup() {
        const sessionStore = useSessionStore();
        return {
            sessionStore,
        };
    },
    props: {
        isLoggedIn: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: null,
        },
    },
    components: {
        ConfirmWindow,
    },
    data() {
        return {
            pages: [
                { name: "Home", path: "/" },
                { name: "Login", path: "/login" },
                { name: "Contact", path: "/contact" },
            ],

            isWindowShown: false,
        };
    },
    methods: {
        logout() {
            this.sessionStore.logout();
            this.isWindowShown = false;
        },
        setAvatarToDefault(event) {
            event.target.src = "/default_profile_icon.png";
        },
        toggleWindow() {
            this.isWindowShown = !this.isWindowShown;
        },
    },
};
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
    flex-direction: row;
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

.nav-list p {
    color: #fff;
    text-decoration: none;
    cursor: default;
    margin: 0;
}

.nav-list a:hover {
    color: #ccc;
}

#nav-home {
    display: flex;
    align-items: center;
}

.profile-detail {
    /* background: green; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    column-gap: 15px;
}

.profile-detail p {
    padding: 0;
    margin: 0;
}

.dropdown a {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.dropdown a:hover {
    color: #ccc;
}

.profile-pic {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 0;
    padding: 0;
}

.dropdown {
    /* background: blue; */
    overflow: visible;
    height: 50px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* row-gap: 10px; */
}

.dropdown-content {
    background: #242526;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 30px 20px 30px;
    row-gap: 20px;
    font-size: 1.5rem;
    z-index: 1;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    height: 0;
    opacity: 0;
    visibility: hidden;
    transition: height 0.2s ease-in-out, opacity 0.2s ease-in-out,
        visibility 0.2s ease-in-out;
}

.dropdown:hover .dropdown-content {
    height: 100px;
    opacity: 1;
    visibility: visible;
}

#logout-btn:hover {
    color: #ff0033;
}
</style>
