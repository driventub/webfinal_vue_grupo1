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
      <button class="btn btn-secondary" @click="slidePrev">Anterior</button>
      <button class="btn btn-secondary" @click="slideNext">Siguiente</button>
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
            url: 'https://www.ecuavisa.com/binrepository/1272x600/36c0/1200d600/none/11705/GAGA/uce-1_667252_20221028071925.jpg'
          },
          {
            id: 2, 
            url: 'https://2.bp.blogspot.com/-Sdf5RRm_Y9Y/VdyAt9vCykI/AAAAAAAAIT4/ZE05pnB-2uQ/s1600/20150819%2BE%2BResis.JPG'
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
.slide-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide {
    width: 500px; 
  height: 300px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.slide.active {
  opacity: 1;
}

button{
    margin-top: 10px;
    margin-left: 10px;
    margin-left: 2%;
    margin-right: 2%;
}

@media (max-width: 550px) {
    .slide {
    width: 100%;
    height: auto; 
  }
  .buttons {
    flex-direction: column;
  }
  
  button {
    margin: 10px 0;
  }
}
</style>