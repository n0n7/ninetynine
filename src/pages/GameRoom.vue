<template>
    <!-- <transition name="fade"> -->
    <Lobby
        v-if="inProgress === false"
        :roomId="roomId"
        :connection="connection"
        :userId="userData.userId"
        :receivedData="receivedData"
    />
    <Room
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
import Room from "../components/Room.vue";
import { useSessionStore } from "../store/session.js";

export default {
    components: {
        Lobby,
        Room,
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
                // console.log(JSON.parse(event.data));
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
            } else {
                // guset user
                const rand = this.randomUserId();
                joinData.userId = rand;
                joinData.username = "test" + rand;
            }

            // Convert the JSON object to a string
            const jsonData = JSON.stringify(joinData);

            // Send the JSON data through the WebSocket connection
            // console.log(jsonData);
            this.connection.send(jsonData);
        },
        randomUserId() {
            return Math.floor(Math.random() * 1000000000).toString();
        },
    },
    computed: {
        inProgress() {
            if (this.receivedData === null) {
                return null;
            } else if (this.receivedData.gameData.status === "waiting") {
                return false;
            } else if (
                this.receivedData.gameData.status === "playing" ||
                this.receivedData.gameData.status === "ended"
            ) {
                return true;
            }
        },
        isLoggedIn() {
            return this.sessionStore.getIsLoggedIn;
        },
        userData() {
            return this.sessionStore.getData;
        },
    },
    beforeRouteLeave(to, from, next) {
        // called when the route that renders this component is about to
        // be navigated away from.
        // has access to `this` component instance.

        //this.connection is your ws
        this.connection.close();
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
