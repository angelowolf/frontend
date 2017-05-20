// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================
if (window.localStorage) {
  if (store.state.auth.token !== JSON.stringify(window.localStorage.getItem('token'))) {
    store.dispatch('setToken', window.localStorage.getItem('token'))
    store.dispatch('setUsuario', JSON.parse(window.localStorage.getItem('usuario')))
  }
}

import Vue from 'vue'
import Quasar from 'quasar'
import Vuelidate from 'vuelidate'
import moment from 'moment'

import axios from 'configs/axios'
import Axios from 'axios'
import router from 'configs/router'
import store from './configs/store'

import FormHelp from './components/util/FormHelp'

import 'font-awesome/css/font-awesome.css'
import 'highlight/lib/vendor/highlight.js/styles/default.css'
import 'dragula/dist/dragula.css'

Vue.use(Vuelidate)
Vue.use(Quasar) // Install Quasar Framework
Vue.use(axios)
Vue.component('form-help', FormHelp)

moment.locale('es')

const { state } = store

Vue.directive('error', (el, binding) => {
  if (binding.value.form !== undefined) {
    if (binding.value.form.errors.has(binding.value.campo)) {
      el.className += el.className.indexOf('has-error') < 0 ? ' has-error' : ''
    }
    else {
      el.className = el.className.replace('has-error', '')
    }
  }
})

Vue.directive('permiso', function (el, binding) {
  let grupos = JSON.parse(window.localStorage.getItem('grupos'))
  let funcion = 'permisoVer'

  if (binding.value.funcion) {
    funcion = 'permiso' + binding.value.funcion
  }
  if (grupos) {
    let flag = false
    grupos.map(grupo => {
      if (grupo.nombre === binding.value.nombre) {
        grupo.funcionalidadGrupos.map(funcionalidad => {
          if (funcionalidad[funcion]) {
            flag = true
          }
        })
      }
    })

    if (!flag) {
      el.style.display = 'none'
    }
  }
})

Axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = 'Bearer ' + state.auth.token
  return config
})
Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    window.localStorage.clear()
    router.push('/')
  }
  return Promise.reject(error)
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
    return
  }
  if (state.auth.token) {
    store.commit('setLayoutNeeded', true)
    next()
    return
  }
  next('/')
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App'))
  })
})
