<template>
    <div v-if="show" class="alert">
      <div class="alert-content">
        <slot></slot>
        <h4>Mensaje</h4>
        <button @click="closeAlert">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: true,
      };
    },
    methods: {
      openAlert() {
        this.show = true;
      },
      closeAlert() {
        this.show = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .alert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .alert-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  </style>