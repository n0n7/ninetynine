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

    .flex-container-button{
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10%
    }

    .flex-item-button{
        margin: 0.5rem 0rem;
    }

</style>