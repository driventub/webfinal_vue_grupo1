<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h1>Crear Nueva Noticia</h1>
            <form @submit.prevent="createNoticia">
              <!-- Title Input -->
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

              <!-- Description Input -->
              <div class="mb-3">
                <label class="form-label" for="descripcion">Descripción:</label>
                <textarea
                  class="form-control"
                  id="descripcion"
                  v-model="noticia.descripcion"
                  required
                ></textarea>
              </div>

              <!-- Drag-and-Drop Image Area -->
              <div class="mb-3">
                <label class="form-label" for="imagen">Imagenes:</label>

                <!-- Combined drag-and-drop and file input -->
                <div class="dropzone" @drop="handleDrop" @dragover.prevent>
                  <input
                    class="form-control"
                    type="file"
                    id="imagen"
                    ref="imageInput"
                    multiple
                    @change="handleImageChange"
                    style="display: none"
                  />
                  <p>
                    Arrastre y suelte aquí o
                    <label for="imagen" class="browse-label"
                      >seleccione de su equipo</label
                    >
                  </p>
                </div>

                <!-- Display selected images -->
                <ul>
                  <li v-for="(image, index) in noticia.imagen" :key="index">
                    {{ image.name }}
                    <button type="button" class="btn btn-danger" @click="removeImage(index)">Eliminar</button>
                  </li>
                </ul>
              </div>

              <!-- Video URLs Input -->
              <div class="mb-3">
                <label class="form-label" for="urlVideo">Videos:</label>
                <input
                  class="form-control"
                  type="text"
                  id="urlVideo"
                  v-model="urlVideoInput"
                />
                <button type="button" class="btn btn-secondary" @click.prevent="addVideoUrl">Añadir Video URL</button>
                <ul>
                  <li
                    v-for="(videoUrl, index) in noticia.urlVideo"
                    :key="index"
                  >
                    {{ videoUrl }}
                    <button type="button" class="btn btn-danger" @click="removeVideoUrl(index)">Eliminar</button>
                  </li>
                </ul>
              </div>

              <!-- Submit Button -->
              <button class="btn btn-primary" type="submit">Crear Noticia</button>
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
        titulo: "", // Title property
        descripcion: "", // Description property
        imagen: [], // Array to store selected image files
        urlVideo: [], // Array to store video URLs
      },
      urlVideoInput: "", // Temporary storage for input
    };
  },
  methods: {
    // Other methods

    // Handle file drop event
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.addImages(files);
    },

    // Handle file input change
    handleImageChange(event) {
      const files = event.target.files;
      this.addImages(files);
    },

    // Add selected images to the noticia object
    addImages(files) {
      for (let i = 0; i < files.length; i++) {
        this.noticia.imagen.push(files[i]);
      }
    },

    // Remove selected image by index
    removeImage(index) {
      this.noticia.imagen.splice(index, 1);
    },

    // Add video URL to the noticia object
    addVideoUrl() {
      if (this.urlVideoInput.trim() !== "") {
        this.noticia.urlVideo.push(this.urlVideoInput);
        this.urlVideoInput = "";
      }
    },

    // Remove video URL by index
    removeVideoUrl(index) {
      this.noticia.urlVideo.splice(index, 1);
    },

    // Create Noticia (form submission)
    async createNoticia() {
      try {
        // Build and send the FormData
        const formData = new FormData();

        // Append noticia properties to the FormData
        formData.append("titulo", this.noticia.titulo);
        formData.append("descripcion", this.noticia.descripcion);

        // Append each video URL to the FormData
        for (let i = 0; i < this.noticia.urlVideo.length; i++) {
          formData.append("urlVideo", this.noticia.urlVideo[i]);
        }

        // Append selected image files to the FormData
        for (let i = 0; i < this.noticia.imagen.length; i++) {
          formData.append("imagen", this.noticia.imagen[i]);
        }

        // Send the FormData to your API endpoint
        await insertarFachada(formData);

        // Clear the form after successful submission
        this.noticia.titulo = "";
        this.noticia.descripcion = "";
        this.noticia.urlVideo = [];
        this.urlVideoInput = "";
        this.noticia.imagen = [];

        // Optionally, display a success message or navigate to a different page
        console.log("Noticia created successfully.");
      } catch (error) {
        // Handle errors, e.g., display an error message
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
