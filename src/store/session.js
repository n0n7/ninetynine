import { defineStore } from "pinia";

export const useSessionStore = defineStore("session", {
    state: () => ({
        isLoggedIn: false,
        data: null,
    }),
    actions: {
        login(data) {
            this.isLoggedIn = true;
            this.data = data;
            console.log("Logged in as " + data.userId);
        },
        logout() {
            this.isLoggedIn = false;
            this.data = null;
            console.log("Logged out");
        },
    },
    persist: {
        storage: sessionStorage,
    },
});
