<template>
    <div class="lobby-container">
        <h1>Lobby</h1>
        <div class="lobby-id-container">
            <p class="p-gray">Your Room ID:</p>
            <p class="p-white">{{ roomId }}</p>
            <img src="/copy_icon.png" style="width: 40px" alt="copy" />
        </div>
        <div class="lobby-member-list">
            <div
                class="lobby-member-list-container"
                v-for="player in playerList"
                :key="player.name"
            >
                <img
                    src="/default_profile_icon.png"
                    style="width: 40px"
                    alt="user"
                />
                <div class="lobby-member-details">
                    <p class="p-white">{{ player.name }}</p>
                </div>
                <div class="lobby-member-role">
                    <p class="p-gray">Player</p>
                </div>
                <img v-if="player.name === owner" src="/crown_icon.png" style="width: 30px" alt="owner" />
                <img v-else src="/kick_icon.png" style="width: 30px" alt="kick" />
            </div>
            <div
                class="lobby-member-list-container"
                v-for="spectator in spectatorList"
                :key="spectator.name"
            >
                <img
                    src="/default_profile_icon.png"
                    style="width: 40px"
                    alt="user"
                />
                <div class="lobby-member-details">
                    <p class="p-white">{{ spectator.name }}</p>
                </div>
                <div class="lobby-member-role">
                    <p class="p-gray">Spectator</p>
                </div>
                <img src="/kick_icon.png" style="width: 30px" alt="kick" />
            </div>
        </div>
        <div class="flex-container-button">
            <NavButton class="flex-item-button" text="Start" @click="startGame" />
            <NavButton class="flex-item-button" text="Leave Room" @click="leaveRoom" />
        </div>
    </div>
</template>

<script>
import NavButton from "/src/components/NavButton.vue";
export default {
    data() {
        return {
            owner: "Nattee",
            playerList: [
                { name: "Nattee" },
                { name: "TeaChanathip" },
                { name: "AzusaChan~~~" },
                { name: "Random Guy 6969" },
            ],
            spectatorList: [
                { name: "Nattee" },
                { name: "TeaChanathip" },
                { name: "AzusaChan~~~" },
                { name: "Random Guy 6969" },
            ],
        };
    },
    props: {
        roomId: String,
        connection: Object,
    },
    created: function () {
        //this.connection = new WebSocket("ws://localhost:8080/ws/" + this.lobbyId);

        //this.sendJoinAction();
    },
    methods: {
        startGame() {
            // need test if owner then change inProgress in Gameroom to true
            console.log("startGame");
            this.connection.send(
                JSON.stringify({
                    action: "start",
                })
            );

            // no error handling yet
        },
        leaveRoom() {
            // push logic
            this.$router.push("/");
        },
    },
    components: {
        NavButton,
    },
};
</script>

<style>
h1 {
    color: white;
}

.p-white {
    color: white;
}

.p-gray {
    color: gray;
}

.lobby-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.lobby-id-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 400px;
    margin-bottom: 20px;
    background-color: #242526;
    padding: 10px;
    border-radius: 7px;
}

.lobby-member-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 400px;
    height: 300px;
    overflow-y: auto;
    margin-bottom: 30px;
    background-color: #242526;
    border-radius: 7px;
}

.lobby-member-list-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-width: 400px;
    background-color: #242526;
    padding: 10px;
    border-radius: 7px;
    border-color: #a35bff;
}

.lobby-member-details {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 200px;
}

.lobby-member-role {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100px;
}

.flex-container-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 8vw;
    margin-bottom: 50px;
}
</style>
