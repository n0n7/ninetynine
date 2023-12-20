<template>
    <div class="debug-button">
        <button @click="setToMyTurn">Set to my turn</button>
        <button @click="nextPlayerTurn">Next player turn</button>
        <button @click="toggleError">Toggle Error</button>
        <button @click="sendMessage(playerCards[0])">Send Message</button>
    </div>

    <div v-if="errorMessage.length != 0" class="game-error">
        <h2 style="text-align: center; font-size: 8vw; margin-bottom: 0">
            Error :\
        </h2>
        <p style="text-align: center; font-size: 4vw; margin-top: 0">
            {{ errorMessage }}
        </p>
    </div>
    <div v-else @contextmenu.prevent="disableContextMenu">
        <transition>
            <div
                class="timer-self"
                v-if="
                    receivedData.gameData.currentPlayerIndex === myPlayerIndex
                "
            >
                <p style="font-size: 6vh">Your turn!</p>
                <CountDownTimer :timer="timer" />
            </div>
        </transition>
        <div class="dropdown-menu">
            <DropDownMenu @openWindow="toggleWindow()" />
        </div>
        <div>
            <ConfirmWindow
                :isVisible="isWindowShow"
                @closeWindow="toggleWindow()"
            />
        </div>
        <div class="player-list-bar left">
            <RoomPlayerListBar
                side="left"
                :playerList="pListLeft"
                :currentPlayerIndex="currentPlayerIndex"
                :timer="timer"
            />
        </div>
        <div class="player-list-bar right" :v-if="totalPlayer > 4">
            <RoomPlayerListBar
                side="right"
                :playerList="pListRight"
                :currentPlayerIndex="currentPlayerIndex - 4"
                :timer="timer"
            />
        </div>
        <div
            class="player-card"
            @wheel.prevent
            @touchmove.prevent
            @scroll.prevent
        >
            <AllCard
                :playerCards="playerCards"
                :stackValue="stackValue"
                :maxStackValue="maxStackValue"
                :lastPlayedCard="lastPlayedCard"
                @playCard="playCard"
            />
        </div>
    </div>
</template>

<script>
import CountDownTimer from "/src/components/CountDownTimer.vue";
import RoomPlayerListBar from "/src/components/RoomPlayerListBar.vue";
import DropDownMenu from "/src/components/DropDownMenu.vue";
import ConfirmWindow from "/src/components/ConfirmWindow.vue";
import AllCard from "/src/components/AllCard.vue";

