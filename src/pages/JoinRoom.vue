<template>
  <h1>Join Room</h1>
  <div class="search-bar">
    <input type="text" placeholder="Room ID: xxxx-xxxx-xxxx" />
    <!-- <svg class="search-icon" @click="searchRoomID()" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
        </svg> -->
  </div>
  <div class="flex-container-button">
    <NavButton class="flex-item-button1" text="Join" to="" />
    <NavButton class="flex-item-button2" text="Spectate" to="" />
  </div>
</template>

<script>
import NavButton from "/src/components/NavButton.vue";
export default {
  components: {
    NavButton,
  },
  methods: {
    searchRoomID() {
      alert("404 Not Found");
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

/* .search-icon{
        position: absolute;
        transform: translate(-125%, 35%) ;
        width: 2rem;
        height: 2rem;
        fill: #A35BFF;
    }

    .search-icon:hover{
        fill: #8222ff;
    } */

.flex-container-button {
  margin-top: 15%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 8vw;
}

.flex-item-button1 {
  margin-bottom: 0.5rem;
}

.flex-item-button2 {
  margin-bottom: 0.5rem;
}
</style>