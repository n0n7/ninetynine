<template>
    <p
        style="
            color: white;
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 200;
        "
    >
        userId: {{ userId }} | myPlayerIdx: {{ myPlayerIndex }}
    </p>

    <transition>
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
                <p v-if="showCDStart" class="countdown-start">
                    {{ countdownStart }}
                </p>
            </transition>
            <div v-if="!showCDStart">
                <transition>
                    <p v-if="showWarning" class="warning">
                        {{ warningMessage }}
                    </p>
                    <div
                        v-else-if="
                            receivedData.gameData.currentPlayerIndex ===
                            myPlayerIndex
                        "
                        class="timer-self"
                    >
                        <p>Your turn!</p>
                        <CountDownTimer :timer="timer" />
                    </div>
                </transition>
            </div>
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
            <div :v-if="totalPlayer > 4" class="player-list-bar right">
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
                    v-if="gameStatus == 'playing' && !showCDStart"
                    @wheel.prevent
                    @touchmove.prevent
                    @scroll.prevent
                >
                    <AllCard
                        :playerCards="playerCards"
                        :stackValue="stackValue"
                        :lastPlayedCard="lastPlayedCard"
                        :isPlayerOut="isPlayerOut"
                        @playCard="playCard"
                    />
                </div>
            </transition>
        </div>
        <div v-else>
            <p style="color: white; text-align: center; font-size: 6vw">
                Invalid Game Status
            </p>
        </div>
    </transition>
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
            countdownStart: 5,
            showCDStart: true,

            playTime: 30,
            timer: null,
            timerInterval: null, // timerInternal ref

            isWindowShow: false,

            showWarning: false,
            warningMessage: "",
            warningTimeOut: null,

            myPlayerIndex: null,
            allowPlay: false,

            playerRankings: [],
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
        isPlayerOut() {
            return this.players[this.myPlayerIndex].status !== "playing";
        },
    },
    methods: {
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
                } else if (this.isMyturn && this.allowPlay) {
                    this.autoPlay();
                }
            }, 1000);
        },
        updatePlayerRanking(value) {
            for (let player of value) {
                if (player.status === "Out") {
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

            if (this.isGameEnd) {
                let winner = value.find(({ status }) => status === "playing");
                if (
                    winner !== undefined &&
                    this.playerRankings.find(
                        ({ playerId }) => playerId === winner.playerId
                    ) === undefined
                ) {
                    this.playerRankings.push(winner);
                }
            }
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
        sendMessage(message) {
            if (!this.isGameEnd) {
                const jsonMes = JSON.stringify(message);
                console.log(jsonMes);
                this.connection.send(jsonMes);
            }
        },
        isValidPlay(index) {
            return (
                this.playerCards[index].isSpecial ||
                this.playerCards[index].value + this.stackValue <=
                    this.maxStackValue
            );
        },
        playCard(index) {
            if (!this.isMyturn) {
                this.warningMessage = "Not your turn!";
                clearTimeout(this.warningTimeOut);
                this.showWarning = true;
                this.warningTimeOut = setTimeout(() => {
                    this.showWarning = false;
                }, 1000);
            } else if (!this.allowPlay) {
                this.warningMessage = "You already played!";
                clearTimeout(this.warningTimeOut);
                this.showWarning = true;
                this.warningTimeOut = setTimeout(() => {
                    this.showWarning = false;
                }, 1000);
            } else if (!this.isValidPlay(index)) {
                this.warningMessage = "Invalid play!";
                clearTimeout(this.warningTimeOut);
                this.showWarning = true;
                this.warningTimeOut = setTimeout(() => {
                    this.showWarning = false;
                }, 1000);
            } else {
                this.allowPlay = false;
                const playedCard = {
                    action: "play",
                    card: {
                        value: this.playerCards[index].value,
                        isSpecial: this.playerCards[index].isSpecial,
                    },
                };
                this.sendMessage(playedCard);
            }
        },
        autoPlay() {
            let selected = 0;
            for (let i = 0; i < this.playerCards.length; i++) {
                if (this.isValidPlay(i)) {
                    selected = i;
                    break;
                }
            }
            const playedCard = {
                action: "play",
                card: {
                    value: this.playerCards[selected].value,
                    isSpecial: this.playerCards[selected].isSpecial,
                },
            };
            this.allowPlay = false;
            this.sendMessage(playedCard);
        },
        gameStart() {
            this.updateMyPlayerIndex(this.players);
            const inst = setInterval(() => {
                if (this.countdownStart > 0) {
                    this.countdownStart--;
                    if (this.countdownStart == 0) {
                        this.countdownStart = "Start!";
                    }
                } else {
                    this.showCDStart = false;
                    this.prepareNextPlayer(this.currentPlayerIndex);
                    clearInterval(inst);
                }
            }, 1000);
        },
    },
    watch: {
        receivedData: {
            handler(value) {
                this.prepareNextPlayer(value.gameData.currentPlayerIndex);
            },
            deep: true,
        },
        players: {
            handler(newValue, oldValue) {
                console.log("players changed");
                this.updateMyPlayerIndex(newValue);
                this.updatePlayerRanking(newValue);
            },
            deep: true,
        },
    },
    created: function () {
        this.gameStart();
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
    z-index: 99;
}

.player-card {
    /* z-index: 70; */
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

.countdown-start {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 10vw;
    margin: 0;
    color: white;
}
</style>
