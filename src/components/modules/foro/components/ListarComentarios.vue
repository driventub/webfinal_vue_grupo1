<template>
  <div
    v-for="(c, index) in listaComents"
    :key="c.id"
    class="containerComentarios"
  >
    <div>
      <label>estu: {{ c.suscriptor }}</label>
      <br />
      <label>mensaje: {{ c.mensaje }}</label>
      <br />
      <label>fecha :{{ c.fecha }}</label>
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
import { obtenerComentariosPorIdForoFachada } from "../helpers/ComentariosCliente";

export default {
  props: {
    idTemaForo: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      listaComents: [],
    };
  },
  methods: {
    async cargarComentarios() {
      console.log("id del tema: " + this.idTemaForo);
      const response = await obtenerComentariosPorIdForoFachada(
        this.idTemaForo
      );
      this.listaComents = response.data;

      for (let i = 0; i < this.listaComents.length; i++) {
        console.log("sus "+this.listaComents[0]);
      }
      
    },
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
