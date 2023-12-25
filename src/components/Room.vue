<template>
    <p
        style="
            color: white;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
        "
    >
        userId: {{ userId }} | myPlayerIdx: {{ myPlayerIndex }}
    </p>
    <div class="debug-button">
        <button @click="setGameStatus('ended')">set status "ended"</button>
        <button @click="toggleError">Toggle Error</button>
    </div>

    <div v-if="errorMessage.length != 0" class="game-error">
        <h2 style="text-align: center; font-size: 8vw; margin-bottom: 0">
            Error :\
        </h2>
        <p style="text-align: center; font-size: 4vw; margin-top: 0">
            {{ errorMessage }}
        </p>
    </div>
    <div v-else-if="gameStatus == 'ended'">
        <GameResult :playerRankings="playerRankings" />
    </div>
    <div
        v-else-if="gameStatus == 'playing'"
        @contextmenu.prevent="disableContextMenu"
        class="game-playing-container"
    >
        <transition>
            <div
                class="timer-self"
                v-if="
                    receivedData.gameData.currentPlayerIndex === myPlayerIndex
                "
            >
                <p>Your turn!</p>
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
        <transition>
            <div
                class="player-card"
                v-if="gameStatus == 'playing'"
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
        </transition>
        <transition>
            <p class="warning" v-if="showWarning">{{ warningMessage }}</p>
        </transition>
    </div>
    <div v-else>
        <p style="color: white; text-align: center; font-size: 6vw">
            Invalid Game Status
        </p>
    </div>
</template>

<script>
import CountDownTimer from "/src/components/CountDownTimer.vue";
import RoomPlayerListBar from "/src/components/RoomPlayerListBar.vue";
import DropDownMenu from "/src/components/DropDownMenu.vue";
import ConfirmWindow from "/src/components/ConfirmWindow.vue";
import AllCard from "/src/components/AllCard.vue";
import GameResult from "/src/components/GameResult.vue";

