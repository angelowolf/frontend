import { clienteSistemaUrl } from '../urls'
import axios from 'axios'

const state = {
  clientes: []
}

const mutations = {
  SET_CLIENTES_SISTEMA (state, clientes) {
    state.clientes = clientes
  },
  UPDATE_CLIENTE_SISTEMA (state, cliente) {
    const indice = state.clientes.findIndex(a => parseInt(cliente.id) === parseInt(a.id))
    state.clientes.splice(indice, 1)
    state.clientes.splice(indice, 0, cliente)
  },
  DELETE_CLIENTE_SISTEMA (state, idCliente) {
    const indice = state.clientes.findIndex(a => parseInt(idCliente) === parseInt(a.id))
    state.clientes.splice(indice, 1)
  }
}

const actions = {
  cargarClientesSistema: ({commit}) => {
    axios.get(clienteSistemaUrl)
      .then(response => {
        commit('SET_CLIENTES_SISTEMA', response.data.datos)
      })
  },
  actualizarCliente: ({commit}, cliente) => {
    commit('UPDATE_CLIENTE_SISTEMA', cliente)
  },
  eliminarCliente: ({commit}, idCliente) => {
    commit('DELETE_CLIENTE_SISTEMA', idCliente)
  }
}

const getters = {
  getClientesSistema (state) {
    return state.clientes
  }
}

export default {
  state, mutations, actions, getters
}
