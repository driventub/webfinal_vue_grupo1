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

<style>
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  margin-top: 50px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .footer {
    padding: 10px 0;
  }
}

@media screen and (max-width: 480px) {
  .footer {
    padding: 5px 0;
    font-size: 14px;
  }
}
</style>