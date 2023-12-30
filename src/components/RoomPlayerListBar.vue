<template>
    <div class="container">
        <div
            :class="'player-bar ' + side"
            v-for="(item, idx) in playerList"
            :key="idx"
        >
            <transition>
                <h2 v-show="isPlayerOut[idx]" v-if="side === 'right'">
                    {{ item.status === "left" ? "Left" : "Out!" }}
                </h2>
            </transition>
            <div :class="getPlayerFrameClass(idx)">
                <transition>
                    <p
                        class="timer"
                        v-if="side === 'right' && idx === currentPlayerIndex"
                    >
                        {{ timer }}
                    </p>
                </transition>
                <img
                    class="profile-pic"
                    :src="item.playerAvatarURL"
                    alt="player"
                    @error="setAvatarToDefault"
                />
                <!-- {{getPlayerFrameClass(idx)}} -->
                <transition>
                    <div
                        class="timer-container"
                        v-if="side === 'left' && idx === currentPlayerIndex"
                    >
                        <p>
                            {{ timer }}
                        </p>
                    </div>
                </transition>
            </div>
            <transition>
                <h2 v-show="isPlayerOut[idx]" v-if="side === 'left'">
                    {{ item.status === "left" ? "Left" : "Out!" }}
                </h2>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        side: {
            type: String,
            default: "left",
        },
        playerList: {
            type: Array,
            required: true,
        },
        currentPlayerIndex: {
            type: Number,
            default: null,
        },
        timer: {
            type: Number,
            default: null,
        },
    },
    methods: {
        getPlayerFrameClass(idx) {
            let classes = "player-frame " + this.side + " ";
            if (this.isPlayerOut[idx]) {
                classes = classes + "out ";
            } else if (idx === this.currentPlayerIndex) {
                classes = classes + "highlighted";
            }
            return classes;
        },
        setAvatarToDefault() {
            event.target.src = "/default_profile_icon.png";
        },
    },
    computed: {
        isPlayerOut() {
            return this.playerList.map((item) => item.status !== "playing");
        },
    },
};
</script>

<style scoped>
.container {
    color: white;
    display: flex;
    flex-direction: column;
    row-gap: 2vh;

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}

.player-bar {
    display: flex;
    flex-direction: row;
    column-gap: 0.5rem;
}

.player-bar.right {
    justify-content: flex-end;
}

.player-frame {
    display: flex;
    flex-direction: row;
    align-content: center;

    background: #a35bff;
    width: 14vh;
    transition: width 0.5s, background-color 0.5s ease;
}

.player-frame.left {
    border-top-right-radius: 1vh;
    border-bottom-right-radius: 1vh;
}

.player-frame.right {
    border-top-left-radius: 1vh;
    border-bottom-left-radius: 1vh;
    justify-content: flex-end;
}

.out {
    background: #2c2f32;
}

.highlighted {
    width: 22vh;
    transition: width 0.5s ease;
}

.profile-pic {
    width: 10vh;
    height: 10vh;

    border-radius: 50%;
    margin: 1vh 2vh;
    /* border: 1px solid #8222ff; */
}

h2 {
    font-size: 3vh;
    padding: 0;
    margin: auto;
    vertical-align: middle;
}

.timer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%; /* or any specific height */
    width: 30%;
}

.timer-container p {
    font-size: 5vh;
    padding: 0;
    margin: 0;
    color: white;
    text-align: center;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
