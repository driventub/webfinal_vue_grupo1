<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/civil">Civil</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav" >
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="/noticias/insertar" id="navbarDropdownMenuNoticias" role="button" data-bs-toggle="dropdown" aria-expanded="false">  Noticias</router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuNoticias">
              <router-link class="dropdown-item" to="/noticias/insertar">Insertar</router-link>
              <router-link class="dropdown-item" to="/noticias/ver">Visualizar</router-link>
            </div>
          </li>         
          <li class="nav-item">
            <router-link class="nav-link" to="/foro">Foro al Estudiante</router-link>
          </li>  
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="/suscribirse" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Acercamiento al Estudiante</router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="/suscribirse">Suscripcion</router-link>
              <router-link class="dropdown-item" to="/quejas">Quejas</router-link>   
                         
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
  </style>