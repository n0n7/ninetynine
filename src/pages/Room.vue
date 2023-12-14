<template>
    <div class="debug-button">
        <button @click="setToMyTurn">Set to my turn</button>
        <button @click="nextPlayerTurn">Next player turn</button>
    </div>
    <div class="timer-self" v-show="true">
        <p>
            {{
                currentPlayerIdx === null
                    ? "Not started yet"
                    : playerList[currentPlayerIdx].name
            }}
        </p>
        <CountDownTimer :timer="timer" />
    </div>
    <div class="player-list-bar-right">
        <RoomPlayerListBar
            :playerList="playerList"
            :currentPlayerIdx="currentPlayerIdx"
        />
    </div>
</template>

<script>
import CountDownTimer from "/src/components/CountDownTimer.vue";
import RoomPlayerListBar from "/src/components/RoomPlayerListBar.vue";
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
    },
    data() {
        return {
            playTime: 10, // Static number
            timer: null, // Show timer
            timerInterval: null, // timerInternal ref

            // These should put in the props (wait for backend)
            playerList: [
                { name: "Nattee" },
                { name: "TeaChanathip" },
                { name: "AzusaChan~~~" },
                { name: "Random Guy 6969" },
            ], // A player object may contains profile picture, name, etc
            currentPlayerIdx: null, // Index of the current player
            myPlayerIdx: 1, // Index of this player
            direction: 1,
        };
    },
    methods: {
        setToMyTurn() {
            this.currentPlayerIdx = this.myPlayerIdx;
        },
        nextPlayerTurn() {
            if (this.currentPlayerIdx === null) {
                this.currentPlayerIdx = 0;
            } else {
                this.currentPlayerIdx =
                    (this.currentPlayerIdx + this.direction) % this.totalPlayer;
            }
        },
        countdown() {
            this.timerInterval = setInterval(() => {
                this.timer--;
                if (this.timer < 0) {
                    this.currentPlayerIdx =
                        (this.currentPlayerIdx + this.direction) %
                        this.totalPlayer;
                }
            }, this.playTime * 100);
        },
    },
    computed: {
        totalPlayer() {
            return this.playerList.length;
        },
        isMyturn() {
            return this.currentPlayerIdx == this.myPlayerIdx;
        },
    },
    watch: {
        currentPlayerIdx(value) {
            clearInterval(this.timerInterval);
            // if(value === this.myPlayerIdx){
            this.timer = this.playTime - 1;
            this.countdown();
            // }
        },
    },
};
</script>

<style scoped>
.debug-button {
    position: absolute;
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

.player-list-bar-right {
    position: absolute;
    top: 50vh;
}
</style>
