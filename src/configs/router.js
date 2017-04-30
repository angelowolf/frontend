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
    { path: '/usuario/nuevo', component: load('views/usuario/usuarioForm'), meta: { name: 'Nuevo Usuario' } },
    { path: '/', component: load('views/login/login'), meta: { name: 'Iniciar sesión' } },
    { path: '*', component: load('Error404') }
  ]
})
