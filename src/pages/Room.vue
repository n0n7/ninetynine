<template>
    <div>room page {{  roomId }}</div>
</template>

<script>
export default {
    props: {
        roomId: {
            type: String,
            required: false,
        },
    },
}
</script>
