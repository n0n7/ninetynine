<template>
    <h1>Join Room</h1>
    <div class="search-bar">
        <form @submit.prevent="searchRoomID()">
            <input
                :class="
                    isRoomIDValid == null
                        ? ''
                        : isRoomIDValid
                        ? 'input-valid'
                        : 'input-invalid'
                "
                type="text"
                placeholder="Room ID: xxxx-xxxx-xxxx"
                maxlength="12"
                ref="inputRoomID"
            />
            <button class="search-button">
                <img src="/search.svg" class="search-icon" />
            </button>
        </form>
    </div>
    <p
        v-show="isStatusVisible"
        :id="isRoomIDValid ? 'valid-status' : 'invalid-status'"
    >
        {{ status }}
    </p>
    <div class="flex-container-button">
        <NavButton
            class="flex-item-button"
            text="Join"
            :to="'/room/' + roomID"
            :enable="isRoomIDValid"
        />
        <NavButton
            class="flex-item-button"
            text="Spectate"
            :to="'/room/' + roomID"
            :enable="isRoomIDValid"
        />
    </div>
</template>

<script>
import NavButton from "/src/components/NavButton.vue";
export default {
    components: {
        NavButton,
    },
    data() {
        return {
            isStatusVisible: false,
            isRoomIDValid: null,
            status: "Invalid status message",
            roomID: "",
        };
    },
    methods: {
        searchRoomID() {
            this.roomID = this.$refs.inputRoomID.value;
            this.isStatusVisible = true;
            if (this.roomID.length < 12) {
                this.isRoomIDValid = false;
                this.status = "Invalid format";
            } else {
                // Add condition to check if Room ID is available on database
                this.isRoomIDValid = true;
                this.status = "Ready to join!";
            }
        },
    },
};
</script>

<style scoped>
h1 {
    color: white;
    font-size: 4rem;
    margin-top: 7vh;
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
