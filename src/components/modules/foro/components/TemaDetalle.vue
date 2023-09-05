<template>
  <div class="containerTema">
    <div>
      <div class="datos">
        <span class="asunto">{{ tema }}</span>
        <span class="sms">{{ mensaje }}</span>
        <span class="fechaC">{{ formatoFecha(fechaCreacion) }}</span>
        <span class="num">{{ numComent }} Comentarios</span>

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
border: 1px solid rgb(118, 118, 118);
border-radius: 15px;
margin: 10px;
}
.asunto{
  font-size: 2vw;
  font-weight: bold;
}
.sms{
  font-size: 1.5vw;
}

.fechaC{
  color: rgb(126, 125, 125);
  font-size: 0.7vw;
}

.datos{
  display: flex;
  justify-content: center;
  display: grid;
  align-items: center;
}

.num{
  color: rgb(4, 203, 103);
}

</style>