export default {
    props: {
        roomId: {
            type: String,
            required: false,
        },
        connection: {
            type: Object,
            required: false,
        },
        userId: {
            type: String,
            required: true,
        },
        receivedData: {
            type: Object,
            required: true,
        },
    },
    components: {
        RoomPlayerListBar,
        CountDownTimer,
        ConfirmWindow,
        DropDownMenu,
        AllCard,
        GameResult,
    },
    data() {
        return {
            playTime: 30,
            timer: 30,
            timerInterval: null, // timerInternal ref

            isWindowShow: false,

            showWarning: false,
            warningMessage: "",
            warningTimeOut: null,

            myPlayerIndex: null,
            allowPlay: false,

            playerRankings: [],
            remainPlayer: null,

            remainPlayerIdx: [], // for debugging
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
        errorMessage() {
            return this.receivedData.error;
        },
        gameStatus() {
            return this.receivedData.gameData.status;
        },
        totalPlayer() {
            return this.players.length;
        },
        isMyturn() {
            return this.currentPlayerIndex == this.myPlayerIndex;
        },
        pListLeft() {
            return this.totalPlayer > 4
                ? this.players.slice(0, 4)
                : this.players;
        },
        pListRight() {
            return this.totalPlayer > 4 ? this.players.slice(4) : [];
        },
        isGameEnd() {
            return this.gameStatus == "ended";
        },
    },
    methods: {
        toggleError() {
            // for debugging
            if (this.errorMessage.length != 0) {
                this.receivedData.error = "";
            } else {
                this.receivedData.error = "test error message";
            }
        },
        setGameStatus(newStatus) {
            // for debugging
            this.receivedData.gameData.status = newStatus;
        },
        updateRemainPlayerIdx(value) {
            // for debugging
            let p = [];
            for (let i = 0; i < this.totalPlayer; i++) {
                if (value[i].status === "playing") {
                    p.push(i);
                }
            }
            this.remainPlayerIdx = p;
        },

        disableContextMenu(event) {
            // Prevent the default right-click context menu
            event.preventDefault();
        },
        toggleWindow() {
            this.isWindowShow = !this.isWindowShow;
        },
        countdown() {
            this.timer = this.playTime;
            this.timerInterval = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                }
            }, 1000);
        },

        updatePlayerRanking(value) {
            for (const player of value) {
                if (player.status === "out") {
                    if (
                        this.playerRankings.find(
                            ({ playerId }) => playerId === player.playerId
                        ) === undefined
                    ) {
                        this.playerRankings.push(player);
                        break;
                    }
                }
            }

            if (this.remainPlayer == 1) {
                const winner = value.find(({ status }) => status === "playing");
                this.playerRankings.push(winner);
            }
        },
        updateRemainPlayer(value) {
            let remainPlayer = 0;
            for (const player of value) {
                if (player.status === "playing") {
                    remainPlayer++;
                }
            }
            this.remainPlayer = remainPlayer;
        },
        updateMyPlayerIndex(value) {
            for (let i = 0; i < value.length; i++) {
                if (value[i].playerId === this.userId) {
                    this.myPlayerIndex = i;
                    break;
                }
            }
        },
        prepareNextPlayer(value) {
            clearInterval(this.timerInterval);
            this.countdown();

            if (value === this.myPlayerIndex) {
                this.allowPlay = true;
            } else {
                this.allowPlay = false;
            }
        },
        playCard(index) {
            // console.log(value);
            if (!this.isMyturn) {
                this.warningMessage = "Not your turn!";
                clearTimeout(this.warningTimeOut);
                this.showWarning = true;
                this.warningTimeOut = setTimeout(() => {
                    this.showWarning = false;
                }, 1000);
            } else if (this.allowPlay) {
                // Work on mockup data, might change when use with backend
                // this.receivedData.gameData.lastPlayedCard =
                //     this.playerCards[value];
                // this.playerCards.splice(value, 1);
                this.allowPlay = false;
                const playedCard = {
                    action: "play",
                    card: {
                        value: this.playerCards[index].value,
                        isSpecial: this.playerCards[index].isSpecial,
                    },
                };
                this.sendMessage(playedCard);
            } else {
                this.warningMessage = "You played already!";
                clearTimeout(this.warningTimeOut);
                this.showWarning = true;
                this.warningTimeOut = setTimeout(() => {
                    this.showWarning = false;
                }, 1000);
            }
        },
        sendMessage(message) {
            const jsonMes = JSON.stringify(message);
            console.log(jsonMes);
            this.connection.send(jsonMes);
        },
    },
    watch: {
        currentPlayerIndex(value) {
            this.prepareNextPlayer(value);
        },
        players: {
            handler(newValue, oldValue) {
                console.log("players changed");

                // for debugging
                this.updateRemainPlayerIdx(newValue);

                this.updateRemainPlayer(newValue);
                this.updatePlayerRanking(newValue);
                this.updateMyPlayerIndex(newValue);
            },
            deep: true,
        },
    },
    created: function () {
        // for debugging
        this.updateRemainPlayerIdx(this.players);

        this.updateRemainPlayer(this.players);
        this.updateMyPlayerIndex(this.players);

        this.prepareNextPlayer(this.currentPlayerIndex);
    },
};
</script>

<style scoped>
.debug-button {
    position: absolute;
    top: 0;

    display: flex;
    flex-direction: column;
    z-index: 200;

    -webkit-user-select: none;
    /* Safari */
    -ms-user-select: none;
    /* IE 10 and IE 11 */
    user-select: none;
    /* Standard syntax */
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
    font-size: 6vh;
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
    transition: opacity 0.5s ease;
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

.game-waiting {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 3rem;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    -webkit-user-select: none;
    /* Safari */
    -ms-user-select: none;
    /* IE 10 and IE 11 */
    user-select: none;
    /* Standard syntax */
}

.game-waiting p {
    display: inline;
    font-size: 10vh;
    margin: 0;
    color: white;
}

.warning {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    font-size: 6vh;
    margin: 0;
    color: #ff0033;
}
</style>
