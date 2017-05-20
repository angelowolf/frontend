<template>
  <div class="flex justify-center full-height" :class="heightSize">
    <div class="card text-white text-center width-3of4 bg-width-2of5 gt-bg-width-1of4 sm-auto" id="login">
      <div class="card-title bg-blue-10">
        <svg id="logo" viewBox="0 0 483 483"
             style="enable-background:new 0 0 460 460;"
             xml:space="preserve" width="128px" height="128px"
             v-html="logoMethod">
        </svg>
        <h4>Iniciar Sesión</h4>
      </div>
      <div v-if="pasoUno">
        <div class="card-content bg-white">
          <div class="stacked-label">
            <input required class="full-width" type="text" name="username" v-model="usuario">
            <label>Usuario</label>
          </div>
          <div class="stacked-label">
            <input required class="full-width" type="password" name="password" v-model="password">
            <label>Contraseña</label>
          </div>
        </div>
        <div class="card-actions inline-block vertical-middle">
          <button class="teal fit normal" @click="login()">Iniciar Sesión</button>
        </div>
      </div>
      <div v-else class="card-content bg-white">
        <p class="text-black">Seleccione su servicio:</p>
        <div v-for="servicio in servicios">
          <button class="teal fit normal" @click="login(servicio)">{{servicio.nombre}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import { mapActions, mapMutations } from 'vuex'
  import Vivus from 'vivus'
  import logoData from './logoData'
  import axios from 'axios'
  import { Platform } from 'quasar'
  import { Toast } from 'quasar'
  import { loginUrlPasoUno, loginUrlPasoDos } from '../../../configs/urls'

  export default {
    beforeCreate () {
      if (window.localStorage.getItem('token') && window.localStorage.getItem('token') !== '') {
        this.$router.push('/dashboard')
      }
    },
    mounted () {
      this.setLayoutNeeded(false)
      this.setIsLoginPage(true)
      this.startAnimation()
    },
    computed: {
      heightSize (){
        if (Platform.is.desktop) {
          return 'items-center'
        }
        return ''
      },
      logoMethod () {
        return logoData[this.logo]
      }
    },
    data () {
      return {
        logos: Object.keys(logoData),
        logo: 'Digitalizer',
        usuario: '',
        password: '',
        vivus: '',
        pasoUno: true,
        servicios: [],
        authUser: ''
      }
    },
    methods: {
      ...mapActions([
        'setToken',
        'setUsuario'
      ]),
      ...mapMutations(['setLayoutNeeded', 'setIsLoginPage']),
      login (servicioSeleccionado) {
        if (this.pasoUno) {
          axios.post(loginUrlPasoUno, {
            usuario: this.usuario,
            clave: this.password
          })
          .then(response => {
            const datos = response.data.datos
            this.authUser = datos.userToken
            window.localStorage.setItem('grupos', JSON.stringify(datos.grupos))
            this.setUsuario(datos)
            this.setToken(datos.userToken)
            const usuario = {
              nombre: datos.nombre,
              apellido: datos.apellido,
              id: datos.id
            }
            this.servicios = datos.clienteSistema
            this.pasoUno = false
            window.localStorage.setItem('usuario', JSON.stringify(usuario))
          })
          .catch(error => {
            Toast.create('Credenciales inválidas')
          })
        } else {
          if (servicioSeleccionado) {
              console.log(servicioSeleccionado)
              axios.post(loginUrlPasoDos, {
                userToken: this.authUser,
                uuidClienteSistema: servicioSeleccionado.uuidClienteSistema
              })
              .then(response => {
                const token = response.data.datos.token
                window.localStorage.setItem('token', token)
                this.setToken(token)
                this.$router.push('/dashboard')
              })
              .catch(error => {
                Toast.create('Ocurrió un error')
              })
          }
        }
      },
      startAnimation () {
        this.vivus = new Vivus('logo', {
            duration: 400,
            forceRender: false
          }, element => {
            for (let item of element.el.children[0].children) {
              item.setAttribute('style', 'fill:white')
              item.setAttribute('style', 'fill:white')
            }
          }
        )
      }
    }
  }
</script>
<style scoped>
  .card {
    margin-bottom: 0px;
  }
  .card-content {
    min-height: 160px;
  }
  button {
    margin-bottom: 4%;
  }
  h4 {
    font-weight: 300;
  }
</style>