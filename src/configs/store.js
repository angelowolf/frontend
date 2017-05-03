import Vuex from 'vuex'
import Vue from 'vue'
import auth from './modules/auth'
import usuariosStore from './modules/usuariosStore'
import tipoHabitacionesStore from './modules/tipoHabitacionesStore'
import habitacionesStore from './modules/habitacionesStore'
import tipoDocumentos from './modules/tipoDocumentos'

Vue.use(Vuex)

let state = {
  layoutNeeded: false,
  isLoginPage: true,
  mobileMode: false,
  menuCollapse: true,

  posts: []
}

let mutations = {
  setLayoutNeeded (state, value) {
    state.layoutNeeded = value
  },
  setIsLoginPage (state, value) {
    state.isLoginPage = value
  },
  setMobileMode (state, value) {
    state.mobileMode = value
  },
  setMenuCollapse (state, value) {
    state.menuCollapse = value
  },
  setPosts (state, posts) {
    state.posts = posts
  }
}

let getters = {
  getLayoutNeeded () {
    return state.layoutNeeded
  },
  getIsLoginPage () {
    return state.isLoginPage
  },
  getMobileMode () {
    return state.mobileMode
  },
  getMenuCollapse () {
    return state.menuCollapse
  },
  getPosts () {
    return state.posts
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  modules: {
    auth,
    usuariosStore,
    tipoHabitacionesStore,
    habitacionesStore,
    tipoDocumentos
  }
})
