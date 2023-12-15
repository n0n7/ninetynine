<template>
    <div class="container">
        <div
            :class="'player-bar ' + side"
            v-for="(item, idx) in playerList"
            :key="idx"
        >
            <h2 v-show="isPlayerOut[idx]" v-if="side === 'right'">Out!</h2>
            <div :class="getPlayerFrameClass(idx)">
                <p
                    class="timer"
                    v-if="side === 'right' && idx === currentPlayerIdx"
                >
                    {{ timer }}
                </p>
                <img class="profile-pic" :src="item.profilePicURL" />
                <p
                    class="timer"
                    v-if="side === 'left' && idx === currentPlayerIdx"
                >
                    {{ timer }}
                </p>
            </div>
            <h2 v-show="isPlayerOut[idx]" v-if="side === 'left'">Out!</h2>
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
        currentPlayerIdx: {
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
            } else if (idx === this.currentPlayerIdx) {
                classes = classes + "highlighted";
            }
            console.log(classes);
            return classes;
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
    row-gap: 1.5rem;
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
    /* padding: 0.3rem 1.5rem; */
    width: 8rem;
    transition: width 0.5s ease;
}

.player-frame.left {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}

.player-frame.right {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    justify-content: flex-end;
}

.profile-pic {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 1px solid #4e4f50;
    margin: 0.3rem 1.5rem;
}

.out {
    background: #2c2f32;
}

.highlighted {
    width: 11.5rem;
    transition: width 0.5s ease;
}

h2 {
    padding-top: 0.3rem;
}

.timer {
    font-size: 3rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
    color: white;
}
</style>
