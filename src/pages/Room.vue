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
                    : playerList[currentPlayerIdx].username
            }}
        </p>
        <CountDownTimer :timer="timer" />
    </div>
    <div class="dropdown-menu">
        <img class="menu-icon" @click="toggleMenu()" src="/menu.svg" />
        <div
            :class="
                isMenuShow
                    ? 'menu-list menu-list-show'
                    : 'menu-list menu-list-hide'
            "
        >
            <button class="button-menu">How to Play?</button>
            <button class="button-menu" @click="toggleWindow()">Leave</button>
        </div>
    </div>
    <div>
        <ConfirmWindow :isVisible="isWindowShow" @close="toggleWindow()" />
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
import ConfirmWindow from "/src/components/ConfirmWindow.vue";
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
    },
    data() {
        return {
            playTime: 10, // Static number
            timer: null, // Show timer
            timerInterval: null, // timerInternal ref

            // These should put in the props (wait for backend)
            playerList: [
                { userId: "", username: "Nattee", profilePicURL: "" },
                { userId: "", username: "TeaChanathip", profilePicURL: "" },
                { userId: "", username: "AzusaChan~~~", profilePicURL: "" },
                { userId: "", username: "Random Guy 6969", profilePicURL: "" },
            ],
            currentPlayerIdx: null,
            myPlayerIdx: 1, // temporary
            currentStackValue: 0,
            direction: 1,
            myCards: [],

            isMenuShow: false,
            isWindowShow: false,
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
        toggleMenu() {
            this.isMenuShow = !this.isMenuShow;
        },
        toggleWindow() {
            this.isWindowShow = !this.isWindowShow;
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

.dropdown-menu {
    display: flex;
    flex-direction: column;
    align-items: right;
    justify-content: center;

    position: absolute;
    right: 0%;
}

.menu-icon {
    width: 3rem;
    height: 3rem;
    filter: invert(37%) sepia(90%) saturate(2023%) hue-rotate(240deg)
        brightness(103%) contrast(104%);
    cursor: pointer;

    position: relative;
    left: 100%;
    transform: translate(calc(-100%));
    padding-right: 1rem;
    padding-bottom: 0.5rem;
}

.menu-icon:hover {
    filter: invert(19%) sepia(66%) saturate(6926%) hue-rotate(262deg)
        brightness(109%) contrast(110%);
}

.menu-list {
    background: #4e4f50;
    padding: 1rem;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;

    display: flex;
    flex-direction: row;
    column-gap: 1rem;

    position: fixed;
    top: 12.5rem;
    right: 0;

    transition: transform 0.5s ease-out;
}

.menu-list-show {
    transform: translate(0%);
}

.menu-list-hide {
    transform: translate(100%);
}

.button-menu {
    font-size: 1.5rem;
    color: white;
    background: #a35bff;
    border: 0px;
    border-radius: 8px;
    width: 8rem;
    height: 5rem;
    cursor: pointer;
}

.button-menu:hover {
    background: #8222ff;
}
</style>
