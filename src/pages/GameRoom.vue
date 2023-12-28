<template>
<<<<<<< Updated upstream
    <transition name="fade">
        <Lobby
            v-if="!inProgress"
            :roomId="roomId"
            :connection="this.connection"
            :receivedData="receivedData"
        />
        <Room
            v-else
||||||| Stash base
    <transition name="fade">
        <Lobby v-if="!inProgress" :roomId="roomId" :connection="null" />
        <Room
            v-else
=======
    <!-- <transition name="fade"> -->
        <Lobby
            v-if="inProgress === false"
>>>>>>> Stashed changes
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
import Lobby from "../components/Lobby.vue"
import Room from "../components/Room.vue"
import { useSessionStore } from "../store/session.js"

export default {
<<<<<<< Updated upstream
    setup() {
        const sessionStore = useSessionStore()
        return {
            sessionStore,
        }
    },
||||||| Stash base
    setup() {
        const sessionStore = useSessionStore();
        return {
            sessionStore,
        };
    },
=======
>>>>>>> Stashed changes
    components: {
        Lobby,
        Room,
    },
    data() {
        return {
            connection: null,
            receivedData: null,
<<<<<<< Updated upstream
        }
||||||| Stash base
        };
=======

            sessionStore: useSessionStore(),
        };
>>>>>>> Stashed changes
    },
    props: {
        roomId: String,
    },
    async created() {
        this.connect()
    },
    methods: {
        async connect() {
            console.log("Starting connection to WebSocket Server")
            this.connection = new WebSocket(
                "ws://localhost:8080/ws/" + this.roomId
            )

            this.connection.onmessage = (event) => {
<<<<<<< Updated upstream
                console.log(event)
||||||| Stash base
                console.log(event);
=======
                // console.log(event);
>>>>>>> Stashed changes
                // console.log(JSON.parse(event.data));
<<<<<<< Updated upstream
                this.receivedData = JSON.parse(event.data)
                console.log(this.receivedData)
            }
||||||| Stash base
                this.receivedData = JSON.parse(event.data);
                console.log(this.receivedData);
            };
=======
                this.receivedData = JSON.parse(event.data);
            };
>>>>>>> Stashed changes

            this.connection.onopen = (event) => {
<<<<<<< Updated upstream
                console.log(event)
                console.log("Successfully connected to the WebSocket server...")
                this.sendJoinAction()
            }
||||||| Stash base
                console.log(event);
                console.log(
                    "Successfully connected to the WebSocket server..."
                );
                this.sendJoinAction();
            };
=======
                // console.log(event);
                console.log(
                    "Successfully connected to the WebSocket server..."
                );
                this.sendJoinAction();
            };
>>>>>>> Stashed changes

            this.connection.onclose = function (event) {
<<<<<<< Updated upstream
                console.log(event)
                console.log("Connection closed")
            }
||||||| Stash base
                console.log(event);
                console.log("Connection closed");
            };
=======
                // console.log(event);
                console.log("Connection closed");
            };
>>>>>>> Stashed changes

            this.connection.onerror = function (event) {
<<<<<<< Updated upstream
                console.log(event)
                console.log("Connection error")
            }
||||||| Stash base
                console.log(event);
                console.log("Connection error");
            };
=======
                // console.log(event);
                console.log("Connection error");
            };
>>>>>>> Stashed changes
        },
        sendJoinAction() {
            let joinData = {
                action: "join",
                userId: null,
                username: null,
                profilePic: "NULL",
            }

            if (this.isLoggedIn) {
                joinData.userId = this.userData.userId
                joinData.username = this.userData.username
                joinData.profilePic = this.userData.profilePic
            } else {
                // guset user
                const rand = this.randomUserId()
                joinData.userId = rand
                joinData.username = "test" + rand
            }

            // Convert the JSON object to a string
            const jsonData = JSON.stringify(joinData)

            // Send the JSON data through the WebSocket connection
<<<<<<< Updated upstream
            console.log(jsonData)
            console.log(this.connection)
            this.connection.send(jsonData)
||||||| Stash base
            console.log(jsonData);
            console.log(this.connection);
            this.connection.send(jsonData);
=======
            // console.log(jsonData);
            this.connection.send(jsonData);
>>>>>>> Stashed changes
        },
        randomUserId() {
            return Math.floor(Math.random() * 1000000000).toString()
        },
    },
    computed: {
        inProgress() {
<<<<<<< Updated upstream
            if (
                this.receivedData === null ||
                this.receivedData.gameData.status === "waiting"
            ) {
                return false
||||||| Stash base
            if (
                this.receivedData === null ||
                this.receivedData.gameData.status === "waiting"
            ) {
                return false;
=======
            if (this.receivedData === null) {
                return null;
            } else if (this.receivedData.gameData.status === "waiting") {
                return false;
>>>>>>> Stashed changes
            } else if (
                this.receivedData.gameData.status === "playing" ||
                this.receivedData.gameData.status === "ended"
            ) {
                return true
            }
        },
        isLoggedIn() {
            return this.sessionStore.getIsLoggedIn
        },
        userData() {
            return this.sessionStore.getData
        },
    },
<<<<<<< Updated upstream
}
||||||| Stash base
};
=======
    beforeRouteLeave(to, from, next) {
        // called when the route that renders this component is about to
        // be navigated away from.
        // has access to `this` component instance.

        //this.connection is your ws
        this.connection.close();
        next();
    },
};
>>>>>>> Stashed changes
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
