<template>
  <div class="layout-padding">
    <form @submit.prevent="submit" @keydown="dominioNuevo.errors.clear($event.target.name)" novalidate>
      <div class="floating-label">
        <input
          type="text"
          v-model="dominioNuevo.dominio"
          class="full-width"
          required
          name="dominio"
          v-error="{ form: dominioNuevo, campo: 'dominio' }"
        >
        <label for="dominio">Dominio</label>
      </div>
      <form-help nombre="dominio" :form="dominioNuevo"/>
      <div class="floating-label">
        <input
          type="text"
          v-model="dominioNuevo.clave"
          class="full-width"
          required
          name="clave"
          v-error="{ form: dominioNuevo, campo: 'clave' }"
        >
        <label for="clave">Clave</label>
        <form-help nombre="clave" :form="dominioNuevo"/>
      </div>
      <div class="floating-label">
        <input
          type="text"
          v-model="dominioNuevo.valor"
          class="full-width"
          required
          name="valor"
          v-error="{ form: dominioNuevo, campo: 'valor' }"
        >
        <label for="valor">Valor</label>
        <form-help nombre="valor" :form="dominioNuevo"/>
      </div>
      <div class="column group">
        <label>
          <q-checkbox name="activo" v-model="dominioNuevo.activo"></q-checkbox>
          <label for="activo">Activo</label>
        </label>
        <label>
          <q-checkbox name="editable" v-model="dominioNuevo.editable"></q-checkbox>
          <label for="editable">Editable</label>
        </label>
      </div>
      <button class="primary pull-right" type="submit">
        {{ modoEditar ? 'Editar' : 'Registrar' }} Dominio
      </button>
    </form>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  import { dominioUrl } from '../../../configs/urls'
  import Form from '../../util/Form'
  import { vueHttp, enviarPeticion } from './../../../configs/servicioRest'

  export default {
    name: 'FormDominio',
    props: ['id'],
    data () {
      return {
        dominioNuevo: new Form({
          id: '',
          dominio: '',
          clave: '',
          valor: '',
          activo: true,
          editable: true
        }),
        modoEditar: false
      }
    },
    methods: {
      ...mapActions([
        'cargarDominio'
      ]),
      submit () {
        let accionHttp = this.modoEditar ? 'put' : 'post'
        enviarPeticion(accionHttp, dominioUrl, this.dominioNuevo.data(), response => {
          this.$router.push('/dominio')
          this.cargarDominio()
        },
        response => {
          this.dominioNuevo.errors.record(response.data.datos.listaValidaciones)
        })
      }
    },
    beforeMount () {
      if (this.id !== undefined) {
        vueHttp('get', dominioUrl + this.id, response => {
          this.dominioNuevo = new Form(response.data.datos)
        })
        this.modoEditar = true
      }
    }
  }
</script>
