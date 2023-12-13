<template>
    <div>
        <h1> HOME PAGE WOW </h1>
    </div>
    <div class="flex-container-button">
        <NavButton class="flex-item-button" text="Join Room" to="/joinroom" />
        <NavButton class="flex-item-button" text="Create Room" to="/" />
    </div>
    
</template>

<script>
    import NavButton from '/src/components/NavButton.vue';
    export default {
        components: {
            NavButton
        }
    }
</script>

<style scoped>

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    h1 {
        color: #dfe2e6;
        padding-left: 10px;
    }

    .flex-container-button {
        margin-top: 15%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        column-gap: 8vw;
    }

    .flex-item-button {
        margin-bottom: 0.5rem;
    }

</style>