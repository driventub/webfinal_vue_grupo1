<template>
  <div class="container">
    <div class="titulo">
      <h3>Noticias</h3>
    </div>
    <div class="noticia" v-for="noticia in noticia" :key="noticia.titulo">
      <div class="titulo">
        <h2>{{ noticia.titulo }}</h2>
        <p>{{ noticia.descripcion }}</p>
      </div>
      <div class="imagenVideo">
        <ul>
          <li v-for="imagen in noticia.urlImagen" :key="imagen">
            <img src="imagen" alt="Imagen" />
          </li>
        </ul>
        <ul>
          <li v-for="videoUrl in noticia.urlVideo" :key="videoUrl">
            <iframe
              width="560"
              height="315"
              :src="videoUrl"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { obtenerFachada } from "../helpers/noticiaApi";

export default {
  data() {
    return {
      noticias: [],
    };
  },

  mounted() {
    obtenerFachada()
      .then((response) => {
        this.noticias = response.data;
      })
      .catch((error) => {
        console.error("Error al obtener la noticia", error);
      });
  },
};
</script>

<style scope>

  .titulo{
    margin: 1px black;
  }

</style>