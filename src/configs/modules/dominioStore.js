import { dominioUrl } from '../urls'
import axios from 'axios'

const state = {
  dominio: []
}

const mutations = {
  SET_DOMINIO (state, dominio) {
    state.dominio = dominio
  },
  UPDATE_DOMINIO (state, dominio) {
    const indice = state.dominio.findIndex(a => parseInt(dominio.id) === parseInt(a.id))
    state.dominio.splice(indice, 1)
    state.dominio.splice(indice, 0, dominio)
  },
  DELETE_DOMINIO (state, dominio) {
    const indice = state.dominio.findIndex(a => parseInt(dominio.id) === parseInt(a.id))
    dominio.activo = false
    state.dominio.splice(indice, 1)
    state.dominio.splice(indice, 0, dominio)
  }
}

const actions = {
  cargarDominio: ({commit}) => {
    axios.get(dominioUrl)
      .then(response => {
        commit('SET_DOMINIO', response.data.datos)
      })
  },
  actualizarDominio: ({commit}, dominio) => {
    commit('UPDATE_DOMINIO', dominio)
  },
  eliminarDominio: ({commit}, idDominio) => {
    commit('DELETE_DOMINIO', idDominio)
  }
}

const getters = {
  getDominio (state) {
    return state.dominio
  },
  getTipoDocumento (state) {
    return state.dominio.filter(d => {
      if (d.dominio === 'TIPO_DOCUMENTO') {
        return { clave: d.clave, valor: d.valor }
      }
    })
  },
  getTipoClienteSistema (state) {
    return state.dominio.filter(d => {
      if (d.dominio === 'TIPO_CLIENTE_SISTEMA') {
        return { clave: d.clave, valor: d.valor }
      }
    })
  }
}

export default {
  state, mutations, actions, getters
}
