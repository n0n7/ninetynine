<template>
    <div v-show="isVisible">
        <div class="mask" @click="doShake()"></div>
        <div class="window">
            <h1>{{ message }}</h1>
            <p :class="isShaking ? 'shake' : ''">Please confirm your choice</p>
            <div class="button-zone">
                <NavButton text="Confirm" :to="to" />
                <NavButton text="Cancel" @click="closeWindow()" />
            </div>
        </div>
    </div>
</template>

<script>
import NavButton from "/src/components/NavButton.vue";
export default {
    components: {
        NavButton,
    },
    props: {
        message: {
            type: String,
            default: "Leave the room?",
        },
        to: {
            type: String,
            default: "/",
        },
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isShaking: false,
        };
    },
    methods: {
        closeWindow() {
            this.$emit("close");
        },
        doShake() {
            this.isShaking = true;
            setTimeout(() => {
                this.isShaking = false;
            }, 400);
        },
    },
};
</script>

<style scoped>
.mask {
    z-index: 99;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 60%;
}

.window {
    z-index: 100;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 30rem;
    height: 20rem;
    color: white;
    background: #242526;
    border-radius: 15px;
}

h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 0;
}

p {
    text-align: center;
    font-size: 1.5rem;
}

@keyframes shake {
    0% {
        transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
        transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
        transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
        transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
        transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
        transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
        transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
        transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
        transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
        transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
        transform: translate(1px, -2px) rotate(-1deg);
    }
}

.shake {
    color: #ff0033;
    animation: shake 0.5s infinite;
}

.button-zone {
    position: fixed;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%);
    margin-bottom: 1.5rem;

    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    column-gap: 1rem;
}
</style>
