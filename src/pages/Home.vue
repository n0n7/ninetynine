<template>
    <div class="home-container">
        <div class="home-sidebar" v-if="!isSmallScreen">
            <div
                class="p-info"
                :class="{ active: activePage == 1 }"
                @click.prevent="
                    activePage === 1 ? (activePage = 0) : (activePage = 1)
                "
            >
                <p>How to Play?</p>
            </div>
            <div
                class="p-info"
                :class="{ active: activePage == 2 }"
                @click.prevent="
                    activePage === 2 ? (activePage = 0) : (activePage = 2)
                "
            >
                <p>Card Effects</p>
            </div>
        </div>
        <div class="menu-container" v-if="isSmallScreen">
            <img class="menu-icon" @click="toggleMenu()" src="/menu.svg" />
            <div
                :class="
                    isMenuShow
                        ? 'menu-list menu-list-show'
                        : 'menu-list menu-list-hide'
                "
            >
                <button
                    class="button-menu"
                    :class="{ active: activePage == 2 }"
                    @click.prevent="cardEffectsClick()"
                >
                    Card Effects
                </button>
                <button
                    class="button-menu"
                    :class="{ active: activePage == 1 }"
                    @click.prevent="howToPlayClick()"
                >
                    How to Play?
                </button>
            </div>
        </div>

        <div class="home-main">
            <img id="logo-image" v-if="activePage == 0" src="/99.png" />
            <div v-else-if="activePage == 1" class="home-main-info">
                <h1>{{ pages[activePage].title }}</h1>
                <div class="home-main-details">
                    <HowToPlay />
                </div>
            </div>
            <div v-else-if="activePage == 2" class="home-main-info">
                <h1>{{ pages[activePage].title }}</h1>
                <div class="home-main-details">
                    <CardEffectsList />
                </div>
            </div>
            <div class="flex-container-button">
                <NavButton
                    class="flex-item-button"
                    text="Join Room"
                    @click="joinRoom"
                />
                <NavButton
                    class="flex-item-button"
                    text="Create Room"
                    @click="createRoom"
                />
            </div>
            <p v-show="isError" id="invalid-status">
                {{ status }}
            </p>
        </div>
    </div>
</template>

<script>
import NavButton from "/src/components/NavButton.vue";
import { useSessionStore } from "../store/session.js";
import { useLobbyStore } from "../store/lobbyStore.js";
import HowToPlay from "/src/components/HowToPlay.vue";
import CardEffectsList from "/src/components/CardEffectsList.vue";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default {
    components: {
        NavButton,
        HowToPlay,
        CardEffectsList,
    },
    data() {
        return {
            status: "",
            activePage: 0,
            pages: [
                {
                    name: "home",
                    title: "Home",
                    content: "Welcome to 99!",
                },
                {
                    name: "howToPlay",
                    title: "How to Play?",
                    content:
                        "Write the rules here Write the rules here Write the rules here Write the rules here",
                },
                {
                    name: "Card Effects",
                    title: "Card Effects",
                    content: "Write the status here",
                },
            ],
            sessionStore: useSessionStore(),
            lobbyStore: useLobbyStore(),
            isMenuShow: false,
            isSmallScreen: screen.width <= 600,
        };
    },
    computed: {
        isError() {
            return this.status !== "";
        },
    },
    mounted() {
        window.addEventListener("resize", this.handleWindowSizeChange);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleWindowSizeChange);
    },
    methods: {
        async createRoom() {
            if (!this.sessionStore.isLoggedIn) {
                this.status = "Please login first";
            } else {
                try {
                    const response = await fetch(
                        `http://${BACKEND_URL}/createroom`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                userId: this.sessionStore.data.userId,
                            }),
                        }
                    );
                    const data = await response.json();
                    // console.log(data);
                    if (data.error === undefined) {
                        this.lobbyStore.storeLobbyDetails(data);
                        this.$router.push("/room/" + data.roomId);
                    } else {
                        this.status = data.error;
                    }
                } catch (error) {
                    this.status =
                        "Cannot connect to server. Please try again later.";
                }
            }
        },
        joinRoom() {
            if (!this.sessionStore.isLoggedIn) {
                this.status = "Please login first";
            } else {
                this.$router.push("/joinroom");
            }
        },
        toggleMenu() {
            this.isMenuShow = !this.isMenuShow;
        },
        handleWindowSizeChange() {
            this.isSmallScreen = window.innerWidth <= 600;
        },
        howToPlayClick() {
            this.activePage === 1
                ? (this.activePage = 0)
                : (this.activePage = 1);
            this.toggleMenu();
        },
        cardEffectsClick() {
            this.activePage === 2
                ? (this.activePage = 0)
                : (this.activePage = 2);
            this.toggleMenu();
        },
    },
};
</script>

