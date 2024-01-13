import { defineStore } from "pinia";

export const useSessionStore = defineStore("session", {
    state: () => ({
        isLoggedIn: false,
        data: null,
    }),
    getters: {
        getIsLoggedIn: (state) => state.isLoggedIn,
        getData: (state) => state.data,
    },
    actions: {
        accountSetting(data) {
            this.data = data;
        },
        login(data) {
            this.isLoggedIn = true;
            this.data = data;
        },
        logout() {
            this.isLoggedIn = false;
            this.data = null;
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
