<template>
  <NavBar/>
  <router-view/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue';
import GuardarSuscripcion from './components/modules/acercamiento/pages/GuardarSuscripcion.vue';
export default {
  name: 'App',
  components: {
    GuardarSuscripcion,
    NavBar
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
