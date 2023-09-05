<template>

  <slider/>

  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1>Facultad de Ingenieria Civil</h1>
        <div>
          <h1>{{ carreraTitulo }}</h1>
          <p class="text-justify"> <strong>Duración: </strong> {{ duracion }} semestres</p>

          <h2>Misión de la Carrera</h2>
          <p class="text-justify">{{ mision }}</p>

          <h2>Visión de la Carrera</h2>
          <p class="text-justify"> {{ vision }}</p>

          <h2>Descripción de la Carrera</h2>
          <p class="text-justify">{{ descripcion }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import slider   from '../components/Slider.vue';

export default {

  components: {
    slider,
  },

  data() {
    return {
      carreraTitulo: "INGENIERO CIVIL",
      duracion: 10,
      mision:
        "La Carrera de Ingeniería Civil de la Facultad de Ingeniería y Ciencias Aplicadas de la Universidad Central del Ecuador, forma profesionales éticos y competentes en la planificación, diseño, ejecución, evaluación y mantenimiento de obras civiles...",
      vision:
        "Al 2028 la Carrera de Ingeniería Civil de la Facultad de Ingeniería y Ciencias Aplicadas de la Universidad Central del Ecuador, se proyecta como una de las mejores carreras del país; internacionalizando sus programas académicos...",
      descripcion:
        "Formar Ingenieros Civiles a través de una preparación científica, técnica, humanística y ética, a fin de que el futuro profesional pueda convertirse en auténtico líder y gestor pragmático...",
    };
  },

}
</script>

<style scoped>
.contenedor {
  margin-top: 5%;
}

h1 {
  color: black;
}

p {
  text-align: left;
}
</style>