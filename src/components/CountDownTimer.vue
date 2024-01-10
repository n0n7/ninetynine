<template>
    <div>
        <img src="/hourglass.svg" alt="timer" />
        <p>{{ timer }}</p>
    </div>
</template>

<script>
export default {
    props: {
        timer: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style scoped>
@keyframes momentum-rotate {
    20% {
        transform: rotate(50deg);
    }
    50% {
        transform: rotate(-180deg);
    }
    70% {
        transform: rotate(-230deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

img {
    display: inline;
    width: 6vh;
    height: 6vh;
    animation: momentum-rotate 2s ease-in-out infinite;
}

p {
    display: inline;
    font-size: 6vh;
    margin-left: 0.5rem;
    color: white;
}

@media screen and (max-width: 600px) {
    img {
        width: 35px;
        height: 35px;
    }

    p {
        font-size: 35px;
    }
}
</style>
