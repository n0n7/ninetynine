<template>
  <h1>Join Room</h1>
  <div class="search-bar">
    <form @submit.prevent="searchRoomID()">
      <input
        type="text"
        placeholder="Room ID: xxxx-xxxx-xxxx"
        maxlength="12"
        ref="inputRoomID"
      />
      <button class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path
            d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
          />
        </svg>
      </button>
    </form>
  </div>
  <h2
    v-show="isStatusVisible"
    :id="isRoomIDValid ? 'valid-status' : 'invalid-status'"
  >
    {{ status }}
  </h2>
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
  font-size: 3rem;
  text-align: center;
}

h2 {
  color: white;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

.search-bar {
  margin-top: 8%;
  text-align: center;
}

input {
  width: calc(9vw + 24rem);
  min-width: 24rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  border: 0;
  border-radius: 8px;
  background: #4e4f50;
  color: #b0b3b8;
}

.search-icon {
  position: absolute;
  transform: translate(-125%, 35%);
  width: 2rem;
  height: 2rem;
  fill: #a35bff;
  padding: 0;
  background: none;
  border: none;
}

.search-icon:hover {
  fill: #8222ff;
}

#valid-status {
  color: #50c878;
}

#invalid-status {
  color: #ff0033;
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