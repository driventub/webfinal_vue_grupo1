<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/suscribirse">Civil</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav" >
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="/suscribirse" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">  Noticias</router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="/terminos">Insertar</router-link>
              <router-link class="dropdown-item" to="/alert">Visualizar</router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/suscribirse">Foro al Estudiante</router-link>
          </li>          
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="/suscribirse" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Acercamiento al Estudiante</router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="/terminos">Suscripcion</router-link>
              <router-link class="dropdown-item" to="/ayuda">Quejas</router-link>              
            </div>
          </li>
        </ul>
      </div>
      </div>      
    </nav>

  
  </template>
  
  <script >
  export default {

    name: 'AppNavbar'
  
  }
  </script>
  
  <style >
  .navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ajusta el valor según sea necesario para superponer otros elementos */
}
  </style>