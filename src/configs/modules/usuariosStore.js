import { usuarioUrl } from '../urls'
import axios from 'axios'

const state = {
  usuarios: []
}

const mutations = {
  SET_USUARIOS (state, usuarios) {
    state.usuarios = usuarios
  },
  UPDATE_USUARIO (state, usuario) {
    const indice = state.usuarios.findIndex(a => parseInt(usuario.id) === parseInt(a.id))
    state.usuarios.splice(indice, 1)
    state.usuarios.splice(indice, 0, usuario)
  },
  DELETE_USUARIO (state, idUsuario) {
    const indice = state.usuarios.findIndex(a => parseInt(idUsuario) === parseInt(a.id))
    state.usuarios.splice(indice, 1)
  }
}

const actions = {
  cargarUsuarios: ({commit}) => {
    axios.get(usuarioUrl)
      .then(response => {
        commit('SET_USUARIOS', response.data.datos)
      })
  },
  actualizarUsuario: ({commit}, usuario) => {
    commit('UPDATE_USUARIO', usuario)
  },
  eliminarUsuario: ({commit}, idUsuario) => {
    commit('DELETE_USUARIO', idUsuario)
  }
}

const getters = {
  getUsuarios (state) {
    return state.usuarios
  }
}

export default {
  state, mutations, actions, getters
}
