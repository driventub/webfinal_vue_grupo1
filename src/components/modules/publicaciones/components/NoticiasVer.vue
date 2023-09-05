<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="encabezado">
          <h3 class="card-title">Noticias de Interes</h3>
        </div>

        <div v-if="noticias.length === 0">

          <p>No tenemos noticias por el momento.</p>
          <p>Puedes ser el primero dirígete al Menu de Noticias e Inserta una noticia nueva</p>
          <img src="https://t3.ftcdn.net/jpg/01/01/89/46/360_F_101894688_RVSZUtDfPR6Cr5eBDQI7Qo5pZ01jmyK3.jpg" alt="Error de carga">
        </div>

        <div v-else>
          <div class="noticia" v-for="noticia in noticias" :key="noticia.id">
            <div class="card">
              <div class="card-header">
                <h5>{{ noticia.titulo }}</h5>
              </div>
              <div class="card-text">
                <p>{{ noticia.descripcion }}</p>
              </div>

              <div class="imagenVideo">
                <ul>
                  <div v-for="imagen in noticia.urlImagen" :key="imagen">
                    
                    <img :src="imprimirRuta(imagen)"  alt="Imagen" />
                   
                  </div>
                </ul>
                <ul>
                  <div class="video">
                    <div class="ratio ratio-21x9" v-for="videoUrl in noticia.urlVideo" :key="videoUrl">
                    <!-- Aquí el video -->
                    <iframe
                    class="embed-responsive-item mx-auto d-block"
                      :src="convertToEmbedUrl(videoUrl)"
                      title="YouTube video"
                      allowfullscreen
                    ></iframe>
                  </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
      listaimagenes: [],
    };
  },
  methods: {
    convertToEmbedUrl(watchUrl) {
      const videoId = watchUrl.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    },

    imprimirRuta(imagen) {
      const imagenUrl = `http://localhost:8080/API/v1.0/Civil/${imagen}`
      console.log(imagenUrl);
      return  imagenUrl
    },
  },

  mounted() {
    obtenerFachada()
      .then((response) => {
        this.noticias = response.data;
        this.noticias.reverse();
      })
      .catch((error) => {
        console.error("Error al obtener la noticia", error);
      });
  },
};
</script>

<style scope>
h3{
  font-size: 3vw;
}
h5 {
  font-family: "Times New Roman", Times, serif;
  text-align: justify;
  font-size: 2vw;
}

p {
  font-family: Georgia, "Times New Roman", Times, serif;
  text-align: justify;
  margin-left: 1%;
  margin-right: 1%;
  font-size: 2.5vmin;
} 
.noticia {
  margin-top: 2%;
}

.video{
  margin-right: 3%;
}

img{
  width: 25%;
  height: 25%;
}

@media screen and (max-width: 300px) {
  .video{
    display: none;
  }
}


</style>
