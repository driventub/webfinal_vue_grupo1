<template>
  <div>
    <NoticiasVer></NoticiasVer>
  </div>
</template>

<script>
import NoticiasVer from './components/modules/publicaciones/pages/NoticiasVerPage.vue'

export default {
  name: 'App',
  components: {
    NoticiasVer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
