<template>
  <div
    v-for="(c,index) in listaComents" :key="c.id" class="containerComentarios"
  >
    <div>
      <label class="nombresss">{{ nombres[index]}} </label>
      <br />
      <label class="sms">{{ c.mensaje }}</label>
      <br />
      <label class="fechaCx">{{ formatoFecha(c.fecha) }}</label>
    </div>

    <div>
      <div class="like-dislike">
        <button title="Like" id="like-button" class="button like-button">
          <i class="bi bi-hand-thumbs-up"></i>
          {{ c.like }}
        </button>
        <button
          title="Dislike"
          id="dislike-button"
          class="button dislike-button"
        >
          <i class="bi bi-hand-thumbs-down"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenerComentariosPorIdForoFachada,obtenerSuscriptorPorIdComentFachada } from "../helpers/ComentariosCliente";
import { formatearFecha } from "../helpers/Utilities";
import { obtenerSuscripcionFachada } from "../../acercamiento/helpers/SuscripcionCliente";

export default {
  props: {
    idTemaForo: {
      type: Number,
      require: true,
    },
    cedula:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      listaComents: [],
      nombres:[],
    };
  },
  methods: {
    async cargarComentarios() {
      console.log("id del tema en listar comentarios: " + this.idTemaForo);
      const response = await obtenerComentariosPorIdForoFachada(
        this.idTemaForo
      );
      this.listaComents = response.data;

      const nombresPromises = this.listaComents.map(comentario => obtenerSuscriptorPorIdComentFachada(comentario.id));
      const nombresResponses = await Promise.all(nombresPromises);
      this.nombres = nombresResponses.map(response => response.data.nombre+" "+response.data.apellido);

    },
    async devoverlSus(id){
        const response = await obtenerSuscriptorPorIdComentFachada(id);
          console.log("response->> "+response.data.nombre);
          return response.data.nombre;        
    },
    formatoFecha(fecha) {
      return formatearFecha(fecha);
    },
  },
  mounted() {
    this.cargarComentarios();
  },
};

</script>

<style scoped>
.containerComentarios {
  padding: 10px;
  border: 1px solid rgb(152, 152, 152);
  margin: 10px;
  border-radius: 10px;
}

.nombresss{
  font-size: 1.2vw;
}
.sms{
  font-size: 0.9vw;
}
.fechaCx{
  font-size: 0.6vw;
}
</style>