<style scoped>
#logo-image {
    width: 300px;
}
p {
    color: white;
    margin: 0px;
    text-align: center;
}

h1 {
    color: white;
}

.active {
    background-color: #a35bff !important;
}

.home-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;

    width: 100vw;
}

.home-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    width: 60%;
}

.home-main-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}

.home-main-details {
    background-color: #2f3136;
    border-radius: 5px;
    width: 100%;
    padding: 10px;
}

.home-sidebar {
    margin-top: 50px;
    min-width: 120px;
    max-width: 20%;

    position: absolute;
    top: 0;
    left: 0;
}

.p-info {
    align-items: center;
    background-color: #2f3136;
    border-radius: 0px 5px 5px 0px;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #462472;
}

.p-info:hover {
    cursor: pointer;
    filter: brightness(90%);
}

.p-info p {
    color: white;
    font-size: 22px;
}
.flex-container-button {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 8vw;
    width: 100vw;
}

.flex-item-button {
    margin-bottom: 2rem;
}

#invalid-status {
    color: #ff0033;
}
.menu-container {
    display: flex;
    flex-direction: row;

    position: absolute;
    top: -20px;
    left: 0;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}

.menu-icon {
    width: 6vh;
    height: 6vh;
    filter: invert(37%) sepia(90%) saturate(2023%) hue-rotate(240deg)
        brightness(103%) contrast(104%);
    cursor: pointer;

    position: absolute;
    top: 5px;
    right: 100%;
    transform: translate(115%);
    padding-right: 2vh;
    padding-top: 3vh;
    z-index: 80;
    /* padding-bottom: 0.5rem; */
}

.menu-icon:hover {
    filter: invert(19%) sepia(66%) saturate(6926%) hue-rotate(262deg)
        brightness(109%) contrast(110%);
}

.menu-list {
    background: #2c2f32;
    padding: 1vh;
    border-bottom-right-radius: 1vh;

    display: flex;
    flex-direction: row-reverse;
    column-gap: 1vh;

    position: absolute;
    /* margin-top: 8vh; */
    left: 0;
    width: 42vh;
    z-index: 79;

    transition: transform 0.5s ease-out;
}

.menu-list-show {
    transform: translate(0%);
}

.menu-list-hide {
    transform: translate(-100%);
}

.button-menu {
    font-size: 3vh;
    color: white;
    background: #462472;
    border: 0px;
    border-radius: 8px;
    width: 16vh;
    height: 10vh;
    cursor: pointer;
}

.button-menu:hover {
    background: #8222ff;
}

.button-menu:disabled {
    background: #aaaaaa;
}

@media screen and (max-width: 800px) {
    .p-info p {
        color: white;
        font-size: 16px;
    }
}
@media screen and (max-width: 600px) {
    #logo-image {
        width: 200px;
    }
    .home-main{
        width: 90%;
    }
    .p-info p {
        color: white;
        font-size: 16px;
    }
    .menu-icon {
        width: 4vh;
        height: 4vh;
        padding-right: 1vh;
        padding-top: 1.5vh;
    }

    .menu-list {
        padding: 1vh;
        border-bottom-right-radius: 1vh;
        width: 32vh;
    }

    .button-menu {
        font-size: 1.8vh;
        width: 13vh;
        height: 6vh;
    }
}
</style>
