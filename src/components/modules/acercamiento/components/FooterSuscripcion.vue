<template>
    <div class="footer">
    <p>
      <router-link to="/terminos">Términos y Condiciones</router-link> |
      <router-link to="/ayuda">Ayuda</router-link> |
      &copy; {{ new Date().getFullYear() }} Derechos Reservados
    </p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  margin-top: 50px;
}
</style>