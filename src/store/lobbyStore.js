import { defineStore } from "pinia";

export const useLobbyStore = defineStore("lobby", {
    state: () => ({
        lobbyDetails: null,
    }),
    getters: {
        getLobbyDetails: (state) => state.lobbyDetails,
    },
    actions: {
        storeLobbyDetails(data) {
            this.lobbyDetails = data;
            console.log("Lobby details stored", this.lobbyDetails);
        },
    },
    // persist: {
    //     storage: sessionStorage,
    // },
});
