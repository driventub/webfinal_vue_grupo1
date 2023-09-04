<template>
  <DatosGuardarSuscripcion />
  <div class="footer">
    <p>
      <router-link to="/terminos">Términos y Condiciones</router-link> |
      <router-link to="/ayuda">Ayuda</router-link> |
      &copy; {{ new Date().getFullYear() }} Derechos Reservados
    </p>
  </div>
</template>

<script>
import DatosGuardarSuscripcion from '../components/DatosGuardarSuscripcion.vue';
import Terminos from './Terminos.vue';
export default {
  components: {
    DatosGuardarSuscripcion,
    Terminos
  },
}
</script>

<style></style>