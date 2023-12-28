<template>
    <div class="lobby-container">
        <h1>Lobby</h1>
        <div class="lobby-id-container">
            <p class="p-gray">Your Room ID:</p>
            <p class="p-white">{{ roomId }}</p>
            <img
                class="copy-icon"
                src="/copy_icon2.png"
                style="width: 40px"
                alt="copy"
                @click="copyRoomId"
            />
        </div>
        <div class="lobby-member-list">
            <div class="lobby-member-list-container">
                <img
                    :src="owner.playerAvatarURL"
                    class="profile-icon"
                    alt="user"
                    @error="setAvatarToDefault"
                />
                <div class="lobby-member-details">
                    <p :class="getNameClass(owner.playerId)">
                        {{ owner.playerName }}
                    </p>
                </div>
                <div class="lobby-member-role">
                    <p class="p-gray">Owner</p>
                </div>
                <img src="/crown_icon.png" style="width: 30px" alt="owner" />
            </div>
            <div
                class="lobby-member-list-container"
                v-for="(player, index) in playerList"
                :key="player.playerId"
            >
                <img
                    :src="player.playerAvatarURL"
                    class="profile-icon"
                    alt="user"
                    @error="setAvatarToDefault"
                />
                <div class="lobby-member-details">
                    <p :class="getNameClass(playerList[index].playerId)">
                        {{ player.playerName }}
                    </p>
                </div>
                <div class="lobby-member-role">
                    <p class="p-gray">Player</p>
                </div>
                <img
                    src="/kick_icon.png"
                    style="width: 30px; opacity: 0"
                    alt="kick"
                    :draggable="false"
                />
            </div>
            <div
                class="lobby-member-list-container"
                v-for="(spectator, index) in spectatorList"
                :key="spectator.spectatorId"
            >
                <img
                    :src="spectator.spectatorAvatarURL"
                    class="profile-icon"
                    alt="user"
                    @error="setAvatarToDefault"
                />
                <div class="lobby-member-details">
                    <p :class="getNameClass(spectatorList[index].spectatorId)">
                        {{ spectator.spectatorName }}
                    </p>
                </div>
                <div class="lobby-member-role">
                    <p class="p-gray">Spectator</p>
                </div>
                <img
                    src="/kick_icon.png"
                    style="width: 30px; opacity: 0"
                    alt="kick"
                    :draggable="false"
                />
            </div>
        </div>
        <div class="flex-container-button">
            <NavButton
                class="flex-item-button"
                text="Start"
                @click="startGame"
                :enable="isOwner"
            />
            <NavButton
                class="flex-item-button"
                text="Leave Room"
                @click="leaveRoom"
            />
        </div>
    </div>
    <transition name="fade">
        <div class="clipboard-message" v-if="showClipboardMessage">
            <p>Copied to clipboard!</p>
        </div>
    </transition>
</template>

<script>
import NavButton from "/src/components/NavButton.vue";
import { useLobbyStore } from "../store/lobbyStore.js";

export default {
    data() {
        return {
            owner: null,
            playerList: [],
            spectatorList: [
                {
                    spectatorId: "spec1",
                    spectatorName: "testSpectator1",
                    spectatorAvatarURL: "/default_profile_icon.png",
                },
                {
                    spectatorId: "spec2",
                    spectatorName: "testSpectator2",
                    spectatorAvatarURL: "/default_profile_icon.png",
                },
            ],

            lobbyStore: useLobbyStore(),
            showClipboardMessage: false,
            messageTimeOut: null,
        };
    },
    components: {
        NavButton,
    },
    props: {
        roomId: String,
        connection: Object,
        userId: String,
        receivedData: Object,
    },
    computed: {
        playerList() {
            return this.receivedData.gameData.players
        },    
    },
    methods: {
        startGame() {
            if (this.isOwner) {
                const action = {
                    action: "start",
                };
                this.connection.send(JSON.stringify(action));
                console.log("startGame");
            }
        },
        leaveRoom() {
            // push logic
            this.$router.push("/")
        },
        setAvatarToDefault(event) {
            event.target.src = "/default_profile_icon.png";
        },
        updateOwner() {
            const players = this.receivedData.gameData.players;
            this.owner = players.find(
                ({ playerId }) =>
                    playerId === this.lobbyStore.getLobbyDetails.ownerId
            );
            console.log(this.owner);
        },
        updatePlayer() {
            const players = this.receivedData.gameData.players;
            this.playerList = players.filter(
                ({ playerId }) =>
                    playerId !== this.lobbyStore.getLobbyDetails.ownerId
            );
            console.log(this.playerList);
        },
        updateSpectator() {
            if (this.receivedData.gameData.spectators !== undefined) {
                this.spectatorList = this.receivedData.gameData.spectators;
                console.log(this.spectatorList);
            } else {
                console.log("spectatorList is undefined");
            }
        },
        getNameClass(playerId) {
            if (this.userId === playerId) {
                return "p-highlighted";
            } else {
                return "p-white";
            }
        },
        copyRoomId() {
            navigator.clipboard.writeText(this.roomId);
            this.showClipboardMessage = true;
            clearTimeout(this.messageTimeOut);
            this.messageTimeOut = setTimeout(() => {
                this.showClipboardMessage = false;
            }, 2000);
        },
    },
    computed: {
        isOwner() {
            return this.userId === this.lobbyStore.getLobbyDetails.ownerId;
        },
    },
    watch: {
        receivedData() {
            this.updateOwner();
            this.updatePlayer();
            this.updateSpectator();
        },
    },
    created() {
        this.updateOwner();
        this.updatePlayer();
        this.updateSpectator();
    },
}
</script>

<style>
h1 {
    color: white;
    font-size: 3.5rem;
    margin-top: 0;
    margin-bottom: 30px;
    text-align: center;
}

.p-white {
    color: white;
}

.p-highlighted {
    color: #a36aed;
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
    padding: 5px 10px;
    border-radius: 7px;
}

.lobby-member-list {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
    min-width: 400px;
    height: 33vh;
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
    padding: 5px 10px;
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
    /* margin-bottom: 50px; */
}

.profile-icon {
    width: 45px;
    height: 45px;
    border-radius: 50%;
}

.copy-icon {
    cursor: copy;
    filter: invert(36%) sepia(60%) saturate(1359%) hue-rotate(235deg)
        brightness(110%) contrast(108%);
}

.copy-icon:hover {
    filter: invert(20%) sepia(84%) saturate(5503%) hue-rotate(263deg)
        brightness(100%) contrast(106%);
}

.clipboard-message {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    background: #4e4f50;
    border-radius: 8px;
    margin-top: 1rem;
}

.clipboard-message p {
    color: white;
    font-size: 18px;
    margin: 0.5rem 1rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
