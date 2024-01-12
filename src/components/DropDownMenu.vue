<template>
    <div class="menu-container">
        <img class="menu-icon" @click="toggleMenu()" src="/menu.svg" />
        <div
            :class="
                isMenuShow
                    ? 'menu-list menu-list-show'
                    : 'menu-list menu-list-hide'
            "
        >
            <button class="button-menu" @click="toggleWindow()">Leave</button>
            <button class="button-menu" :disabled="true">How to Play?</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMenuShow: false,
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuShow = !this.isMenuShow;
        },
        toggleWindow() {
            this.$emit("openWindow");
        },
    },
};
</script>

<style scoped>
.menu-container {
    display: flex;
    flex-direction: column;

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}

.menu-icon {
    width: 6vh;
    height: 6vh;
    filter: invert(37%) sepia(90%) saturate(2023%) hue-rotate(240deg)
        brightness(103%) contrast(104%);
    cursor: pointer;

    position: absolute;
    left: 100%;
    transform: translate(-100%);
    padding-right: 2vh;
    padding-top: 3vh;
    z-index: 80;
    /* padding-bottom: 0.5rem; */
}

.menu-icon:hover {
    filter: invert(19%) sepia(66%) saturate(6926%) hue-rotate(262deg)
        brightness(109%) contrast(110%);
}

.menu-list {
    background: #2c2f32;
    padding: 1vh;
    border-top-left-radius: 1vh;
    border-bottom-left-radius: 1vh;

    display: flex;
    flex-direction: row;
    column-gap: 1vh;

    position: fixed;
    /* margin-top: 8vh; */
    right: 0;
    width: 42vh;
    z-index: 79;

    transition: transform 0.5s ease-out;
}

.menu-list-show {
    transform: translate(0%);
}

.menu-list-hide {
    transform: translate(100%);
}

.button-menu {
    font-size: 3vh;
    color: white;
    background: #a35bff;
    border: 0px;
    border-radius: 8px;
    width: 16vh;
    height: 10vh;
    cursor: pointer;
}

.button-menu:hover {
    background: #8222ff;
}

.button-menu:disabled {
    background: #aaaaaa;
}

@media screen and (max-width: 600px) {
    .menu-icon {
        width: 5vh;
        height: 5vh;
        left: 100%;
        transform: translate(-100%);
        padding-right: 1vh;
        padding-top: 1.5vh;
    }

    .menu-list {
        padding: 1vh;
        border-top-left-radius: 1vh;
        border-bottom-left-radius: 1vh;
        width: 39vh;
    }

    .button-menu {
        font-size: 2.2vh;
        width: 16vh;
        height: 6vh;
    }
}
</style>
