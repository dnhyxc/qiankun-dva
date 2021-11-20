<template>
  <div id="app">
    <div id="nav">
      <router-link to="/dnhyxc/vue">Home</router-link>
      <router-link to="/dnhyxc/vue/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  props: ["info"],
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 28px;
  margin-right: 20px;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.btns {
  margin: 100px;
}
.btns button {
  margin: 0 10px;
}
</style>
