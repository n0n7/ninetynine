<template>
    <div class="debug-button">
        <button @click="setToMyTurn">Set to my turn</button>
        <button @click="nextPlayerTurn">Next player turn</button>
    </div>
    <div class="timer-self" v-if="currentPlayerIdx === myPlayerIdx">
        <p>Your turn!</p>
        <CountDownTimer :timer="timer" />
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
            :currentPlayerIdx="currentPlayerIdx"
            :timer="timer"
        />
    </div>
    <div class="player-list-bar right" v-if="totalPlayer > 4">
        <RoomPlayerListBar
            side="right"
            :playerList="pListRight"
            :currentPlayerIdx="currentPlayerIdx - 4"
            :timer="timer"
        />
    </div>
</template>

<script>
import CountDownTimer from "/src/components/CountDownTimer.vue";
import RoomPlayerListBar from "/src/components/RoomPlayerListBar.vue";
import DropDownMenu from "/src/components/DropDownMenu.vue";
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
        DropDownMenu,
    },
    data() {
        return {
            playTime: 10, // Static number
            timer: null, // Show timer
            timerInterval: null, // timerInternal ref

            // These should put in the props (wait for backend)
            playerList: [
                {
                    userId: "",
                    username: "Nattee",
                    profilePicURL:
                        "https://drive.google.com/uc?export=view&id=1e8M36JuoSgn-eIUTeJdh2-ScqjxV8HJ6",
                    status: "playing",
                },
                {
                    userId: "",
                    username: "TeaChanathip",
                    profilePicURL:
                        "https://drive.google.com/uc?export=view&id=1JktkwqHwryFRH7RqmalhAy0ORIwhkgi0",
                    status: "playing",
                },
                {
                    userId: "",
                    username: "AzusaChan~~~",
                    profilePicURL:
                        "https://drive.google.com/uc?export=view&id=1BtpiBnZpqFtW4o80i6fCGztnnIIWbshY",
                    status: "playing",
                },
                {
                    userId: "",
                    username: "Random Guy 6969",
                    profilePicURL:
                        "https://drive.google.com/uc?export=view&id=1V-C0PODkyrK_U84pGHys0NRWBBen2Ayz",
                    status: "out",
                },
                {
                    userId: "",
                    username: "Mooms",
                    profilePicURL:
                        "https://drive.google.com/uc?export=view&id=1ta4eJyBw-21yxntpb9GmSWxadoInpgLE",
                    status: "playing",
                },
                {
                    userId: "",
                    username: "Random Cat 9696",
                    profilePicURL:
                        "https://drive.google.com/uc?export=view&id=1UuOiIvuI6q6J02aXWjVpmvYrpmatNtHY",
                    status: "out",
                },
                {
                    userId: "",
                    username: "LisaSu",
                    profilePicURL:
                        "https://drive.google.com/uc?export=view&id=1YBfmIcegUTs2oKyvqyKOxiCAW4mlRok1",
                    status: "playing",
                },
                {
                    userId: "",
                    username: "CheesyDoritos",
                    profilePicURL:
                        "https://drive.google.com/uc?export=view&id=19PBu3logUfNweezw723ThssGgPVwfyWC",
                    status: "out",
                },
            ],
            currentPlayerIdx: null,
            myPlayerIdx: 1, // temporary
            currentStackValue: 0,
            direction: 1,
            myCards: [],

            isWindowShow: false,
        };
    },
    methods: {
        setToMyTurn() {
            // for debugging
            this.currentPlayerIdx = this.myPlayerIdx;
        },
        nextPlayerTurn() {
            // for debugging
            if (this.currentPlayerIdx === null) {
                this.currentPlayerIdx = 0;
            } else {
                this.currentPlayerIdx =
                    (this.currentPlayerIdx + 1) % this.totalPlayer;
            }

            while (!this.isGameEnd) {
                if (this.remainPlayerIdx.includes(this.currentPlayerIdx)) {
                    break;
                } else {
                    this.currentPlayerIdx =
                        (this.currentPlayerIdx + 1) % this.totalPlayer;
                }
            }
        },
        countdown() {
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
    },
    computed: {
        totalPlayer() {
            return this.playerList.length;
        },
        isMyturn() {
            return this.currentPlayerIdx == this.myPlayerIdx;
        },
        pListLeft() {
            return this.totalPlayer > 4
                ? this.playerList.slice(0, 4)
                : this.totalPlayer;
        },
        pListRight() {
            return this.totalPlayer > 4 ? this.playerList.slice(4) : [];
        },
        remainPlayerIdx() {
            // for debugging
            let p = [];
            for (let i = 0; i < this.totalPlayer; i++) {
                if (this.playerList[i].status === "playing") {
                    p.push(i);
                }
            }
            return p;
        },
        isGameEnd() {
            // for debugging
            return this.remainPlayerIdx.length === 1;
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
    bottom: 0;
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
    top: 50%;
    transform: translate(0, -35%);
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
</style>
