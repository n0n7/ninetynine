<script setup>
import Lobby from "../components/Lobby.vue";
import Room from "../components/Room.vue";
</script>

<template>
    <div>
        <transition>
            <Lobby v-if="!inProgress" :roomId="roomId" :connection="null" />
            <Room
                v-else
                :roomId="roomId"
                :connection="connection"
                :userId="userId"
                :receivedData="receivedData"
            />
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // inProgress: false,
            connection: null,
            userId: null,
            receivedData: null,
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
                "ws://localhost:8080/ws/000000000000"
            );

            this.connection.onmessage = (event) => {
                console.log(event);
                // console.log(JSON.parse(event.data));
                this.receivedData = JSON.parse(event.data);
            };

            this.connection.onopen = (event) => {
                console.log(event);
                console.log(
                    "Successfully connected to the WebSocket server..."
                );
                this.sendJoinAction();
            };

            this.connection.onclose = function (event) {
                console.log(event);
                console.log("Connection closed");
            };

            this.connection.onerror = function (event) {
                console.log(event);
                console.log("Connection error");
            };
        },
        sendJoinAction() {
            // test data
            const rand = this.randomUserId();
            this.userId = rand;
            const joinData = {
                action: "join",
                userId: rand,
                username: "test" + rand,
                profilePics: "profilePicUrl",
            };

            // Convert the JSON object to a string
            const jsonData = JSON.stringify(joinData);

            // Send the JSON data through the WebSocket connection
            console.log(jsonData);
            console.log(this.connection);
            this.connection.send(jsonData);
        },
        randomUserId() {
            return Math.floor(Math.random() * 1000000000).toString();
        },
    },
    computed: {
        inProgress() {
            if (
                this.receivedData === null ||
                this.receivedData.gameData.status === "waiting"
            ) {
                return false;
            } else if (
                this.receivedData.gameData.status === "playing" ||
                this.receivedData.gameData.status === "ended"
            ) {
                return true;
            }
        },
    },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
