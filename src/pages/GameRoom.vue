<script setup>
import Lobby from "../components/Lobby.vue";
import Room from "../components/Room.vue";
</script>

<template>
    <button @click="toggleProgress" style="position: absolute; bottom: 0">
        Toggle Progress
    </button>
    <div>
        <Lobby v-if="!inProgress" :roomId="roomId" :connection="null" />
        <Room
            v-else
            :roomId="roomId"
            :connection="connection"
            :userId="userId"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            inProgress: false,
            connection: null,
            userId: null,
        };
    },
    props: {
        roomId: String,
    },
    async created() {
        this.connect();
        setTimeout(() => {
            this.sendJoinAction();
        }, 1000);
    },
    methods: {
        async connect() {
            console.log("Starting connection to WebSocket Server");
            this.connection = new WebSocket(
                "ws://localhost:8080/ws/000000000000"
            );

            this.connection.onmessage = function (event) {
                console.log(event);
                console.log(JSON.parse(event.data));
            };

            this.connection.onopen = function (event) {
                console.log(event);
                console.log(
                    "Successfully connected to the WebSocket server..."
                );
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
            // const joinData = {
            //     action: "join",
            //     userId: "000000000",
            //     username: "yourUsername",
            //     profilePics: "profilePicUrl"
            // };
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
        toggleProgress() {
            this.inProgress = !this.inProgress;
        },
        randomUserId() {
            return Math.floor(Math.random() * 1000000000).toString();
        },
    },
};
</script>
