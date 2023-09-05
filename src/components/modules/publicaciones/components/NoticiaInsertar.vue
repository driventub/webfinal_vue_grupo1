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
                <label class="form-label"
                  >Seleccione el tipo de contenido:</label
                >
                <div>
                  <input
                    type="checkbox"
                    id="showDescSection"
                    v-model="noticia.mostrarDesc"
                  />
                  <label for="showDescSection">Descripción</label>
                </div>

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

              <div v-if="noticia.mostrarDesc" class="mb-3">
                <label class="form-label" for="descripcion">Descripción:</label>
                <textarea
                  class="form-control"
                  id="descripcion"
                  v-model="noticia.descripcion"
                  required
                ></textarea>
              </div>

              <div v-if="noticia.mostrarImagen" class="mb-3">
                <label class="form-label" for="imagen">Imagenes:</label>
                <h7>Tamaño máximo de archivos: 10MB</h7>
                <div class="dropzone" @drop="handleDrop" @dragover.prevent>
                  <input
                    class="form-control"
                    type="file"
                    id="imagen"
                    ref="imageInput"
                    multiple
                    @change="handleImageChange"
                    accept=".jpg, .jpeg, .png, .gif"
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
            <h2 v-if="noticiaInserted" class="text-success">
              Noticia insertada exitosamente.
            </h2>
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
        mostrarDesc: false,
        mostrarImagen: false,
        mostrarVideo: false,
        insertado: false,
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

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!this.isFileTypeAllowed(file)) {
          alert("Tipo de archivo invalido.");

          this.$refs.imageInput.value = "";
          return;
        }

        this.addImage(file);
      }
    },

    isFileTypeAllowed(file) {
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

      const extension = file.name.split(".").pop().toLowerCase();

      return allowedExtensions.includes("." + extension);
    },

    addImage(file) {
      this.noticia.imagen.push(file);
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
          alert("Seccion requerida no llenada");
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
        this.mostrarDesc = false;

        this.noticiaInserted = true;
        console.log("Noticia creada exitosamente.");
      } catch (error) {
        alert("Error al crear Noticia:", error);
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
