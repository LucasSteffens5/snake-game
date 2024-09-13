<!-- src/components/Menu.vue -->
<template>
  <div id="menu-home">
    <div class="menu-container">
      <button @click="start" id="start">Iniciar</button>
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
}

.menu-container {
  text-align: center;
  background-image: url('../assets/menu-snake-game.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

button {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.5vw 3vw;
  font-size: 2vw;
  cursor: pointer;
}
</style>