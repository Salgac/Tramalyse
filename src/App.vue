<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view id="page" />
</template>

<script lang="ts">
export default {
  beforeCreate() {
    document.querySelector("body")?.setAttribute("style", "margin: 0px");
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: 100%;
  height: 100%;
  margin: auto;
  padding-top: 0px;
}

#nav {
  padding: 10px;
  margin-bottom: 5px;
  background-color: #333;
  text-align: center;

  a {
    font-weight: bold;
    color: white;
    text-decoration: none;
    padding: 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#page {
  width: 95%;
  margin: auto;
}
</style>
