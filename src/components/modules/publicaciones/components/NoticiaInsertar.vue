<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h1>Nueva Noticia</h1>
            <form @submit.prevent="createNoticia">
              <div class="mb-3">
                <label class="form-label" for="titulo">Título:</label>
                <input
                  class="form-control"
                  type="text"
                  id="titulo"
                  v-model="noticia.titulo"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label" for="descripcion">Descripción:</label>
                <textarea
                  class="form-control"
                  id="descripcion"
                  v-model="noticia.descripcion"
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label"
                  >Seleccione el tipo de contenido:</label
                >
                <div>
                  <input
                    type="checkbox"
                    id="showImageSection"
                    v-model="noticia.mostrarImagen"
                  />
                  <label for="showImageSection">Imágenes</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="showVideoSection"
                    v-model="noticia.mostrarVideo"
                  />
                  <label for="showVideoSection">Videos</label>
                </div>
              </div>

              <div v-if="noticia.mostrarImagen" class="mb-3">
                <label class="form-label" for="imagen">Imagenes:</label>

                <div class="dropzone" @drop="handleDrop" @dragover.prevent>
                  <input
                    class="form-control"
                    type="file"
                    id="imagen"
                    ref="imageInput"
                    multiple
                    @change="handleImageChange"
                    style="display: none"
                    required
                  />
                  <p>
                    Arrastre y suelte aquí o
                    <label for="imagen" class="browse-label"
                      >seleccione de su equipo</label
                    >
                  </p>
                </div>

                <ul>
                  <li v-for="(image, index) in noticia.imagen" :key="index">
                    {{ image.name }}
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="removeImage(index)"
                    >
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>

              <div v-if="noticia.mostrarVideo" class="mb-3">
                <label class="form-label" for="urlVideo">Videos:</label>
                <input
                  class="form-control"
                  type="text"
                  id="urlVideo"
                  v-model="urlVideoInput"
                  required
                />
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click.prevent="addVideoUrl"
                >
                  Añadir Video URL
                </button>
                <ul>
                  <li
                    v-for="(videoUrl, index) in noticia.urlVideo"
                    :key="index"
                  >
                    {{ videoUrl }}
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="removeVideoUrl(index)"
                    >
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>

              <button class="btn btn-primary" type="submit">
                Crear Noticia
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { insertarFachada } from "../helpers/noticiaApi";

export default {
  data() {
    return {
      noticia: {
        titulo: "",
        descripcion: "",
        imagen: [],
        urlVideo: [],
        mostrarImagen: false,
        mostrarVideo: false,
      },
      urlVideoInput: "",
    };
  },
  methods: {
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.addImages(files);
    },

    handleImageChange(event) {
      const files = event.target.files;
      this.addImages(files);
    },

    addImages(files) {
      for (let i = 0; i < files.length; i++) {
        this.noticia.imagen.push(files[i]);
      }
    },

    removeImage(index) {
      this.noticia.imagen.splice(index, 1);
    },

    addVideoUrl() {
      if (this.urlVideoInput.trim() !== "") {
        this.noticia.urlVideo.push(this.urlVideoInput);
        this.urlVideoInput = "";
      }
    },

    removeVideoUrl(index) {
      this.noticia.urlVideo.splice(index, 1);
    },

    async createNoticia() {
      try {
        if (
          (this.noticia.mostrarImagen && this.noticia.imagen.length === 0) ||
          (this.noticia.mostrarVideo && this.noticia.urlVideo.length === 0)
        ) {
          // Display an error message or take appropriate action
          console.error("Required section is not filled.");
          return;
        }

        const formData = new FormData();

        formData.append("titulo", this.noticia.titulo);
        formData.append("descripcion", this.noticia.descripcion);

        for (let i = 0; i < this.noticia.urlVideo.length; i++) {
          formData.append("urlVideo", this.noticia.urlVideo[i]);
        }

        for (let i = 0; i < this.noticia.imagen.length; i++) {
          formData.append("imagen", this.noticia.imagen[i]);
        }

        await insertarFachada(formData);

        this.noticia.titulo = "";
        this.noticia.descripcion = "";
        this.noticia.urlVideo = [];
        this.urlVideoInput = "";
        this.noticia.imagen = [];
        this.mostrarImagen = false;
        this.mostrarVideo = false;

        console.log("Noticia created successfully.");
      } catch (error) {
        console.error("Error creating Noticia:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Style for the dropzone area */
.dropzone {
  border: 2px dashed #ccc;
  text-align: center;
  padding: 20px;
  cursor: pointer;
}

/* Style for the browse label */
.browse-label {
  color: #007bff;
  cursor: pointer;
}

/* Style for selected images */
ul li {
  margin-top: 5px;
}
</style>
