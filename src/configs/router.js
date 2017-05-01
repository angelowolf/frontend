import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  mode: 'history',
  routes: [
    /* { path: '/usuario', component: load('views/usuario/usuarios'), meta: { name: 'Listado Usuarios' } }, */
    { path: '/dashboard', component: load('views/dashboard/one/dashboard'), meta: { name: 'Dashboard One' } },
    { path: '/usuario', component: load('views/usuario/usuarios'), meta: { name: 'Usuarios' } },
    { path: '/usuario/editar/:id', component: load('views/usuario/usuarioForm'), meta: { name: 'Editar Usuario' }, props: true },
    { path: '/usuario/nuevo', cot: load('views/usuario/usuarios'), meta: { name: 'Usuarios' } },
    { path: '/tipoHabitacion', component: load('views/tipoHabitacion/tipoHabitaciones'), meta: { name: 'Tipo Habitaciones' } },
    { path: '/tipoHabitacion/editar/:id', component: load('views/tipoHabitacion/tipoHabitacionForm'), meta: { name: 'Editar Tipo Habitacion' }, props: true },
    { path: '/tipoHabitacion/nuevo', component: load('views/tipoHabitacion/tipoHabitacionForm'), meta: { name: 'Nuevo Tipo Habitacion' } },
    { path: '/habitacion', component: load('views/habitacion/habitaciones'), meta: { name: 'Habitaciones' } },
    { path: '/habitacion/editar/:id', component: load('views/habitacion/habitacionForm'), meta: { name: 'Editar Habitación' }, props: true },
    { path: '/habitacion/nuevo', component: load('views/habitacion/habitacionForm'), meta: { name: 'Nuevo Habitación' } },
    { path: '/', component: load('views/login/login'), meta: { name: 'Iniciar sesión' } },
    { path: '*', component: load('Error404') }
  ]
})
