<template>
    <div>
      <h1>Create a New Noticia</h1>
      <form @submit.prevent="createNoticia">
        <div>
          <label for="titulo">Title:</label>
          <input type="text" id="titulo" v-model="noticia.titulo" required>
        </div>
        <div>
          <label for="descripcion">Description:</label>
          <textarea id="descripcion" v-model="noticia.descripcion" required></textarea>
        </div>
        <div>
          <label for="urlVideo">Video URLs:</label>
          <input type="text" id="urlVideo" v-model="urlVideoInput">
          <button @click="addVideoUrl">Add Video URL</button>
          <ul>
            <li v-for="(videoUrl, index) in noticia.urlVideo" :key="index">
              {{ videoUrl }}
              <button @click="removeVideoUrl(index)">Remove</button>
            </li>
          </ul>
        </div>
        <div>
          <label for="imagen">Images:</label>
          <input type="file" id="imagen" ref="imageInput" multiple @change="handleImageChange" required>
        </div>
        <button type="submit">Create Noticia</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        noticia: {
          titulo: '',
          descripcion: '',
          urlVideo: [], // Array to store video URLs
          imagen: [], // Array to store selected image files
        },
        urlVideoInput: '', // Temporary storage for input
      };
    },
    methods: {
      async createNoticia() {
        try {
          const formData = new FormData();
  
          // Append noticia properties to the FormData
          formData.append('titulo', this.noticia.titulo);
          formData.append('descripcion', this.noticia.descripcion);
  
          // Append each video URL to the FormData
          for (let i = 0; i < this.noticia.urlVideo.length; i++) {
            formData.append('urlVideo', this.noticia.urlVideo[i]);
          }
  
          // Append selected image files to the FormData
          for (let i = 0; i < this.noticia.imagen.length; i++) {
            formData.append('imagen', this.noticia.imagen[i]);
          }
  
          // Send the FormData to your API endpoint
          await axios.post('http://localhost:8080/API/v1.0/Civil/noticias', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          // Clear the form after successful submission
          this.noticia.titulo = '';
          this.noticia.descripcion = '';
          this.noticia.urlVideo = [];
          this.urlVideoInput = ''; // Clear input
          this.noticia.imagen = [];
  
          // Optionally, display a success message or navigate to a different page
          console.log('Noticia created successfully.');
        } catch (error) {
          // Handle errors, e.g., display an error message
          console.error('Error creating Noticia:', error);
        }
      },
      handleImageChange(event) {
        // Store selected image files in the noticia object
        this.noticia.imagen = Array.from(event.target.files);
      },
      addVideoUrl() {
        // Add the entered video URL to the noticia object
        if (this.urlVideoInput.trim() !== '') {
          this.noticia.urlVideo.push(this.urlVideoInput);
          this.urlVideoInput = ''; // Clear input
        }
      },
      removeVideoUrl(index) {
        // Remove a video URL from the noticia object by index
        this.noticia.urlVideo.splice(index, 1);
      },
    },
  };
  </script>
  