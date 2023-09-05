<template>  
    <DatosConsultarQueja/>
</template>

<script>
import DatosConsultarQueja from "../components/DatosConsultarQueja.vue";

export default {
  components: {
    DatosConsultarQueja,
  },
  mounted() {
    const {cedula} = this.$route.params
    console.log(cedula);
  },
};
</script>
<style scoped>

</style>
