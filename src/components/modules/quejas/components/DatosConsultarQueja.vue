<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title text-center">Pagina de Quejas en la Facultad</h1>
            <div class="botonesNavegacion">
              <router-link class="btn btn-primary" to="/quejas/insertar" role="button">Nueva queja</router-link>
              <router-link class="btn btn-primary" to="/quejas/actualizar" role="button">Cambiar Queja</router-link>
              <router-link class="btn btn-primary" to="/quejas/eliminar" role="button">Eliminar Queja</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div class="buscar">
              <label for="">Id: </label>
              <input class="form-control" v-model="id" type="text" />
              <button class="btn btn-warning" @click="consultaQueja">Consultar</button>
            </div>
            <div class="exitoso" v-if="exito">
              <h5>{{ mensaje }}</h5>
            </div>

            <div class="noExitoso" v-if="noExito">
              <h5>{{ mensaje }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div class="tabla" v-if="!buscando">
              <table class="table table-success table-striped">
                <tr class="bordes">
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Asunto</th>
                  <th>Fecha</th>
                  <th>Cuerpo</th>
                </tr>
                <tr v-for="queja in quejas" class="table">
                  <td>{{ queja.id }}</td>
                  <td>{{ queja.nombre }}</td>
                  <td>{{ queja.asunto }}</td>
                  <td class="textoT">{{ queja.fecha }}</td>
                  <td class="textoT">{{ queja.cuerpo }}</td>
                </tr>
              </table>
            </div>

            <div v-if="buscando" class="resto">
              <label for="">Nombre</label>
              <input class="form-control" v-model="nombre" type="text" readonly />
              <label for="">Asunto</label>
              <input class="form-control" v-model="asunto" type="text" readonly />
              <label for="">Fecha ingreso</label>
              <input class="form-control" v-model="fecha" readonly />

              <div class="cuerpo">
                <label for="">Cuerpo</label>
                <div>
                  <textarea class="form-control" v-model="cuerpo" rows="5" cols="40" readonly></textarea>
                </div>
              </div>

              <button class="btn btn-primary" @click="regresar">Regresar</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { obtenerQuejaFachada } from "../helpers/QuejaCliente";
import { buscarTodosFachada } from "../helpers/QuejaCliente";

export default {
  data() {
    return {
      id: this.$route.params.id,

      id2: null,
      nombre: null,
      asunto: null,
      cuerpo: null,
      fecha: null,

      quejas: [],
      buscando: false,

      exito: false,
      noExito: false,

      mensaje: null
    };
  },
  methods: {
    async consultaQueja() {

      this.nombre = ''
      this.asunto = ''
      this.fecha = ''
      this.cuerpo = ''

      this.buscando = true;

      if (this.id === null || this.id === 'null') {

        this.noExito = true
        this.mensaje = 'Error: Id no ingresado'

      } else {

        try {
          const data = await obtenerQuejaFachada(this.id);
          this.nombre = data.nombre;
          this.asunto = data.asunto;
          this.cuerpo = data.cuerpo;
          this.fecha = data.fecha;
        } catch (error) {
          this.noExito = true
          this.mensaje = 'Error: Id invalido o vacio'
        }
      }

    },

    async regresar() {
      this.id = ''
      this.buscando = false;
    },

    async buscaTodos() {
      const res = await buscarTodosFachada();
      //console.log(res);
      this.quejas = res.data;
    },

  },
  mounted() {

    this.buscaTodos();

  },
};
</script>

<style scoped>
div{
  margin-top: 1%;
}
.buscar {
  margin: 10px;
}

input {
  margin-left: 5px;
  margin-right: 5px;
}

button {
  font-size: large;
  margin:20px;
}

.cuerpo {
  margin-top: 10px;
}

.textoT {
  text-align: left;
}

.tabla {
  margin-top: 30px;
  margin-bottom: 400px;
}

.botonesNavegacion a {
  margin: 10px
}

.exitoso {
  border: 2px solid green;
  border-radius: 5px;
  /* Agregar un borde redondeado */
  color: green;
  padding: 2% 10px;
  /* Añadir padding solo en los lados */
  background-color: #daffda;
  margin: 10px 10% 0;
  /* Margen arriba, margen izquierdo y derecho, sin margen abajo */
}

.noExitoso {
  border: 2px solid red;
  border-radius: 5px;
  /* Agregar un borde redondeado */
  color: red;
  padding: 2% 10px;
  /* Añadir padding solo en los lados */
  background-color: #ffdada;
  margin: 0 10% 10px;
  /* Sin margen arriba, margen izquierdo y derecho, margen abajo */
}
</style>
