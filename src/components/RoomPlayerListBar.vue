<template>
    <ul>
        <li
            :class="idx === currentPlayerIdx ? 'highlighted' : ''"
            v-for="(item, idx) in playerList"
            key="idx"
        >
            {{ item.username }}
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        playerList: {
            type: Array,
            required: true,
        },
        currentPlayerIdx: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style>
li {
    color: white;
}

.highlighted {
    color: #a35bff;
}
</style>
