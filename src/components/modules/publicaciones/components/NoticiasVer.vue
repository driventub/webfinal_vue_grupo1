<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="encabezado">
          <h3 class="card-title">Noticias de Interes</h3>
        </div>
        <div>
          <div class="noticia" v-for="noticia in noticias" :key="noticia.id">
            <div class="card">
            
                <div  class="card-header">
                  <h5>{{ noticia.titulo }}</h5>
                </div>
                <div class="card-text">
                  <p>{{ noticia.descripcion }}</p>
                </div>

          
              <div class="imagenVideo">
                <ul>
                  <div v-for="imagen in noticia.urlImagen" :key="imagen">
                    <h5 v-on="imprimirRuta(imagen)" ></h5>
                    <img src="imagen" alt="Imagen" />
                  </div>
                </ul>
                <ul>
                  <div class="video">
                    <div v-for="videoUrl in noticia.urlVideo" :key="videoUrl">
                    <!-- Aquí el video -->
                    <iframe

                      :src="convertToEmbedUrl(videoUrl)"
                      frameborder="0"
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
      listaimagenes:[],
    };
  },
  methods: {
    convertToEmbedUrl(watchUrl) {
      const videoId = watchUrl.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    },

    imprimirRuta(imagen){
      console.log("AQUI ESTA LA IMAGEN: "+imagen);
    }
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

h5 {
  font-family: "Times New Roman", Times, serif;
  text-align: justify;
}

p {
  font-family: Georgia, "Times New Roman", Times, serif;
  text-align: justify;
  margin-left: 1%;
} 
.noticia {
  margin-top: 2%;
  -ms-layout-grid: auto;
}
.video {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.video iframe{
  position: absolute;
  top: 0;
  left: 8%;
  width: 80%;
  height: 80%;
}

.container {
  margin-top: 3%;
}
</style>