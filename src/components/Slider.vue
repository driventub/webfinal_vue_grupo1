<template>
    <div ref="slideContainer" class="slide-container">
      <img 
        v-for="image in images"
        :key="image.id"
        :src="image.url"
        :class="{ active: index === image.id }" 
        class="slide"
      >
    </div>
  
    <div class="buttons">
      <button @click="slidePrev">Anterior</button>
      <button @click="slideNext">Siguiente</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          { 
            id: 0, 
            url: 'https://aka-cdn.uce.edu.ec/ares/w/facs/fing/imagenes%20y%20pdf/facultad/11897051_691458450985171_1278794561_n.jpg'
          },
          {
            id: 1, 
            url: 'https://aka-cdn.uce.edu.ec/ares/w/facs/fing/imagenes%20y%20pdf/facultad/11897051_691458450985171_1278794561_n.jpg'
          },
          {
            id: 2, 
            url: 'https://aka-cdn.uce.edu.ec/ares/w/facs/fing/imagenes%20y%20pdf/facultad/11897051_691458450985171_1278794561_n.jpg'
          }
        ],
        index: 0
      }
    },
  
    methods: {
      slidePrev() {
        this.index--
        if (this.index < 0) this.index = this.images.length - 1
      },
  
      slideNext() {
        this.index++
      if (this.index > this.images.length - 1) this.index = 0
      }
    }
  }
  </script>
  
  <style>

.slide-container{
    display: flex;
    justify-content: center;
    align-items: center;
    /* overflow-x: hidden; */
}

  .slide {
    top: 50%;
    left: 50%;
    width: 700px;
    height: 300px;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  .slide.active {
    opacity: 1;
  }
  </style>