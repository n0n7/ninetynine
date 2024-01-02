<template>
    <div class="home-container">
        <div class="home-sidebar">
            <div
                class="p-info"
                :class="{ active: activePage == 1 }"
                @click.prevent="activePage===1 ? activePage=0 : activePage = 1"
            >
                <p>How to Play?</p>
            </div>
            <div
                class="p-info"
                :class="{ active: activePage == 2 }"
                @click.prevent="activePage===2 ? activePage=0 : activePage = 2"
            >
                <p>Card Effects</p>
            </div>
        </div>
        <div class="home-main">
            <img v-if="activePage == 0" src="/99.png" style="width: 300px" />
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

const BACKEND_URL = process.env.VITE_API_URL;

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
        };
    },
    computed: {
        isError() {
            return this.status !== "";
        },
    },
    methods: {
        async createRoom() {
            if (!this.sessionStore.isLoggedIn) {
                this.status = "Please login first";
            } else {
                try {
                    const response = await fetch(
                        BACKEND_URL + "/createroom",
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
                    console.log(data);
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
            }
            else {
                this.$router.push("/joinroom");
            }
        },
    },
};
</script>

<style scoped>
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
    margin-top: 30px;
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
    font-size: 24px;
}
.flex-container-button {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 8vw;
}

.flex-item-button {
    margin-bottom: 2rem;
}

#invalid-status {
    color: #ff0033;
}

@media screen and (max-width: 900px) {
    .p-info p {
    color: white;
    font-size: 16px;
}
}
</style>
