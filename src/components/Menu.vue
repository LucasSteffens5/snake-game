<template>
    <div id="menu-home">
        <div class="container">
          <div class="row">
            <div id="login">
              <div class="col-md-12">
                <h1 class="text-center">Menu</h1>
              </div>
              <div class="col-md-12 text-center">
                <button
                    @click="start"
                    id="start"
                    type="button"
                    class="btn btn-lg btn-dark"
                >
                  Start Game
                </button>
              </div>
            </div>
          </div>
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

h1 {
  font-size: 100px;
  font-weight: bold;
}

button {
  font-size: 40px;
  padding: 20px 65px;
}

#login {
  padding: 25px;
  margin: 0 auto;
  margin-top: 25%;
}

#start {
  position: relative;
}
</style>
