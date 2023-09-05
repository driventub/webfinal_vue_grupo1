<template>
  <div
    v-for="(c,index) in listaComents" :key="c.id" class="containerComentarios"
  >
    <div>
      <label>{{ nombres[index]}} </label>
      <br />
      <label>{{ c.mensaje }}</label>
      <br />
      <label>{{ c.fecha }}</label>
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

      // Obtener los nombres en paralelo
      const nombresPromises = this.listaComents.map(comentario => obtenerSuscriptorPorIdComentFachada(comentario.id));
      const nombresResponses = await Promise.all(nombresPromises);
      this.nombres = nombresResponses.map(response => response.data.nombre+" "+response.data.apellido);

    },
    async devoverlSus(id){
        const response = await obtenerSuscriptorPorIdComentFachada(id);
          console.log("response->> "+response.data.nombre);
          return response.data.nombre;        
    }
  },
  mounted() {
    this.cargarComentarios();
  },
};

</script>

<style scoped>
.containerComentarios {
  border: 1px solid blanchedalmond;
  margin: 10px;
}
</style>
