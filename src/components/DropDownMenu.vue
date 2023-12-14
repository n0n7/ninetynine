<template>
    <img class="menu-icon" @click="toggleMenu()" src="/menu.svg" />
    <div
        :class="
            isMenuShow
                ? 'menu-list menu-list-show'
                : 'menu-list menu-list-hide'
        "
    >
        <button class="button-menu">How to Play?</button>
        <button class="button-menu" @click="toggleWindow()">Leave</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMenuShow: false
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuShow = !this.isMenuShow;
        },
        toggleWindow() {
            this.$emit("openWindow")
        }
    }
}
</script>

<style scoped>
.menu-icon {
    width: 3rem;
    height: 3rem;
    filter: invert(37%) sepia(90%) saturate(2023%) hue-rotate(240deg)
        brightness(103%) contrast(104%);
    cursor: pointer;

    position: relative;
    left: 100%;
    transform: translate(calc(-100%));
    padding-right: 1rem;
    padding-bottom: 0.5rem;
}

.menu-icon:hover {
    filter: invert(19%) sepia(66%) saturate(6926%) hue-rotate(262deg)
        brightness(109%) contrast(110%);
}

.menu-list {
    background: #4e4f50;
    padding: 1rem;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;

    display: flex;
    flex-direction: row;
    column-gap: 1rem;

    position: fixed;
    top: 12.5rem;
    right: 0;

    transition: transform 0.5s ease-out;
}

.menu-list-show {
    transform: translate(0%);
}

.menu-list-hide {
    transform: translate(100%);
}

.button-menu {
    font-size: 1.5rem;
    color: white;
    background: #a35bff;
    border: 0px;
    border-radius: 8px;
    width: 8rem;
    height: 5rem;
    cursor: pointer;
}

.button-menu:hover {
    background: #8222ff;
}
</style>