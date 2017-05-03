<template>
  <div class="layout-padding">
    <form @submit.prevent="submit" @keydown="tipoHabitacionNuevo.errors.clear($event.target.name)" novalidate>
      <div class="floating-label">
        <input
          type="text"
          v-model="tipoHabitacionNuevo.nombre"
          class="full-width"
          required
          name="nombre"
          v-error="{ form: tipoHabitacionNuevo, campo: 'nombre' }"
        >
        <label for="nombre">Nombre</label>
      </div>
      <form-help nombre="nombre" :form="tipoHabitacionNuevo"/>
      <button class="primary pull-right" type="submit">
        {{ modoEditar ? 'Editar' : 'Registrar' }} Tipo Habitación
      </button>
    </form>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import { tipoHabitacionUrl } from '../../../configs/urls'
  import Form from '../../util/Form'
  import { vueHttp, enviarPeticion } from './../../../configs/servicioRest'

  export default {
    name: 'FormTipoHabitacion',
    props: ['id'],
    data () {
      return {
        tipoHabitacionNuevo: new Form({
          id: '',
          nombre: ''
        }),
        modoEditar: false
      }
    },
    methods: {
      ...mapActions([
        'cargarTipoHabitaciones'
      ]),
      submit () {
        let accionHttp = this.modoEditar ? 'put' : 'post'
        enviarPeticion(accionHttp, tipoHabitacionUrl, this.tipoHabitacionNuevo.data(), response => {
          this.$router.push('/tipoHabitacion')
          this.cargarTipoHabitaciones()
        },
        response => {
          this.tipoHabitacionNuevo.errors.record(response.data.datos.listaValidaciones)
        })
      }
    },
    beforeMount () {
      if (this.id !== undefined) {
        vueHttp('get', tipoHabitacionUrl + this.id, response => {
          this.tipoHabitacionNuevo = new Form(response.data.datos)
        })
        this.modoEditar = true
      }
    }
  }
</script>
