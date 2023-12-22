<template>
    <div class="podium-container">
        <div v-if="secondPlace !== null" class="place">
            <p>{{ secondPlace.playerName }}</p>
            <img :src="secondPlace.playerAvatarURL" />
            <div class="podium silver" ref="silver"></div>
        </div>
        <div v-if="firstPlace !== null" class="place">
            <p>{{ firstPlace.playerName }}</p>
            <img :src="firstPlace.playerAvatarURL" />
            <div class="podium gold" ref="gold"></div>
        </div>
        <div v-if="thirdPlace !== null" class="place">
            <p>{{ thirdPlace.playerName }}</p>
            <img :src="thirdPlace.playerAvatarURL" />
            <div class="podium bronze" ref="bronze"></div>
        </div>
    </div>
    <div class="button-container">
        <router-link to="">
            <button disabled="true">Restart</button>
        </router-link>
        <router-link to="/">
            <button>Leave</button>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        playerRankings: {
            type: Array,
            required: true,
        },
    },
    computed: {
        firstPlace() {
            if (this.playerRankings.length < 1) {
                return null;
            }
            return this.playerRankings[this.playerRankings.length - 1];
        },
        secondPlace() {
            if (this.playerRankings.length < 2) {
                return null;
            }
            return this.playerRankings[this.playerRankings.length - 2];
        },
        thirdPlace() {
            if (this.playerRankings.length < 3) {
                return null;
            }
            return this.playerRankings[this.playerRankings.length - 3];
        },
    },
    methods: {
        setPodiumHeight() {
            const gold = this.$refs.gold;
            const silver = this.$refs.silver;
            const bronze = this.$refs.bronze;

            if (gold !== undefined) {
                gold.style.height = "45vh";
            }
            if (silver !== undefined) {
                silver.style.height = "30vh";
            }
            if (bronze !== undefined) {
                bronze.style.height = "15vh";
            }
        },
    },
    mounted() {
        setTimeout(() => {
            this.setPodiumHeight();
        }, 100);
    },
};
</script>

<style scoped>
.podium-container {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    flex-direction: row;
    column-gap: 10vw;
}

.place {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
}

.place p {
    color: white;
    font-size: 4vh;
    text-align: center;
    margin: 0;
    padding: 0;
}

.place img {
    width: 12vw;
    height: 12vw;
    border-radius: 50%;
    margin-bottom: 1vh;
}

.podium {
    width: 12vw;
    height: 0;
    background-color: white;
    position: relative;
    border-top-left-radius: 3vh;
    border-top-right-radius: 3vh;
    transition: height 1s ease-out;
}

.gold {
    background-color: #ffd700;
}

.silver {
    background-color: #bcc6cc;
}

.bronze {
    background-color: #cd7f32;
}

.button-container {
    position: absolute;
    right: 0%;

    display: flex;
    flex-direction: row;
    column-gap: 2vh;

    margin-right: 2vh;
}

button {
    font-size: 3vh;
    color: white;
    background: #a35bff;
    border: 0px;
    border-radius: 8px;
    width: 16vh;
    height: 10vh;
    cursor: pointer;
}

button:hover {
    background: #8222ff;
}

button:disabled {
    background: #aaaaaa;
}
</style>
