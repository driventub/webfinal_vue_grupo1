<template>
  <div class="containerTema">
    <div>
      <div>
        <h2>{{ tema }}</h2>
        <h3>sms{{ mensaje }}</h3>
        <h3>{{ formatoFecha(fechaCreacion) }}</h3>
        <h3>{{ numComent }} Comentarios</h3>

      </div>
      <div>
        <span>Tag: {{ tag }}</span>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenerForoPorIDFachada, obtenerNumeroComentariosFachada } from "../helpers/ForoCliente";
import { formatearFecha } from "../helpers/Utilities";

export default {
  props: {
    idTemaBuscar: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tema: null,
      mensaje: null,
      fechaCreacion: null,
      numComent : null,
      tag:null,
    };
  },
  methods: {
    async carNumComent(){
        const response = await obtenerNumeroComentariosFachada(this.idTemaBuscar);
        this.numComent = response.data;
        console.log("cargando numero de comentarios: "+this.numComent);
    },

    async cargarDatosTema() {
      const response = await obtenerForoPorIDFachada(this.idTemaBuscar);
      const foro = response.data;
      this.tema = foro.asunto;
      this.mensaje = foro.mensaje;
      this.tag = foro.tag,
      this.fechaCreacion = foro.fechaCreacion;
      
    },
    formatoFecha(fecha){
      return formatearFecha(fecha)
    }
  },
  mounted() {
    this.cargarDatosTema();
    this.carNumComent();
  },
};
</script>

<style scoped>
.containerTema{
border: 1px solid blue;
}

</style>
