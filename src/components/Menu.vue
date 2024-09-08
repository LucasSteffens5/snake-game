<template>
  <div id="menu-home">
    <div class="menu-container">
      <h1>Menu</h1>
      <button @click="start" id="start">Start Game</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    start() {
      this.$router.push('play');
    },
  }
};
</script>

<style scoped>
#menu-home {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
}

.menu-container {
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h1 {
  font-size: 100px;
  font-weight: bold;
}

button {
  font-size: 40px;
  padding: 20px 65px;
}

#start {
  position: relative;
}
</style>
