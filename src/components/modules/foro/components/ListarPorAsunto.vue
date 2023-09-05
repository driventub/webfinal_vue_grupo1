<template>
  <div class="contenedor" v-for="f in listaForos" :key="f.id">
    <div>
      <h3>Imagen{{ f.urlAvatar }}</h3>
    </div>
    <div class="detalles">
      <span>{{ f.asunto }}</span>
      <span>{{ f.mensaje }}</span>
      <span>Creado el: {{ formatoFecha(f.fechaCreacion) }}</span>
    </div>
  </div>
</template>

<script>
import { listarPorAsuntoFachada } from "../helpers/ForoCliente";
import { formatearFecha } from "../helpers/Utilities";
export default {
  props: {
    asunto: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      listaForos: [],
    };
  },
  methods: {
    async cargarForos() {
      console.log("llegando el asunto: " + this.asunto);
      const response = await listarPorAsuntoFachada(this.asunto);
      this.listaForos = response.data;
    },
    formatoFecha(fecha){
      return formatearFecha(fecha)
    }
  },
  mounted() {
    this.cargarForos();
  },
  watch: {
    asunto: {
      handler(newAsunto) {
        this.cargarForos(newAsunto);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.contenedor {
  display: flex;
  justify-content: center;

  border: 1px solid black;
  border-radius: 10px;
}

.detalles {
  display: flex;
  justify-content: center;
  display: grid;
  align-items: center;
}
</style>
