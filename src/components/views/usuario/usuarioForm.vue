<template>
  <div class="layout-padding">
    <form @submit.prevent="submit" @keydown="usuarioNuevo.errors.clear($event.target.name)" novalidate>
      <div class="floating-label">
        <input
          type="text"
          v-model="usuarioNuevo.nombre"
          class="full-width"
          required
          name="nombre"
          v-error="{ form: usuarioNuevo, campo: 'nombre' }"
        >
        <label for="nombre">Nombre</label>
      </div>
      <form-help nombre="nombre" :form="usuarioNuevo"/>
      <div class="floating-label">
        <input
          type="text"
          v-model="usuarioNuevo.apellido"
          class="full-width"
          required
          name="apellido"
          v-error="{ form: usuarioNuevo, campo: 'apellido' }"
        >
        <label for="apellido">Apellido</label>
        <form-help nombre="apellido" :form="usuarioNuevo"/>
      </div>
      <div class="floating-label">
        <input
          type="text"
          v-model="usuarioNuevo.usuario"
          class="full-width"
          required
          name="usuario"
          v-error="{ form: usuarioNuevo, campo: 'usuario' }"
        >
        <label for="usuario">Usuario</label>
        <form-help nombre="usuario" :form="usuarioNuevo"/>
      </div>
      <div class="floating-label">
      <input name="clave" disabled="disabled" type="password" style="display:none;">
        <input
          type="password"
          v-model="usuarioNuevo.clave"
          class="full-width"
          required
          name="clave"
          v-error="{ form: usuarioNuevo, campo: 'clave' }"
        >
        <label for="clave">Clave</label>
        <form-help nombre="clave" :form="usuarioNuevo"/>
      </div>
      <button class="primary pull-right" type="submit">
        {{ modoEditar ? 'Editar' : 'Registrar' }} Usuario
      </button>
    </form>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import { usuarioUrl } from '../../../configs/urls'
  import Form from '../../util/Form'
  import { vueHttp, enviarPeticion } from './../../../configs/servicioRest'

  export default {
    name: 'FormAlumno',
    props: ['id'],
    data () {
      return {
        usuarioNuevo: new Form({
          id: '',
          nombre: '',
          apellido: '',
          usuario: '',
          clave: ''
        }),
        modoEditar: false
      }
    },
    methods: {
      ...mapActions([
        'cargarUsuarios'
      ]),
      submit () {
        let accionHttp = this.modoEditar ? 'put' : 'post'
        enviarPeticion(accionHttp, usuarioUrl, this.usuarioNuevo.data(), response => {
          this.$router.push('/usuario')
          this.cargarUsuarios()
        },
        response => {
          this.usuarioNuevo.errors.record(response.data.datos.listaValidaciones)
        })
      }
    },
    beforeMount () {
      if (this.id !== undefined) {
        vueHttp('get', usuarioUrl + this.id, response => {
          this.usuarioNuevo = new Form(response.data.datos)
        })
        this.modoEditar = true
      }
    }
  }
</script>
