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
    { path: '/dashboardAdmin', component: load('views/dashboard/one/dashboardAdmin'), meta: { name: 'Administración' } },
    { path: '/dominio', component: load('views/dominio/dominio'), meta: { name: 'Dominio' } },
    { path: '/dominio/editar/:id', component: load('views/dominio/dominioForm'), meta: { name: 'Editar Dominio' }, props: true },
    { path: '/dominio/nuevo', component: load('views/dominio/dominioForm'), meta: { name: 'Nuevo Dominio' } },
    { path: '/clientesistema', component: load('views/clientesistema/clientes'), meta: { name: 'Clientes' } },
    { path: '/clientesistema/editar/:id', component: load('views/clientesistema/actualizarClienteSistemaForm'), meta: { name: 'Editar Cliente de Sistema' }, props: true },
    { path: '/clientesistema/nuevo', component: load('views/clientesistema/altaClienteSistemaForm'), meta: { name: 'Nuevo Cliente de Sistema' } },
    { path: '/reservas', component: load('views/reserva/reserva'), meta: { name: 'Reservas' } },
    { path: '/i', component: load('views/usuario/perfil'), meta: { name: 'Perfil' } },
    { path: '/usuario', component: load('views/usuario/usuarios'), meta: { name: 'Usuarios' } },
    { path: '/usuario/editar/:id', component: load('views/usuario/usuarioForm'), meta: { name: 'Editar Usuario' }, props: true },
    { path: '/usuario/nuevo', component: load('views/usuario/usuarioForm'), meta: { name: 'Nuevo Usuario' } },
    { path: '/tipoHabitacion', component: load('views/tipoHabitacion/tipoHabitaciones'), meta: { name: 'Tipo Habitaciones' } },
    { path: '/tipoHabitacion/editar/:id', component: load('views/tipoHabitacion/tipoHabitacionForm'), meta: { name: 'Editar Tipo Habitacion' }, props: true },
    { path: '/tipoHabitacion/nuevo', component: load('views/tipoHabitacion/tipoHabitacionForm'), meta: { name: 'Nuevo Tipo Habitacion' } },
    { path: '/habitacion', component: load('views/habitacion/habitaciones'), meta: { name: 'Habitaciones' } },
    { path: '/habitacion/editar/:id', component: load('views/habitacion/habitacionForm'), meta: { name: 'Editar Habitación' }, props: true },
    { path: '/habitacion/nuevo', component: load('views/habitacion/habitacionForm'), meta: { name: 'Nuevo Habitación' } },
    { path: '/test', component: load('views/test'), meta: { name: 'Test' } },
    { path: '/', component: load('views/login/login'), meta: { name: 'Iniciar sesión' } },
    { path: '*', component: load('Error404') }
  ]
})
