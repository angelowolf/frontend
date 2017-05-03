import { tipoDocumentoUrl } from '../urls'
import { vueHttp } from './../servicioRest'

const state = {
  tiposDocumento: []
}

const mutations = {
  SET_TIPOS_DOCUMENTO (state, tiposDocumento) {
    state.tiposDocumento = tiposDocumento
  }
}

const actions = {
  cargarTiposDocumento: ({commit}) => {
    vueHttp('get', tipoDocumentoUrl, response => {
      commit('SET_TIPOS_DOCUMENTO', response.data.datos)
    })
  }
}

const getters = {
  getTiposDocumento (state) {
    return state.tiposDocumento
  }
}

export default {
  state, mutations, actions, getters
}
