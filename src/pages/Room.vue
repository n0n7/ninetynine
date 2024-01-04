<template>
    <!-- <transition name="fade"> -->
    <Lobby
        v-if="inProgress === false"
        :roomId="roomId"
        :connection="connection"
        :userId="userData.userId"
        :receivedData="receivedData"
    />
    <GameRoom
        v-else-if="inProgress === true"
        :roomId="roomId"
        :connection="connection"
        :userId="userData.userId"
        :receivedData="receivedData"
    />
    <!-- </transition> -->
</template>

<script>
import Lobby from "../components/Lobby.vue";
import GameRoom from "../components/GameRoom.vue";
import { useSessionStore } from "../store/session.js";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default {
    components: {
        Lobby,
        GameRoom,
    },
    data() {
        return {
            connection: null,
            receivedData: null,

            sessionStore: useSessionStore(),
        };
    },
    props: {
        roomId: String,
    },
    async created() {
        this.connect();
    },
    methods: {
        async connect() {
            console.log("Starting connection to WebSocket Server");
            this.connection = new WebSocket(
                "ws://localhost:8080/ws/" + this.roomId
            );

            this.connection.onmessage = (event) => {
                // console.log(event);
                console.log(JSON.parse(event.data));
                this.receivedData = JSON.parse(event.data);
            };

            this.connection.onopen = (event) => {
                // console.log(event);
                console.log(
                    "Successfully connected to the WebSocket server..."
                );
                this.sendJoinAction();
            };

            this.connection.onclose = function (event) {
                // console.log(event);
                console.log("Connection closed");
            };

            this.connection.onerror = function (event) {
                // console.log(event);
                console.log("Connection error");
            };
        },
        sendJoinAction() {
            let joinData = {
                action: "join",
                userId: null,
                username: null,
                profilePic: "NULL",
            };

            if (this.isLoggedIn) {
                joinData.userId = this.userData.userId;
                joinData.username = this.userData.username;
                joinData.profilePic = this.userData.profilePic;
            }

            // Convert the JSON object to a string
            const jsonData = JSON.stringify(joinData);

            // Send the JSON data through the WebSocket connection
            // console.log(jsonData);
            this.connection.send(jsonData);
        },
        closeConnection() {
            this.connection.close();
        },
    },
    computed: {
        inProgress() {
            if (this.receivedData === null) {
                return null;
            } else if (this.receivedData.gameData.status === "waiting") {
                return false;
            } else if (
                (this.receivedData.gameData.status === "playing" ||
                    this.receivedData.gameData.status === "ended") &&
                this.receivedData.error === ""
            ) {
                return true;
            }
            return false;
        },
        isLoggedIn() {
            return this.sessionStore.getIsLoggedIn;
        },
        userData() {
            return this.sessionStore.getData;
        },
    },
    mounted() {
        window.addEventListener("beforeunload", this.closeConnection);
    },
    beforeDestroy() {
        window.removeEventListener("beforeunload", this.closeConnection);
    },
    beforeRouteLeave(to, from, next) {
        this.closeConnection();
        next();
    },
    
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
