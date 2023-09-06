<template>
  <div>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title text-center">Insertar Profesor</h1>
              <form @submit.prevent="insertarProfesor">
                <div class="mb-3">
                  <label for="cedula" class="form-label">Cédula</label>
                  <input
                    v-model="cedula"
                    type="text"
                    id="cedula"
                    class="form-control"
                    placeholder="C.I."
                    required
                    inputmode="numeric"
                    pattern="[0-9]*"
                    oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                  />
                </div>

                <div class="mb-3">
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
                    />
                    <p>
                      Arrastre y suelte aquí o
                      <label for="imagen" class="browse-label"
                        >seleccione de su equipo</label
                      >
                    </p>
                  </div>

                  <ul>
                    <li v-for="(image, index) in imagen" :key="index">
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

                <div class="mb-3">
                  <label class="form-label" for="urlVideo">Videos:</label>
                  <input
                    class="form-control"
                    type="text"
                    id="urlVideo"
                    
                  />
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click.prevent="addVideoUrl"
                  >
                    Añadir Video URL
                  </button>
                  <ul>
                    <li v-for="(videoUrl, index) in urlVideo" :key="index">
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

    <ul>
      <div v-if="insertado" v-for="imagen in noticia.urlImagen" :key="imagen">
        <img :src="imprimirRuta(imagen)" alt="Imagen" />
      </div>
    </ul>
    <ul>
      <div v-if="insertado" class="video">
        <div
          class="ratio ratio-21x9"
          v-for="videoUrl in urlVideo"
          :key="videoUrl"
        >
          
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
</template>

<script>
import { insertarFachada } from "../helpers/profesorApi";

export default {
  data() {
    return {
      cedula: null,
      image: [],
      urlVideo: [],
      insertado: false,
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
      this.image.push(file);
    },

    removeImage(index) {
      this.image.splice(index, 1);
    },

    addVideoUrl() {
      if (this.urlVideoInput.trim() !== "") {
        this.urlVideo.push(this.urlVideoInput);
        this.urlVideoInput = "";
      }
    },

    removeVideoUrl(index) {
      this.urlVideo.splice(index, 1);
    },
    async insertarProfesor() {
      const formData = new FormData();

      formData.append("cedula", this.cedula);

      for (let i = 0; i < this.urlVideo.length; i++) {
        formData.append("urlVideo", this.urlVideo[i]);
      }

      for (let i = 0; i < this.image.length; i++) {
        formData.append("imagen", this.image[i]);
      }

      await insertarFachada(formData);
    },
  },
};
</script>

<style scoped>
.dropzone {
    border: 2px dashed #ccc;
    text-align: center;
    padding: 20px;
    cursor: pointer;
  }</style>
