const state = {
  usuario: null,
  token: null
}

const mutations = {
  SET_USUARIO (state, usuario) {
    state.usuario = usuario
  },
  SET_TOKEN (state, token) {
    state.token = token
  }
}

const actions = {
  setUsuario: ({commit}, userObj) => {
    commit('SET_USUARIO', userObj)
  },
  setToken: ({commit}, token) => {
    commit('SET_TOKEN', token)
  }
}

const getters = {
  getUsuario (state) {
    return state.usuario
  },
  getNombreUsuario (state) {
    return state.usuario.nombre + ' ' + state.usuario.apellido
  }
}

export default {
  state, mutations, actions, getters
}
