<template>
    <div class="podium-container">
        <div v-if="secondPlace !== null && !isSmallScreen" class="place">
            <p v-if="!isSmallScreen">{{ secondPlace.playerName }}</p>
            <div class="podium silver" ref="silver" v-if="isSmallScreen" />
            <img
                :src="secondPlace.playerAvatarURL"
                alt="player"
                @error="setAvatarToDefault"
            />
            <div class="podium silver" ref="silver" v-if="!isSmallScreen" />
            <p v-if="isSmallScreen">{{ secondPlace.playerName }}</p>
        </div>
        <div v-if="firstPlace !== null" class="place">
            <p v-if="!isSmallScreen">{{ firstPlace.playerName }}</p>
            <div class="podium gold" ref="gold" v-if="isSmallScreen" />
            <img
                :src="firstPlace.playerAvatarURL"
                alt="player"
                @error="setAvatarToDefault"
            />
            <div class="podium gold" ref="gold" v-if="!isSmallScreen" />
            <p v-if="isSmallScreen">{{ firstPlace.playerName }}</p>
        </div>
        <div v-if="secondPlace !== null && isSmallScreen" class="place">
            <p v-if="!isSmallScreen">{{ secondPlace.playerName }}</p>
            <div class="podium silver" ref="silver" v-if="isSmallScreen" />
            <img
                :src="secondPlace.playerAvatarURL"
                alt="player"
                @error="setAvatarToDefault"
            />
            <div class="podium silver" ref="silver" v-if="!isSmallScreen" />
            <p v-if="isSmallScreen">{{ secondPlace.playerName }}</p>
        </div>
        <div v-if="thirdPlace !== null" class="place">
            <p v-if="!isSmallScreen">{{ thirdPlace.playerName }}</p>
            <div class="podium bronze" ref="bronze" v-if="isSmallScreen" />
            <img
                :src="thirdPlace.playerAvatarURL"
                alt="player"
                @error="setAvatarToDefault"
            />
            <div class="podium bronze" ref="bronze" v-if="!isSmallScreen" />
            <p v-if="isSmallScreen">{{ thirdPlace.playerName }}</p>
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
    <ConfettiEffect />
</template>

<script>
import ConfettiEffect from "./ConfettiEffect.vue";
export default {
    props: {
        playerRankings: {
            type: Array,
            required: true,
        },
    },
    components: {
        ConfettiEffect,
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
        isSmallScreen() {
            console.log(window.innerWidth);
            return window.innerWidth < 600;
        },
    },
    methods: {
        setPodium() {
            const gold = this.$refs.gold;
            const silver = this.$refs.silver;
            const bronze = this.$refs.bronze;

            if (this.isSmallScreen) {
                gold && (gold.style.width = "80vw");
                silver && (silver.style.width = "70vw");
                bronze && (bronze.style.width = "60vw");
            } else {
                gold && (gold.style.height = "45vh");
                silver && (silver.style.height = "30vh");
                bronze && (bronze.style.height = "15vh");
            }
        },
        setAvatarToDefault() {
            event.target.src = "/default_profile_icon.png";
        },

        resetPodium() {
            const gold = this.$refs.gold;
            const silver = this.$refs.silver;
            const bronze = this.$refs.bronze;

            if (this.isSmallScreen) {
                gold && (gold.style.width = "0");
                silver && (silver.style.width = "0");
                bronze && (bronze.style.width = "0");
            } else {
                gold && (gold.style.height = "0");
                silver && (silver.style.height = "0");
                bronze && (bronze.style.height = "0");
            }
        },
    },
    mounted() {
        setTimeout(() => {
            this.setPodium();
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
    z-index: -2;
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
    z-index: 0;
}

button {
    font-size: 3vh;
    color: white;
    background: #a35bff;
    border: 0px;
    border-radius: 8px;
    width: 16vh;
    height: 8vh;
    cursor: pointer;
}

button:hover {
    background: #8222ff;
}

button:disabled {
    background: #aaaaaa;
}

@media screen and (max-width: 600px) {
    .podium-container {
        /* background: green; */
        position: absolute;
        height: 85%;
        left: 0;
        transform: none;
        flex-direction: column;
        justify-content: center;

        row-gap: 12vw;
    }

    .place {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        align-self: flex-start;
        column-gap: 1vw;
    }

    .place p {
        font-size: 3vh;
        position: absolute;
        left: 1vw;
        color: #1e1e1e;
    }

    .place img {
        width: 18vw;
        height: 18vw;
        margin-bottom: 0;
    }

    .podium {
        width: 0;
        height: 10vh;
        border-top-left-radius: 0;
        border-top-right-radius: 2vh;
        border-bottom-right-radius: 2vh;
        transition: width 1s ease-out;
    }

    .button-container {
        position: absolute;
        width: 100vw;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        margin: 0;
        column-gap: 2vh;
        z-index: 0;
    }
}
</style>
