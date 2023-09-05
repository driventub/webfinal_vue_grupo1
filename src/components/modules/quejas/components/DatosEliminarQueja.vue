<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">

                    <h1 class="card-title text-center">Verifica el id de una Queja y eliminala</h1>
                    <div class="card-body">
                        <label for="">Id</label>
                        <input class="form-control" required v-model="id" type="number" :disabled="isDisabled" />
                        <button class="btn btn-warning" @click="consultaQueja">Verificar</button>

                        <div>
                            <h3 v-if="verif"> Asunto: {{ asunto }}</h3>
                        </div>

                        <div>
                            <h3 v-if="verif">Nombre: {{ nombre }}</h3>
                        </div>
                        <button class="btn btn-danger" @click="eliminarQueja" v-if="verif">Eliminar</button>

                        <h5 class='mensaje' v-if="mensaje">{{ mensaje2 }}</h5>

                        <div class="d-flex">
                            <router-link class="btn btn-primary" to="/quejas" role="button">Volver</router-link>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { eliminarQuejaFachada } from '../helpers/QuejaCliente';
import { obtenerQuejaFachada } from '../helpers/QuejaCliente'
export default {
    data() {
        return {
            verif: false,
            id: null,
            nombre: null,
            asunto: null,

            mensaje: false,
            mensaje2: null
        };
    },
    methods: {
        async eliminarQueja() {
            this.isDisabled = !this.isDisabled;
            this.verif = false;
            try {
                await eliminarQuejaFachada(this.id)
                this.mensaje = true;
                this.mensaje2 = 'Exito: Queja eliminada exitosamente'
            } catch (error) {
                this.mensaje = true;
                this.mensaje2 = error + ': Error de API al eliminar'
            }

        },
        async consultaQueja() {
            this.isDisabled = !this.isDisabled;
            this.mensaje = false;

            if (this.id === null || this.id === '') {
                this.isDisabled = !this.isDisabled;
                this.mensaje = true
                this.mensaje2 = 'Error: Id vacio'
            } else {
                try {
                    const data = await obtenerQuejaFachada(this.id);
                    this.nombre = data.nombre;
                    this.asunto = data.asunto;
                    this.verif = true;
                } catch (error) {
                    this.isDisabled = !this.isDisabled;
                    this.mensaje = true;
                    this.mensaje2 = error + ': Error de API al consultar'
                }

            }

        },
    }

}
</script>

<style scoped>
input {
    margin-left: 5px;
    margin-left: 5px;
}

a{
    margin-top:50px
}

button {
  font-size: large;
  margin:20px;
}

.mensaje {
    border: 2px solid black;
    border-radius: 5px;
    /* Agregar un borde redondeado */
    color: #b58900;
    padding: 2% 10px;
    /* Añadir padding solo en los lados */
    background-color: yellow;
    margin: 10px 10% 0;
    /* Margen arriba, margen izquierdo y derecho, sin margen abajo */
}
</style>