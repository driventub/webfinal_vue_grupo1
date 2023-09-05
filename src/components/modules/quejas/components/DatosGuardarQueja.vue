<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h1 class="card-title text-center">Crea una nueva Queja</h1>
                        <div v-if="!exito">
                            <label for="">A nombre de</label>
                            <input class="form-control" v-model="nombre" type="text" placeholder=" (opcional)" required/>

                            <label for="">Asunto</label>
                            <input class="form-control" v-model="asunto" type="text" placeholder=" asunto..." required/>

                            <div class="cuerpo">
                                <label for="">Cuerpo</label>
                                <div>
                                    <textarea class="form-control" maxlength="250" v-model="cuerpo" rows="5" cols="40"
                                        placeholder=" ingrese su queja aqui... (maximo 250 caracteres)" required></textarea>
                                </div>
                            </div>

                            <div>
                                <button class="btn btn-warning" @click="guardarQueja">Guardar</button>
                            </div>

                        </div>

                        <div class="exitoso" v-if="exito">
                            <h5>{{ mensaje }}</h5>
                        </div>
                        <div class="noExitoso" v-if="noExito">
                            <h5>{{ mensaje }}</h5>
                        </div>

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
import { ingresarQuejaFachada } from '../helpers/QuejaCliente'

export default {
    data() {
        return {
            asunto: null,
            nombre: null,
            cuerpo: null,

            mensaje: null,
            exito: false,
            noExito: false
        };
    },
    methods: {

        async guardarQueja() {

            if (this.asunto === null || this.cuerpo === null) {
                this.noExito = true;
                this.mensaje = 'Queja no agregada: datos faltantes'
            } else {

                if (this.nombre === null || this.nombre === '') {
                    this.nombre = 'Anónimo'
                }

                const data = {
                    nombre: this.nombre,
                    cuerpo: this.cuerpo,
                    asunto: this.asunto,
                }

                try {
                    ingresarQuejaFachada(data);
                    this.exito = true;
                    this.mensaje = 'Exito: Queja agregada de manera correcta'
                } catch (error) {
                    this.noExito = true;
                    this.mensaje = error + ': Error de API'
                }

            }

        },

    }
}
</script>

<style scoped>
input {
    margin-left: 5px;
    margin-right: 5px;
}

button {
    margin-top: 10px;
    font-size: large;
    margin-bottom: 20px;
}

/* a {
    margin-top: 20px;

} */

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