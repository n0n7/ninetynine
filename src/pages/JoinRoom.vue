<template>
    <h1>Join Room</h1>
    <div class="search-bar">
        <form @submit.prevent="searchRoomID()">
            <input
                :class="{ 'input-invalid': isRoomError }"
                type="text"
                placeholder="Room ID: xxxxxxxxxxxx"
                maxlength="12"
                v-model="roomID"
            />
        </form>
    </div>
    <p v-show="isError" id="invalid-status">
        {{ status }}
    </p>
    <div class="flex-container-button">
        <NavButton class="flex-item-button" text="Join" @click="joinRoom" />
        <NavButton class="flex-item-button" text="Spectate" @click="joinRoom" />
    </div>
</template>

<script>
import NavButton from "/src/components/NavButton.vue";
import { useSessionStore } from "../store/session.js";
import { useLobbyStore } from "../store/lobbyStore.js";

const BACKEND_URL = process.env.BACKEND_URL;

export default {
    components: {
        NavButton,
    },
    data() {
        return {
            isRoomError: false,
            status: "",
            roomID: "",
            sessionStore: useSessionStore(),
            lobbyStore: useLobbyStore(),
        };
    },
    computed: {
        isError() {
            return this.status !== "";
        },
    },
    methods: {
        async joinRoom() {
            console.log("joinRoom");
            this.isRoomError = false;
            if (this.roomID.length < 12) {
                this.isRoomError = true;
                this.status = "Invalid format";
            } else if (!this.sessionStore.isLoggedIn) {
                this.status = "Please login first";
            } else {
                try {
                    const response = await fetch(
                        BACKEND_URL + "/joinroom",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                userId: this.sessionStore.data.userId,
                                roomId: this.roomID,
                            }),
                        }
                    );
                    const data = await response.json();
                    console.log(data);
                    if (data.error === undefined) {
                        this.lobbyStore.storeLobbyDetails(data);
                        this.$router.push("/room/" + this.roomID);
                    } else {
                        this.status = data.error;
                    }
                } catch (error) {
                    this.status =
                        "Cannot connect to server. Please try again later.";
                }
            }
        },
    },
};
</script>

<style scoped>
h1 {
    color: white;
    font-size: 3.5rem;
    margin-top: 0;
    text-align: center;
}

p {
    color: white;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
}

.search-bar {
    margin-top: 16vh;
    text-align: center;
}

input {
    width: calc(9vw + 24rem);
    min-width: 24rem;
    padding-left: 0.5rem;
    font-size: 2rem;
    border: 0;
    border-radius: 8px;
    background: #4e4f50;
    color: #b0b3b8;
}

.input-valid {
    border: 2px solid #50c878;
}

.input-invalid {
    border: 2px solid #ff0033;
}

.search-button {
    position: absolute;
    transform: translate(-110%, 8%);
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
}

.search-icon {
    width: 3rem;
    height: 3rem;
    filter: invert(37%) sepia(90%) saturate(2023%) hue-rotate(240deg)
        brightness(103%) contrast(104%);
}

.search-icon:hover {
    filter: invert(19%) sepia(66%) saturate(6926%) hue-rotate(262deg)
        brightness(109%) contrast(110%);
}

#valid-status {
    color: #50c878;
}

#invalid-status {
    color: #ff0033;
}

.flex-container-button {
    margin-top: 5rem;
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
