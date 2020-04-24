<template>
  <div id="app">
    <h1>新冠肺炎信息系统</h1>
    <div id="nav">
      <router-link to="/home">实时监控系统</router-link>|
      <router-link to="/layout">病患信息系统</router-link> |
      <router-link to="/login">登录页面</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  font-size: 20px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