export default {
    props: {
        roomId: {
            type: String,
            required: false,
        },
    },
    components: {
        RoomPlayerListBar,
        CountDownTimer,
        ConfirmWindow,
        DropDownMenu,
        AllCard,
    },
    data() {
        return {
            playTime: 10,
            timer: 9,
            timerInterval: null, // timerInternal ref
            isWindowShow: false,

            connection: null,

            // Mockup data
            myPlayerIndex: 1, // for debugging
            receivedData: {
                error: "",
                action: "game started",
                gameData: {
                    players: [
                        {
                            playerId: "2038983",
                            playerName: "Nattee",
                            playerAvatarURL:
                                "https://drive.google.com/uc?export=view&id=1e8M36JuoSgn-eIUTeJdh2-ScqjxV8HJ6",
                            status: "playing",
                        },
                        {
                            playerId: "2342434",
                            playerName: "TeaChanathip",
                            playerAvatarURL:
                                "https://drive.google.com/uc?export=view&id=1JktkwqHwryFRH7RqmalhAy0ORIwhkgi0",
                            status: "playing",
                        },
                        {
                            playerId: "4534534",
                            playerName: "AzusaChan~~~",
                            playerAvatarURL:
                                "https://drive.google.com/uc?export=view&id=1BtpiBnZpqFtW4o80i6fCGztnnIIWbshY",
                            status: "playing",
                        },
                        {
                            playerId: "5673456",
                            playerName: "Random Guy 6969",
                            playerAvatarURL:
                                "https://drive.google.com/uc?export=view&id=1V-C0PODkyrK_U84pGHys0NRWBBen2Ayz",
                            status: "out",
                        },
                        {
                            playerId: "6776577",
                            playerName: "Mooms",
                            playerAvatarURL:
                                "https://drive.google.com/uc?export=view&id=1ta4eJyBw-21yxntpb9GmSWxadoInpgLE",
                            status: "playing",
                        },
                        {
                            playerId: "5432456",
                            playerName: "Random Cat 9696",
                            playerAvatarURL:
                                "https://drive.google.com/uc?export=view&id=1UuOiIvuI6q6J02aXWjVpmvYrpmatNtHY",
                            status: "out",
                        },
                        {
                            playerId: "6524345",
                            playerName: "LisaSu",
                            playerAvatarURL:
                                "https://drive.google.com/uc?export=view&id=1YBfmIcegUTs2oKyvqyKOxiCAW4mlRok1",
                            status: "playing",
                        },
                        {
                            playerId: "3562343",
                            playerName: "CheesyDoritos",
                            playerAvatarURL:
                                "https://drive.google.com/uc?export=view&id=19PBu3logUfNweezw723ThssGgPVwfyWC",
                            status: "out",
                        },
                    ],
                    playerCards: [
                        {
                            value: 2,
                            isSpecial: false,
                        },
                        {
                            value: -9,
                            isSpecial: false,
                        },
                        {
                            value: 2,
                            isSpecial: true,
                        },
                    ],
                    status: "playing",
                    currentPlayerIndex: 0,
                    currentDirection: 1,
                    stackValue: 0,
                    maxStackValue: 99,
                    lastPlayedCard: {
                        value: -1,
                        isSpecial: true,
                    },
                },
            },
        };
    },
    computed: {
        players() {
            return this.receivedData.gameData.players;
        },
        playerCards() {
            return this.receivedData.gameData.playerCards;
        },
        status() {
            return this.receivedData.gameData.status;
        },
        currentPlayerIndex() {
            return this.receivedData.gameData.currentPlayerIndex;
        },
        currentDirection() {
            return this.receivedData.gameData.currentDirection;
        },
        stackValue() {
            return this.receivedData.gameData.stackValue;
        },
        maxStackValue() {
            return this.receivedData.gameData.maxStackValue;
        },
        lastPlayedCard() {
            return this.receivedData.gameData.lastPlayedCard;
        },

        totalPlayer() {
            return this.players.length;
        },
        isMyturn() {
            // temporary
            return this.currentPlayerIndex == this.myPlayerIndex;
        },
        pListLeft() {
            let x =
                this.totalPlayer > 4 ? this.players.slice(0, 4) : this.players;
            // console.log(x);
            return x;
        },
        pListRight() {
            return this.totalPlayer > 4 ? this.players.slice(4) : [];
        },
        remainPlayerIdx() {
            // for debugging
            let p = [];
            for (let i = 0; i < this.totalPlayer; i++) {
                if (this.players[i].status === "playing") {
                    p.push(i);
                }
            }
            return p;
        },
        errorMessage() {
            return this.receivedData.error;
        },
        isGameEnd() {
            // for debugging
            return this.remainPlayerIdx.length === 1;
        },
    },
    methods: {
        setToMyTurn() {
            // for debugging
            this.receivedData.gameData.currentPlayerIndex = this.myPlayerIndex;
        },
        nextPlayerTurn() {
            // for debugging
            if (this.currentPlayerIndex === null) {
                this.receivedData.gameData.currentPlayerIndex = 0;
            } else {
                this.receivedData.gameData.currentPlayerIndex =
                    (this.currentPlayerIndex + 1) % this.totalPlayer;
            }

            while (!this.isGameEnd) {
                if (this.remainPlayerIdx.includes(this.currentPlayerIndex)) {
                    break;
                } else {
                    this.receivedData.gameData.currentPlayerIndex =
                        (this.currentPlayerIndex + 1) % this.totalPlayer;
                }
            }
        },
        toggleError() {
            // for debugging
            if (this.errorMessage.length != 0) {
                this.receivedData.error = "";
            } else {
                this.receivedData.error = "test error message";
            }
        },
        disableContextMenu(event) {
            // Prevent the default right-click context menu
            event.preventDefault();
        },
        countdown() {
            this.timer = this.playTime - 1;
            this.timerInterval = setInterval(() => {
                this.timer--;
                if (this.timer < 0) {
                    this.nextPlayerTurn();
                }
            }, this.playTime * 100);
        },
        toggleWindow() {
            this.isWindowShow = !this.isWindowShow;
        },
        playCard(value) {
            // Work on mockup data, might change when use with backend
            // console.log(value);
            this.receivedData.gameData.lastPlayedCard = this.playerCards[value];
            this.playerCards.splice(value, 1);
        },
        sendMessage(message) {
            console.log(JSON.stringify(message));

            this.connection.send(JSON.stringify(message));
        },
    },
    watch: {
        currentPlayerIndex(value) {
            clearInterval(this.timerInterval);
            this.countdown();
        },
    },
    created: function () {
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
    },
};
</script>

<style scoped>
.debug-button {
    position: absolute;
    bottom: 0;

    display: flex;
    flex-direction: column;
    z-index: 200;
}

.timer-self {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 0.5rem;

    position: absolute;
    left: 50%;
    transform: translate(-50%);
}

.timer-self p {
    display: inline;
    font-size: 3rem;
    margin: 0;
    color: white;
}

.player-list-bar {
    position: fixed;
    /* top: 0; */
    /* margin:auto; */
    transform: translateY(calc(20px + 12vh));
}

.player-list-bar.right {
    right: 0%;
}

.dropdown-menu {
    display: flex;
    flex-direction: column;
    align-items: right;
    justify-content: center;

    position: absolute;
    right: 0%;
    z-index: 100;
}

.player-card {
    /* z-index: 70; */
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.game-error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    color: white;
}
</style>
