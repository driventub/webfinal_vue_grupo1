<template>
  
  <div class="buscar">
    <label for="">Id:  </label>
    <input v-model="id" type="text" />
    <button class="btn btn-warning" @click="consultaQueja" >Consultar</button>
  </div>

  <div v-if="exito">
    <h3>{{ mensaje }}</h3>
  </div>

  <div v-if="!buscando">
    <table class="table table-success table-striped">
          <tr class="bordes">
            <th>Id</th>
            <th>Nombre</th>
            <th>Asunto</th>
            <th>Fecha</th>
            <th>Cuerpo</th>
          </tr>
          <tr v-for="queja in quejas" class="table">
            <td>{{queja.id}}</td>
            <td>{{queja.nombre}}</td>
            <td>{{queja.asunto}}</td>
            <td class="textoT">{{queja.fecha}}</td>
            <td class="textoT">{{queja.cuerpo}}</td>
          </tr>
      </table>
  </div>

  <div v-if="buscando" class="resto">
    <label for="">Nombre</label>
    <input v-model="nombre" type="text" />
    <label for="">Asunto</label>
    <input v-model="asunto" type="text" />
    <label for="">Fecha ingreso</label>
    <input v-model="fecha" type="text" />

    <div class="cuerpo">
      <label for="">Cuerpo</label>
      <div>
        <textarea v-model="cuerpo" rows="5" cols="40"></textarea>
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

      id2:null,
      nombre: null,
      asunto: null,
      cuerpo: null,
      fecha: null,

      quejas: [] ,
      buscando:false,
      exito:false,
      mensaje:null
    };
  },
  methods: {
    async consultaQueja() {
      this.buscando=true;

      if(this.id===null || this.id==='null'){

        this.exito=true
        this.mensaje='Error: Id no ingresado'

      }else{

        try{
          const data = await obtenerQuejaFachada(this.id);
          this.nombre = data.nombre;
          this.asunto = data.asunto;
          this.cuerpo = data.cuerpo;
          this.fecha = data.fecha;
        }catch(error){
          this.exito=true
          this.mensaje='Error: Id invalido o vacio'
        }
      }
      
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
.buscar {
  margin: 10px;
}

input {
  margin-left: 5px;
  margin-right: 5px;
}

button {
  font-size: large;
}

.cuerpo{
  margin-top: 10px;
}

.textoT{
  text-align: left;
}

</style>
