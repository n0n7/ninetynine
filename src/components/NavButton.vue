<template>
    <div>
        <router-link :to="to">
            <button :disabled="!enable">{{ text }}</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "NavButton",
    props: {
        text: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            default: "",
        },
        enable: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style scoped>
button {
    font-size: 1.5rem;
    color: white;
    background: #a35bff;
    border: 0px;
    border-radius: 8px;
    width: 13rem;
    height: 5rem;
    cursor: pointer;
}

button:hover {
    background: #8222ff;
}

button:disabled {
    background: #aaaaaa;
}

@media screen and (max-width: 600px) {
    button {
        font-size: 1rem;
        color: white;
        background: #a35bff;
        border: 0px;
        border-radius: 8px;
        width: 8rem;
        height: 4rem;
        cursor: pointer;
    }
}
</style>
