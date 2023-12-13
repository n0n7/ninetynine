<template>
  <div>
    <router-link :to="to">
      <button :disabled="!enable">{{ text }}</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavButton",
  props: {
    text: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    enable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
button {
  font-size: 1.5rem;
  color: white;
  background: #a35bff;
  border: 0px;
  border-radius: 8px;
  width: 13rem;
  height: 5rem;
}

button:hover {
  background: #8222ff;
}

button:disabled {
  background: #aaaaaa;
}
</style>