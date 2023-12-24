<script setup>
import Lobby from "../components/Lobby.vue";
import Room from "../components/Room.vue";
</script>

<template>
    <div>
        <Lobby v-if="!inProgress" :roomId="roomId" :connection="null" />
        <Room v-else :roomId="roomId" :connection="null" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            inProgress: false,
            connection: null,
        };
    },
    props: {
        roomId: String,
    },
    created() {
        // this.connect();
    },
    methods: {
        async connect() {
            console.log("Starting connection to WebSocket Server");
            this.connection = new WebSocket("ws://localhost:8080/ws/000000000000");

            this.connection.onmessage = function (event) {
                console.log(event);
                // console.log(JSON.parse(event.data));
            };

            this.connection.onopen = function (event) {
                console.log(event);
                console.log("Successfully connected to the WebSocket server...");
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
            const joinData = {
                action: "join",
                userId: "000000000",       
                username: "yourUsername",    
                profilePics: "profilePicUrl" 
            };

            // Convert the JSON object to a string
            const jsonData = JSON.stringify(joinData);

            // Send the JSON data through the WebSocket connection
            this.connection.send(jsonData);
        },
    },
};
</script>
