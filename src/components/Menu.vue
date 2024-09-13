<!-- src/components/Menu.vue -->
<template>
  <div id="menu-home">
    <div class="menu-container">
      <h1>Menu</h1>
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
  background: rgba(255, 255, 255, 0.8);
  padding: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>