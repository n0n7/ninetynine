<template>
    <img src="/hourglass.svg" />
    <p>{{ timer }}</p>
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
        transform: rotate(40deg);
    }
    50% {
        transform: rotate(-180deg);
    }
    70% {
        transform: rotate(-220deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

img {
    display: inline;
    width: 3rem;
    height: 3rem;
    vertical-align: middle;

    animation: momentum-rotate 2s ease-in-out infinite;
}

p {
    display: inline;
    font-size: 3rem;
    margin: 0;
    color: white;
}
</style>
