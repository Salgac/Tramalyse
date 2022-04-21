<template>
  <body>
    <header>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </header>

    <router-view id="page" />

    <footer>
      <p>&copy; 2021-{{ year }} Dominik Šalgovič | Faculty of Informatics and Information Technologies of Slovak University of Technology</p>
    </footer>
  </body>
</template>

<script lang="ts">
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
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
  min-width: 375px;
  margin: auto;
  padding-top: 0px;
}

header {
  padding: 10px;
  margin-bottom: 5px;
  background-color: #333;
  text-align: center;
  min-height: 20px;

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

body {
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;

  #page {
    width: 95%;
    max-width: 1920px;
    min-width: 375px;
    margin: auto;
  }
}

footer {
  min-height: 50px;
  background-color: #333;
  color: white;
  margin-top: auto;
}
</style>
